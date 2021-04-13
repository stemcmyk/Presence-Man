const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const moment = require("moment");
const Database = require("../../database");
const Basic_functions = require("../../basic_functions");

module.exports = {
  name: "findweekly",
  category: "info",
  description:
    "Fetches a specific presence for a week, arguments: [presence: text (required),  number (year, optional): 2021+, number (week, optional): 1-51]",
  run: async (client, msg, args) => {
    var date = new Date();
    var incr = 5;
    var week = date.getWeek();
    var year = date.getFullYear();

    // Over complicated checking thingy.

    if (args.length == 1) {
    } else if (args.length == 2) {
      if (!isNaN(Number(args[1]))) {
        week = Number(args[1]);
      } else if (args[1].toLowerCase() == ("prev" || "previous")) {
        week -= 1;
      } else {
        msg.channel.send("invalid time stamps!");
        return;
      }
    } else if (args.length >= 3) {
      var isn = !isNaN(Number(args[1])) && !isNaN(Number(args[2]));
      if (isn) {
        year = Number(args[1]);
        week = Number(args[2]);
      } else {
        msg.channel.send("invalid time stamps!");
        return;
      }
    } else {
      msg.channel.send("invalid status");
      return;
    }

    var presence = String(args.join(" "))
      .toLowerCase()
      .replace(` ${year}`, "")
      .replace(` ${week}`, "")
      .replace(` prev`, "")
      .replace(` previous`, "")
      .replace("-", " ");

    var user = await Database.fetchUser(msg.author.id);
    var ww = `${year}:${week}`;

    if (user.weeklypresences[ww] && user.weeklypresences[ww].length > 0) {
      var presences = [];

      user.weeklypresences[ww].forEach((item) => {
        if (item.name.toLowerCase().startsWith(presence)) {
          presences.push(item);
        }
      });

      var sortedTable = Basic_functions.sortTable(presences, 3);

      if (sortedTable.length > 0) {
        const embed = new MessageEmbed()
          .setTitle(
            `Top ${sortedTable.length} results for "${presence}" week ${week} - ${year}:`
          )
          .setColor(0xff0000);
        embed.setAuthor(
          msg.author.username,
          `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}?size=256`
        );

        sortedTable.forEach((presence) => {
          embed.addField(
            presence.name,
            Basic_functions.format_time(presence.time),
            true
          );
        });
        msg.channel.send(embed);
      } else {
        msg.channel.send("no data found for that presence");
      }
    } else {
      msg.channel.send(
        `no presences has been stored for year: ${year} week: ${week}`
      );
    }
  },
};
