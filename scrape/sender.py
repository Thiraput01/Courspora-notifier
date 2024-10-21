import requests
import json

# URL to the bot's API endpoint
BOT_API_URL = 'http://localhost:5000/send-course'  # Example

# Function to send course data to the bot
def send_to_discord(course_info):
    response = requests.post(BOT_API_URL, json=course_info)
    if response.status_code != 200:
        print(f'Failed to send data to bot: {response.status_code}, {response.text}')
    else:
        print('Data successfully sent to bot')
