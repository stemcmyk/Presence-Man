const { Client, MessageEmbed, Presence, Collection } = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const ms = require("ms");
require("dotenv").config();
const Database = require("./database");
const Basic_functions = require("./basic_functions");

const client = new Client();
var prefix = process.env.PREFIX;
client.prefix = prefix;
var excluded = ["Spotify"];
const localInterval = 5000;
client.commands = new Collection(); // Collection for all commands
client.aliases = new Collection(); // Collection for all aliases of every command

["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args);
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(async () => {
    var users = await Database.fetchUsers();
    users.forEach((user) => {
      var cuser;
      client.guilds.cache.forEach((server) => {
        var duser = server.members.cache.get(user.discordId);
        if (duser) cuser = duser;
      });
      if (!cuser) return;
      var show = [];
      cuser.guild.presences.cache
        .get(cuser.id)
        .activities.forEach((presence) => {
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
      Database.updateTime(cuser.id, show, localInterval / 1000);
    });
  }, localInterval);
});

client.login(process.env.CLIENT_TOKEN);
