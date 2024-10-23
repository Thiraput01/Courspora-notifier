const { EmbedBuilder } = require("discord.js");

async function buildEmbedUser(courseInfo) {
  // example courseInfo
  // {
  //     "name": "Corporate Finance #6 Management of Current Assets",
  //     "author": "Robert (Bob) Steele",
  //     "ratings": "4.5",
  //     "url": "https://www.courspora.my.id/course/corporate-finance-6-management-of-current-assets"
  // }
  const embed = new EmbedBuilder()
    .setTitle("New Course Available!")
    .setImage(courseInfo.img_url)
    .setDescription(`A new course has been added.`)
    .setColor("Random")
    .addFields([
      { name: "Course Name", value: courseInfo.name },
      { name: "Author", value: courseInfo.author },
      { name: "Rating", value: courseInfo.ratings },
    ]);
  return embed;
}

module.exports = { buildEmbedUser };
