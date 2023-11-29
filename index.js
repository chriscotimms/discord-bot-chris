require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js"); //import discord.js
const { OpenAIApi, Configuration } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPEN_AI,
});

const openai = new OpenAIApi(config);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}); //create new client

client.once(Events.ClientReady, (clientUser) => {
  console.log(`Logged on as ${clientUser.user.tag}`);
});

const BOT_ID = "1179054873174605868"; //private discord channel id
const PAST_MESSAGES = 5;

//make sure this line is the last line
client.login(process.env.BOT_TOKEN); //login bot using token

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return;

  //disable if used on other channels
  if (msg.channel.id !== BOT_ID) return;

  if (msg.content === "ping") {
    msg.reply("Pong!");
  }

  message.channel.sendTyping();

  let messages = Array.from(
    await message.channel.messages.fetch({
      limit: PAST_MESSAGES,
      before: message.id,
    })
  );
  messages = message.map((m) => m[1]);
  messages.unshift(message);

  let users = [
    ...new Set([
      ...messages.map((m) => m.member.displayName),
      client.user.username,
    ]),
  ];

  let lastUser = users.pop();

  let prompt = `The following is a conversation between Chris and Christina`;

  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    prompt += `${m.member.displayName}: ${m.content}\n`;
  }
  prompt += `${clinet.user.username}:`;
  console.log("prompt:", prompt);

  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    max_tokens: 500,
    stop: ["\n"],
  });

  console.log("response", response.data.choices[0].text);
  await message.channel.send(response.data.choices[0].text);
});
