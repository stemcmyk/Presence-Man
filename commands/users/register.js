const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const moment = require("moment");
const Database = require("../../database");
const Basic_functions = require("../../basic_functions");

var excluded = ["Spotify"];

module.exports = {
  name: "register",
  category: "info",
  description: "Registers you to presence storing",
  run: async (client, msg, args) => {
    var uid = msg.author.id;
    var chan = msg.channel;
    var confirm = await Database.createUser({
      id: uid,
      name: msg.author.username,
    })
      .then((confirm) => {
        chan.send(`<@${uid}>, you have been registerd!`);
      })
      .catch((err) => {
        chan.send("[Error]: " + err);
      });
  },
};
