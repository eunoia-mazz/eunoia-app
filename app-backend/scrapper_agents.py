from phi.agent import Agent
from phi.llm.openai import OpenAIChat
from typing import Dict, List, Union
from phi.model.google import Gemini
import json
from bs4 import BeautifulSoup
import time

class TherapistExtractionAgent:
    def __init__(self):
        """
        Initializes a TherapistExtractionAgent responsible for extracting therapist information 
        from medical directory websites.
        """
        self.agent = Agent(
            description="Expert at extracting healthcare provider information from any website format",
            model=Gemini(id="gemini-1.5-flash"),
            instructions=["""
                You are a specialized extractor for healthcare provider information from websites.
                Analyze any HTML structure to find information about doctors, therapists, or healthcare providers.
                
                EXTRACTION STRATEGIES:
                1. Look for provider information in:
                   - Structured cards or listings
                   - Tables or lists
                   - Detailed profiles
                   - General content sections
                   - JSON-LD structured data
                
                2. Information patterns to identify:
                   - Names (with or without titles like Dr., Ms., Prof.)
                   - Professional roles/designations
                   - Qualifications and education
                   - Experience details
                   - Location/clinic information
                   - Fees and session details
                   - Specializations
                   - Contact information
                
                3. Common HTML patterns:
                   - Profile sections with provider details
                   - Lists of practitioners
                   - Appointment booking sections
                   - Contact information blocks
                   - Service description areas
                
                4. Data cleaning rules:
                   - Standardize name formats
                   - Extract numeric values from text
                   - Clean up qualifications
                   - Format locations consistently
                   - Handle multiple fee structures
                
                EXAMPLE OUTPUTS:
                1. Card-based format:
                {
                    "therapists": [{
                        "name": "Sarah Ahmed",
                        "designation": "Clinical Psychologist",
                        "qualification": "MBBS, PhD Psychology",
                        "location": "Lahore",
                        "experience": "10 years",
                        "fee": 2000
                    }]
                }
                
                2. Detailed profile format:
                {
                    "therapists": [{
                        "name": "Maryam Khan",
                        "designation": "Clinical Psychologist",
                        "qualification": "MSc Psychology, Multiple Certifications",
                        "specializations": ["CBT", "Play Therapy"],
                        "fee": 3000,
                        "session_duration": "45 Mins",
                        "locations": ["Online", "Clinic"],
                        "languages": ["English", "Urdu"]
                    }]
                }
                
                IMPORTANT:
                - Extract information regardless of HTML structure
                - Include partial information if full details aren't available
                - Look for information in text content, attributes, and structured data
                - Handle multiple formats and layouts
                - Return valid JSON only
            """]
        )

    def clean_html(self, html_content: str) -> str:
        """Enhanced HTML cleaning for any structure"""
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove non-content elements
        for tag in soup(['script', 'style', 'meta', 'link', 'iframe', 'noscript']):
            if tag.string and 'application/ld+json' not in str(tag.get('type', '')):
                tag.decompose()
        
        # Look for any meaningful content blocks
        content_blocks = []
        
        # Find elements with doctor/healthcare related content
        for element in soup.find_all(['div', 'section', 'article']):
            text = element.get_text().lower()
            if any(keyword in text for keyword in ['doctor', 'therapist', 'psychologist', 'consultation']):
                content_blocks.append(element)
        
        if content_blocks:
            return '\n'.join(str(block) for block in content_blocks)
        
        return str(soup)

    def extract_data(self, html_content: str) -> Dict:
        """Extract therapist information from HTML content"""
        # Pre-process HTML
        cleaned_html = self.clean_html(html_content)
        
        # Split into smaller chunks for processing
        soup = BeautifulSoup(cleaned_html, 'html.parser')
        
        # Try different strategies to find doctor information
        chunks = []
        
        # Strategy 1: Look for doctor-info-wrap elements (Sehatyab.com structure)
        doctor_infos = soup.find_all('div', class_='doctor-info-wrap')
        if doctor_infos:
            chunks.extend([str(info) for info in doctor_infos])
        
        # Strategy 2: Look for doctor-thumbnail elements with associated info
        doctor_thumbnails = soup.find_all('div', class_='doctor-thumbnail')
        for thumbnail in doctor_thumbnails:
            # Find associated info section
            info_body = thumbnail.find_next_sibling('div', class_='doctor-info-body')
            if info_body:
                chunks.append(str(thumbnail) + str(info_body))
        
        # Strategy 3: Look for complete doctor cards (OlaDoc structure)
        if not chunks:
            doctor_cards = soup.find_all('div', class_=lambda x: x and 'doctor-listing-card' in x)
            if doctor_cards:
                chunks.extend([str(card) for card in doctor_cards])
        
        # Strategy 4: Look for any sections with doctor information
        if not chunks:
            for section in soup.find_all(['div', 'section', 'article']):
                text = section.get_text().lower()
                if any(keyword in text for keyword in ['psychologist', 'therapist', 'psychiatrist']):
                    if len(text.strip()) > 100:  # Ensure meaningful content
                        chunks.append(str(section))
        
        # If still no chunks, use the whole content
        if not chunks:
            chunks = [cleaned_html]
        
        all_therapists = []
        seen_therapists = set()
        
        for i, chunk in enumerate(chunks, 1):
            if len(chunk.strip()) < 100:  # Skip very small chunks
                continue
            
            print(f"\nProcessing doctor information {i} of {len(chunks)} (size: {len(chunk)} characters)")
            print("-" * 50)
            print("Content preview:")
            print(chunk[:500] + "..." if len(chunk) > 500 else chunk)
            print("-" * 50)
            
            prompt = f"""
            Extract ALL therapist/doctor information from this HTML content.
            Look for:
            - Name (in headings, links, or strong tags)
            - Designation/Title
            - Qualifications/Education
            - Experience
            - Location/Clinic
            - Fees/Session details
            - Specializations
            
            For Sehatyab.com format, specifically check:
            - doctor-info-wrap divs
            - doctor-name sections
            - doctor-degree elements
            - session/fee information
            
            HTML Content:
            {chunk}
            """
            
            try:
                response = self.agent.run(prompt)
                content = response.content.strip()
                
                # Clean up the response
                if '```' in content:
                    content = content.split('```')[1]
                    if content.startswith('json'):
                        content = content[4:].strip()
                
                try:
                    chunk_data = json.loads(content)
                    if chunk_data.get('therapists'):
                        for therapist in chunk_data['therapists']:
                            # Create unique identifier
                            therapist_id = f"{therapist.get('name', '')}-{therapist.get('designation', '')}"
                            
                            if therapist_id not in seen_therapists and therapist.get('name'):
                                seen_therapists.add(therapist_id)
                                print("\nExtracted new therapist:")
                                print(json.dumps(therapist, indent=2))
                                print("-" * 50)
                                all_therapists.append(therapist)
                            else:
                                print("Skipping duplicate or invalid entry")
                                print("-" * 50)
                    else:
                        print("No therapist found in this content")
                        print("-" * 50)
                except json.JSONDecodeError as je:
                    print(f"JSON parsing error: {str(je)}")
                    print("Raw response:", content)
                    print("-" * 50)
                    continue
                
            except Exception as e:
                print(f"Error processing content: {str(e)}")
                if "quota" in str(e).lower():
                    print("Waiting 60 seconds before continuing...")
                    time.sleep(60)
                print("-" * 50)
                continue
        
        print(f"\nTotal unique therapists found: {len(all_therapists)}")
        return {"therapists": all_therapists}

# Initialize the agent
therapist_extraction_agent = TherapistExtractionAgent()