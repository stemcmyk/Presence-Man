const { DataResolver } = require("discord.js");
var databaseName = "Main";

const sqlite3 = require("sqlite3").verbose();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

require("dotenv").config();
const url = process.env.CONNECTION_STRING;

// Database Name
const client = new MongoClient(url, { useUnifiedTopology: true });
const connection = client.connect();

function createUserPreset(d) {
  return {
    username: d.name,
    discordId: d.id,
    presences: [],
    weeklypresences: {},
  };
}

var createUser = async (data) => {
  return new Promise(function (rs, rr) {
    const connect = connection;

    connect.then(() => {
      const db = client.db(databaseName);
      db.collection("users").findOne({ discordId: data.id }, (err, uData) => {
        if (!uData) {
          db.collection("users").insertOne(
            createUserPreset({ id: data.id, name: data.name }),
            (err, fData) => {
              if (err) {
                rs(err);
              }
              if (fData.insertedCount == 1) {
                rs();
              } else {
                rr("either no inserts or more than one?");
              }
            }
          );
        } else {
          rr("user already exists");
        }
      });
    });
  });
};

var fetchUser = async (id) => {
  return new Promise(function (rs, rr) {
    const connect = connection;
    connect.then(() => {
      const db = client.db(databaseName);
      db.collection("users").findOne({ discordId: id }, (err, data) => {
        if (data) {
          rs(data);
        } else {
          rr(err);
        }
      });
    });
  });
};

var fetchUsers = async () => {
  return new Promise(function (rs, rr) {
    const connect = connection;

    connect.then(() => {
      const db = client.db(databaseName);
      db.collection("users")
        .find({})
        .toArray((err, users) => {
          if (err) throw err;
          rs(users);
        });
    });
  });
};

fetchUsers();

var updateTime = async (id, presences, time) => {
  return new Promise(async function (rs, rr) {
    var userData = await fetchUser(id);
    presences.forEach((p) => {
      // I know it's stupid to have the same code twice but with slight changes but i'm slightly lazy
      if (!p.applicationID) return;
      var find = userData.presences.find((data) => data.id == p.applicationID);
      if (find && find.id) {
        find.time += 5;
      } else {
        if (p.applicationID) {
          userData.presences.push({
            id: p.applicationID,
            name: p.name,
            time: 5,
          });
          console.log(
            `Reading new presence for (${id}). Presence Name: "${p.name}"`
          );
        }
      }

      // Weekly presence section
      var date = new Date();
      var ww = `${date.getFullYear()}:${date.getWeek()}`;
      // Create the weeklypresence object if it does not exist
      if (!userData.weeklypresences) userData.weeklypresences = {};
      // Create the current weeks array if it does not exit
      if (!userData.weeklypresences[ww]) userData.weeklypresences[ww] = [];

      var find = userData.weeklypresences[ww].find(
        (data) => data.id == p.applicationID
      );
      if (find && find.id) {
        find.time += 5;
      } else {
        if (p.applicationID) {
          userData.weeklypresences[ww].push({
            id: p.applicationID,
            name: p.name,
            time: 5,
          });
          console.log(
            `Reading new weekly (${ww}) presence for (${id}). Presence Name: "${p.name}"`
          );
        }
      }
    });

    const connect = connection;
    connect.then(() => {
      const db = client.db(databaseName);
      db.collection("users").updateOne(
        { discordId: id },
        { $set: userData },
        (err, data) => {
          if (err) throw err;
          rs("success");
        }
      );
    });
  });
};

module.exports = { createUser, fetchUser, fetchUsers, updateTime };
