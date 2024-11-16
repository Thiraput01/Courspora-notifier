# Discord Course Notification Bot

A Discord bot that monitors Courspora for new content updates and automatically sends notifications to designated channels in Discord servers. Built with Docker for simple deployment and management.


https://github.com/user-attachments/assets/e7b9dc79-5582-4193-8e5d-abdfdcde806e


## Features

- Automatically checks for new content updates on Courspora
- Sends notifications to specified Discord channels
- Supports multiple servers (one notification channel per server)
- Easy deployment using Docker and Google Kubernetes Engine (GKE)
- Simple command interface for channel management

## Commands

| Command  | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| `!set`   | Sets the current channel to receive notifications. Limited to one channel per server. |
| `!clear` | Removes the current notification channel setting.                                     |

## Setup

### Prerequisites

- Docker and Docker Compose
- Google Cloud account with GKE enabled
- Discord Bot Token and ID

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Thiraput01/Courspora-notifier
cd Courspora-notifier
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your credentials:

```
TOKEN=your_discord_bot_token
BOT_ID=your_discord_bot_ID
```

3. Build and run with Docker:

```bash
docker-compose up -d
```

### Deploying with Google Kubernetes Engine (GKE)

1. Set up your GKE cluster: Ensure you have a GKE cluster created and configured. Refer to the GKE documentation for guidance.
2. Deploy the application: Use the provided Kubernetes configuration files to deploy the bot and the web scraper on GKE. Make sure to apply the necessary configurations for your environment by adding `env-config.yaml` file.
3. Access the bot: After deploying, use the external IP assigned to your Discord bot service to test the functionality.

## Usage

1. Invite the bot to your Discord server using the OAuth2 URL generated from the Discord Developer Portal.

2. Choose the channel where you want to receive notifications.

3. In the desired channel, type:

```
!set
```

To change the notification channel:

1. Go to the current notification channel
2. Type `!clear`
3. Go to the new desired channel
4. Type `!set`

## Docker Deployment

The bot comes with a pre-configured Docker setup for easy deployment:

```yaml
version: "3"
services:
  web-scraper:
    build: ./scrape
    container_name: web_scraper
    restart: unless-stopped
    volumes:
      - ./scrape:/app
    env_file:
      - .env
    networks:
      - app-network

  discord-bot:
    build: ./bot
    container_name: discord_bot
    restart: unless-stopped
    ports:
      - "5000:5000"
    volumes:
      - ./bot:/app
    env_file:
      - .env
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Discord.js library for Discord bot functionality
- Docker for containerization
- Google Cloud Platform for hosting the application using GKE.
- [Courspora](https://www.courspora.my.id/) for providing the course content .
