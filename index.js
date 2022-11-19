require('dotenv').config(); //initialize dotenv

const axios = require('axios'); //add this line at the top
const Discord = require('discord.js'); //import discord.js
// const client = new Discord.Client(); //create new client
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences
	],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "!";

client.on("messageCreate", function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	const members = message.guild.members.cache;
	const m_bot = message.guild.members.cache.filter(member => member.user.bot);
	const active = members.filter(m => m.presence?.status === 'online').size;
	const offline = members.filter(m => !m.presence || m.presence.status === 'offline').size;
	const dnd = members.filter(m => m.presence?.status === 'dnd').size;
	const afk = members.filter(m => m.presence?.status === 'idle').size;
	const zbot_online = m_bot.filter(m => m.presence?.status === 'online').size;
	const online = active + dnd + afk - zbot_online;

	if (command === "ping") {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}else if (command === "online"){
		// var onlineMember = guild.members.filter(m => m.presence.status === 'online');
		message.reply(`${online} People is online ^^`); //add bot online
	}else if (command === "zbot"){
		message.reply(`${zbot_online} bot is online ^^`);
	}
});

client.login(process.env.CLIENT_TOKEN); //login bot using token