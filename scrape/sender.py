import requests
import os
import logging
from dotenv import load_dotenv

load_dotenv()

BOT_API_URL = os.getenv('BOT_API_URL', 'http://localhost:5000/send-course')

def send_to_discord(course_info):
    print(f'Using bot API URL: {BOT_API_URL}')
    response = requests.post(BOT_API_URL, json=course_info)
    if response.status_code != 200:
        logging.info(f'Failed to send data to bot: {response.status_code}, {response.text}')
    else:
        logging.info('Data successfully sent to bot')
