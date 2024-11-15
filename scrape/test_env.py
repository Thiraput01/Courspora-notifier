import os
from dotenv import load_dotenv

load_dotenv()

BOT_API_URL = os.getenv('BOT_API_URL', 'http://localhost:5000/send-course')
TOKEN = os.getenv('TOKEN')
CHANNEL_ID = os.getenv('CHANNEL_ID')
BOT_ID = os.getenv('BOT_ID')
PORT = os.getenv('PORT')

print(f'Using bot API URL: {BOT_API_URL}')
print(f'Using token: {TOKEN}')
print(f'Using channel id: {CHANNEL_ID}')
print(f'Using bot id: {BOT_ID}')
print(f'Using port: {PORT}')
