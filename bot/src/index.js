require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const { buildEmbedUser } = require("./buildEmbed");

const app = express();
app.use(express.json());

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let targetChannels = new Map(); // Too lazy to set up a database xD

app.post("/send-course", (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send("missing request body");
      return;
    }

    const courseInfo = req.body;
    if (!courseInfo.name || !courseInfo.url || !courseInfo.img_url) {
      res.status(400).send("Invalid course information.");
      return;
    }

    sendMessageToChannels(courseInfo);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending message to channel:", error);
    res.status(500).send("Internal server error.");
  }
});

function sendMessageToChannels(courseInfo) {
  targetChannels.forEach(async (channelId, guildId) => {
    try {
      const channel = await client.channels.fetch(channelId);
      const embed = await buildEmbedUser(courseInfo);
      await channel.send({ embeds: [embed] });
    } catch (error) {
      message.channel.send("An error occurred while sending the embed.");
    }
  });
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();

  if (content === "!set") {
    if (targetChannels.has(message.guild.id)) {
      const channelId = targetChannels.get(message.guild.id);
      const channel = await client.channels.fetch(channelId);
      message.channel.send(
        `A target channel has already been set at ${channel.name}.`
      );
      return;
    }
    targetChannels.set(message.guild.id, message.channel.id);
    message.channel.send(
      "This channel has been set as the target channel for sending messages."
    );
  } else if (content === "!clear") {
    if (targetChannels.has(message.guild.id)) {
      targetChannels.delete(message.guild.id);
      message.channel.send("The target channel has been cleared.");
    } else {
      message.channel.send("No target channel has been set.");
    }
  }
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
