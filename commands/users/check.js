const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const moment = require("moment");
const Database = require("../../database");
const Basic_functions = require("../../basic_functions");

var excluded = ["Spotify"];

module.exports = {
  name: "check",
  category: "info",
  description: "Returns current active presences",
  run: async (client, msg, args) => {
    var presences = msg.guild.presences.cache.get(msg.author.id);
    var show = [];
    presences.activities.forEach((presence) => {
      if ((presence.type = "PLAYING")) {
        var not = false;
        excluded.forEach((exc) => {
          if (presence.name == exc) not = true;
        });
        if (!not) {
          show.push(presence);
        }
      }
    });

    const embed = new MessageEmbed()
      .setTitle("Current presences")
      .setColor(0xff0000);
    embed.setAuthor(
      msg.author.username,
      `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}?size=256`
    );

    show.forEach((presence) => {
      embed.addField(presence.name, `**State**: *${presence.state}*`, true);
    });

    msg.channel.send(embed);
  },
};
