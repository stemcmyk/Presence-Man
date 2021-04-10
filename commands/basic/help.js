const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const moment = require("moment");
const Database = require("../../database");
const Basic_functions = require("../../basic_functions");

module.exports = {
  name: "help",
  category: "info",
  description: "Returns all commands",
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setTitle("Available commands")
      .setColor(0xff0000);
    embed.setAuthor(
      msg.author.username,
      `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}?size=256`
    );

    client.commands.forEach((cmd) => {
      embed.addField(`${client.prefix}${cmd.name}`, `${cmd.description}`, true);
    });

    msg.channel.send(embed);
  },
};
