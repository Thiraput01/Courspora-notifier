const { EmbedBuilder } = require("discord.js");

async function buildEmbedUser(courseInfo) {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "A new course has been added.",
      iconURL: "https://i.imgur.com/aliB1qK.png",
    })
    .setTitle(courseInfo.name)
    .setURL(courseInfo.url)
    .setImage(courseInfo.img_url)
    .setColor("Random")
    .addFields([
      { name: "Course Name", value: courseInfo.name },
      { name: "Author", value: courseInfo.author },
      { name: "Ratings", value: courseInfo.ratings },
    ]);
  return embed;
}

module.exports = { buildEmbedUser };
