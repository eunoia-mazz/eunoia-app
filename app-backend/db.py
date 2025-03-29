import sqlite3

try:
    # Connect to the SQLite database
    conn = sqlite3.connect('/home/welcome/Desktop/eunoia-app/app-backend/instance/eunoia.db')

    cursor = conn.cursor()
    
    # Query to identify problematic entries
    # cursor.execute("SELECT * FROM subactivities WHERE difficulty_level NOT IN ('easy', 'medium', 'hard')")
    # rows = cursor.fetchall()
    # print(rows)

    # Correct entries (example)
    # cursor.execute("UPDATE user_activities SET completed = False AND completed_at = Null ")
    # conn.commit()

    # # Verify changes
    cursor.execute("SELECT * FROM therapists where name = 'Ms. Huma Ali'")
    print(cursor.fetchone())

finally:
    # Close the connection to the database
    conn.close()
