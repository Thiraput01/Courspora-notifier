const { EmbedBuilder } = require("discord.js");

async function buildEmbedUser(courseInfo) {
  // example courseInfo
  // {
  //     "name": "Corporate Finance #6 Management of Current Assets",
  //     "author": "Robert (Bob) Steele",
  //     "ratings": "4.5",
  //     "url": "https://www.courspora.my.id/course/corporate-finance-6-management-of-current-assets".
  //     "img_url": "https://www.courspora.my.id/wp-content/uploads/2021/07/Corporate-Finance-6-Management-of-Current-Assets-300x169.jpg"
  // }
  const embed = new EmbedBuilder()
    .setAuthor({
      name: "A new course has been added.",
      iconURL: "https://i.imgur.com/aliB1qK.png",
    })
    .setTitle(courseInfo.name)
    .setURL(courseInfo.url)
    .setImage(courseInfo.img_url)
    .setColor("#00FF00") // Use a valid color code or predefined color constant
    .addFields([
      { name: "Course Name", value: courseInfo.name },
      { name: "Author", value: courseInfo.author },
      { name: "Ratings", value: courseInfo.ratings },
    ]);
  return embed;
}

module.exports = { buildEmbedUser };
