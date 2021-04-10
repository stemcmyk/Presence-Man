module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  run: async (client, msg, args) => {
    msg.channel.send(`Pong - ${client.ws.ping}ms`);
  },
};
