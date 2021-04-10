const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const moment = require("moment");
const Database = require("../../database");
const Basic_functions = require("../../basic_functions");

module.exports = {
  name: "find",
  category: "info",
  description: "Finds a specific presence's time",
  run: async (client, msg, args) => {
    var userdata = await Database.fetchUser(msg.author.id);

    var presence = String(args.join(" ")).toLowerCase();

    var presences = [];
    userdata.presences.forEach((item) => {
      if (item.name.toLowerCase().startsWith(presence)) {
        presences.push(item);
      }
    });

    var sortedTable = Basic_functions.sortTable(presences, 3);

    const embed = new MessageEmbed()
      .setTitle(`Top ${sortedTable.length} results for "${presence}":`)
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
  },
};
