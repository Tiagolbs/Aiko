const { Client, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');
const { join } = require('node:path');
const { readdirSync } = require('node:fs');
config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach(handler => {
	require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);