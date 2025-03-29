from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from typing import Dict, List
import json
import os
from dotenv import load_dotenv
from datetime import datetime, timezone
from bs4 import BeautifulSoup
import time
from scrapper_agents import TherapistExtractionAgent
from models import app, db, Therapist
from sqlalchemy.exc import SQLAlchemyError

# Load environment variables
load_dotenv()

class TherapistScraper:
    def __init__(self):
        # Setup Chrome options
        self.chrome_options = Options()
        self.chrome_options.add_argument("--headless")  # Run in headless mode
        self.chrome_options.add_argument("--no-sandbox")
        self.chrome_options.add_argument("--disable-dev-shm-usage")
        
        # Initialize the extraction agent
        self.extraction_agent = TherapistExtractionAgent()

    def clean_html(self, html_content: str) -> str:
        """
        Clean and extract relevant sections from HTML with multiple strategies
        """
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove unnecessary elements
        for element in soup(['script', 'style', 'iframe', 'nav', 'footer', 'header', 'meta', 'link']):
            element.decompose()
        
        # First try: Find the doctors-page-content section (Sehatyab specific)
        doctors_page = soup.find('div', class_='doctors-page-content')
        if doctors_page:
            print("Found doctors page content")
            return str(doctors_page)
        
        # Second try: Find individual doctor sections
        doctor_sections = []
        
        # Look for doctor info wraps (Sehatyab structure)
        info_wraps = soup.find_all('div', class_='doctor-info-wrap')
        if info_wraps:
            doctor_sections.extend(info_wraps)
        
        # Look for doctor thumbnails with associated info
        thumbnails = soup.find_all('div', class_='doctor-thumbnail')
        for thumb in thumbnails:
            info = thumb.find_next_sibling('div', class_='doctor-info-body')
            if info:
                doctor_sections.extend([thumb, info])
        
        if doctor_sections:
            print(f"Found {len(doctor_sections)} doctor sections")
            return '\n'.join(str(section) for section in doctor_sections)
        
        # If no specific doctor sections found, return the main content
        main_content = soup.find(['main', 'article', '#main-content', '.main-content'])
        if main_content:
            print("Using main content area")
            return str(main_content)
        
        print("Using full page content")
        return str(soup)

    def get_page_source(self, url: str) -> str:
        """
        Get the page source for a given URL using Selenium, handling pagination and load more
        """
        driver = webdriver.Chrome(options=self.chrome_options)
        try:
            print(f"\nNavigating to: {url}")
            driver.get(url)
            
            # Wait for initial page load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "body"))
            )
            
            # Site-specific handling
            if "oladoc.com" in url:
                # Handle OlaDoc's "Load More" button
                while True:
                    try:
                        # Wait for and find the "Load More" button
                        load_more = WebDriverWait(driver, 5).until(
                            EC.presence_of_element_located((By.CSS_SELECTOR, "button.load-more-btn"))
                        )
                        
                        # Check if button is visible
                        if not load_more.is_displayed():
                            break
                            
                        # Scroll to button and click
                        driver.execute_script("arguments[0].scrollIntoView();", load_more)
                        time.sleep(2)  # Wait for any animations
                        load_more.click()
                        
                        # Wait for new content to load
                        time.sleep(3)
                        
                    except Exception as e:
                        print("No more content to load")
                        break
                        
            elif "sehatyab.com" in url:
                # Handle Sehatyab's pagination or dynamic loading
                last_height = 0
                retries = 0
                max_retries = 10  # Adjust based on expected content amount
                
                while retries < max_retries:
                    # Scroll to bottom
                    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                    time.sleep(3)
                    
                    # Calculate new scroll height
                    new_height = driver.execute_script("return document.body.scrollHeight")
                    
                    if new_height == last_height:
                        retries += 1
                    else:
                        retries = 0
                        
                    last_height = new_height
            
            # Final scroll to ensure all content is loaded
            driver.execute_script("window.scrollTo(0, 0);")  # Scroll back to top
            time.sleep(1)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            
            return driver.page_source
            
        except Exception as e:
            print(f"Error during page source retrieval: {str(e)}")
            return ""
        finally:
            driver.quit()

    def scrape_therapists(self, url: str) -> Dict:
        """
        Main method to scrape therapist information from a website
        """
        try:
            # Get the page source
            html_content = self.get_page_source(url)
            
            # Clean and extract relevant HTML
            cleaned_html = self.clean_html(html_content)
            
            # Extract data using the agent
            therapist_data = self.extraction_agent.extract_data(cleaned_html)
            
            # Add metadata
            result = {
                "url": url,
                "timestamp": datetime.now().isoformat(),
                "data": therapist_data
            }
            
            # Save to JSON file
            filename = f"therapists_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(filename, 'w') as f:
                json.dump(result, f, indent=2)
            
            print(f"Data saved to {filename}")
            
            # Ingest data into database
            print("\nStarting database ingestion...")
            ingest_therapists_to_db(filename)
            
            return result
            
        except Exception as e:
            print(f"Error scraping {url}: {str(e)}")
            return None

