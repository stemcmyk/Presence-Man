const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const moment = require("moment");
const Database = require("../../database");
const Basic_functions = require("../../basic_functions");

module.exports = {
  name: "topweekly",
  category: "info",
  description:
    "Find weekly top presences. arguments: [number: 1 - 10, (optional) number (year): 2021+, number (week): 1-51]",
  run: async (client, msg, args) => {
    var date = new Date();

    var incr = 5;
    var week = date.getWeek();
    var year = date.getFullYear();

    // Over complicated checking thingy.
    if (args.length == 1) {
      if (!isNaN(Number(args[0]))) {
        incr = Number(args[0]);
      } else {
        msg.channel.send("invalid argument");
        return;
      }
    } else if (args.length == 2) {
      if (!isNaN(Number(args[0]) && !isNaN(Number(args[1])))) {
        year = Number(args[0]);
        week = Number(args[1]);
      } else {
        msg.channel.send("invalid time stamps!");
        return;
      }
    } else if (args.length >= 3) {
      if (!isNaN(Number(args[0]))) {
        incr = Number(args[0]);
      } else {
        msg.channel.send("invalid argument");
        return;
      }

      var isn =
        !isNaN(Number(args[0]) && !isNaN(Number(args[1]))) &&
        !isNaN(Number(args[2]));
      if (isn) {
        year = Number(args[1]);
        week = Number(args[2]);
      } else {
        msg.channel.send("invalid time stamps!");
        return;
      }
    }

    if (incr > 10) {
      msg.channel.send(
        `<@${msg.author.id}>, number is too high. Use a number between 1 and 10!`
      );
      return;
    }

    var ww = `${year}:${week}`;
    var user = await Database.fetchUser(msg.author.id);

    if (user.weeklypresences[ww]) {
      var srf = Basic_functions.sortTable(user.weeklypresences[ww], incr);

      const embed = new MessageEmbed()
        .setTitle(
          `Top ${srf.length} presence statuses for ${year} week: ${week}`
        )
        .setColor(0xff0000);
      embed.setAuthor(
        msg.author.username,
        `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}?size=256`
      );

      srf.forEach((presence) => {
        embed.addField(
          presence.name,
          Basic_functions.format_time(presence.time),
          true
        );
      });

      msg.channel.send(embed);
    } else {
      msg.channel.send(
        `no presences has been stored for ${year} week: ${week}`
      );
    }
  },
};
