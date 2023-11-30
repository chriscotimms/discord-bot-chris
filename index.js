//$ node run dev
//to run BOT

//retrieves keys
require("dotenv").config();

// Importing the import.js module
// The ./ says that the "openai.js" module
// is in the same directory as
// the index.js file
const oAi = require("./openai");

//run main function from openai.js
oAi.main();

//DISCORD STUFF

//import discord.js
const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}); //create new client

//confirm connections in node for debugging
//returns "clientUser.user.tag" = name of bot
//and returns module/socket names ie "openai.js"
client.once(Events.ClientReady, (clientUser) => {
  console.log(`Logged on as ${clientUser.user.tag} and ${oAi.debug()}`);
});

//private discord channel id
const BOT_ID = "1179054873174605868";

//make sure this line is the last line
client.login(process.env.BOT_TOKEN); //login bot using token

client.on(Events.MessageCreate, async (msg) => {
  //discount if message from bot
  if (msg.author.bot) return;

  //disable if used on other channels
  // if (msg.channel.id !== BOT_ID) return;

  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

// console.log(oAi.main());