def ingest_therapists_to_db(json_file: str) -> None:
    """
    Ingest therapists data from JSON file into database
    """
    with app.app_context():
        try:
            with open(json_file, 'r') as f:
                data = json.load(f)
            
            therapists_data = data.get('data', {}).get('therapists', [])
            print(f"\nProcessing {len(therapists_data)} therapists for database ingestion...")
            
            inserted = 0
            updated = 0
            errors = 0
            
            for therapist_data in therapists_data:
                try:
                    name = therapist_data.get('name', '').strip()
                    if not name:
                        continue
                    
                    # Handle location data - convert list to string if needed
                    location = therapist_data.get('location')
                    if isinstance(location, list):
                        location = ', '.join(location)  # Convert list to comma-separated string
                    
                    # Prepare therapist data
                    therapist_dict = {
                        'name': name,
                        'designation': therapist_data.get('designation', 'Therapist'),
                        'qualification': therapist_data.get('qualification'),
                        'location': location,  # Now it's always a string
                        'is_available': True,
                        'patients_treated': 0,
                        'patients_queue': 0,
                        'created_at': datetime.now(timezone.utc)
                    }
                    
                    # Check if therapist already exists
                    existing_therapist = Therapist.query.filter_by(name=name).first()
                    
                    if existing_therapist:
                        # Update existing therapist
                        for key, value in therapist_dict.items():
                            if value is not None:
                                setattr(existing_therapist, key, value)
                        db.session.commit()
                        print(f"Updated therapist: {name}")
                        updated += 1
                    else:
                        # Create new therapist
                        new_therapist = Therapist(**therapist_dict)
                        db.session.add(new_therapist)
                        db.session.commit()
                        print(f"Inserted new therapist: {name}")
                        inserted += 1
                        
                except SQLAlchemyError as e:
                    print(f"Database error for therapist {therapist_data.get('name')}: {str(e)}")
                    errors += 1
                    db.session.rollback()
                    continue
            
            print("\nDatabase ingestion completed!")
            print(f"Total processed: {len(therapists_data)}")
            print(f"New insertions: {inserted}")
            print(f"Updates: {updated}")
            print(f"Errors: {errors}")
            
            # Delete the JSON file
            os.remove(json_file)
            print(f"\nDeleted file: {json_file}")
            
        except Exception as e:
            print(f"Error processing JSON file: {str(e)}")
            return None

def main():
    scraper = TherapistScraper()
    
    # Target URLs
    urls = [
        "https://oladoc.com/pakistan/lahore/psychologist",
        "https://www.sehatyab.com/our-doctors",
        
    ]
    
    for url in urls:
        print(f"\nScraping: {url}")
        print("-" * 50)
        result = scraper.scrape_therapists(url)
        
        if result:
            print("\nExtracted Data:")
            print(json.dumps(result['data'], indent=2))
        else:
            print("Scraping failed")
        print("-" * 50)

if __name__ == "__main__":
    main()