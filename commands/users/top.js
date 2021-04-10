const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const moment = require("moment");
const Database = require("../../database");
const Basic_functions = require("../../basic_functions");

module.exports = {
  name: "top",
  category: "info",
  description: "Returns top presences, arguments: [number: 1-10]",
  run: async (client, msg, args) => {
    var args = msg.content.split(" ");
    var incr = 5;
    if (args[1]) {
      if (Number(args[1])) {
        incr = Number(args[1]);
      } else {
        msg.channel.send(`<@${msg.author.id}>, Invalid number`);
        return;
      }
    }
    if (incr > 10) {
      msg.channel.send(
        `<@${msg.author.id}>, number is too high. Use a number between 1 and 10!`
      );
      return;
    }
    var times = await Database.fetchUser(msg.author.id);

    var srf = Basic_functions.sortTable(times.presences, incr);

    const embed = new MessageEmbed()
      .setTitle(`Top ${incr} presence statuses`)
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
  },
};
