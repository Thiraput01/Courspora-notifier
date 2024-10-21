require("dotenv").config();
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const { buildEmbedUser } = require("./buildEmbed");

const app = express();
app.use(express.json()); // For parsing application/json

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set up a POST route to receive course data from Python
app.post("/send-course", (req, res) => {
  const courseInfo = req.body;
  console.log(courseInfo);

  // Send the message to the Discord channel
  sendMessageToChannel(courseInfo);
  res.sendStatus(200); // Respond with OK
});

app.get("/", (req, res) => {
  res.send("Hello World!");
  sendMessageToChannel({ course: "Test Course" });
});

function sendMessageToChannel(courseInfo) {
  const channelId = process.env.CHANNEL_ID; // Get the channel ID from environment variables

  client.channels
    .fetch(channelId)
    .then(async (channel) => {
      const embed = await buildEmbedUser(courseInfo);
      await channel.send({ embeds: [embed] });
    })
    .catch((error) => {
      console.error("Error fetching channel:", error);
    });
}

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  message.reply("Yo!");
  console.log(message.content);
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(process.env.CHANNEL_ID);
});

client.login(process.env.TOKEN);

// Start the Express server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
