const { Events } = require('discord.js');
const { messageGenerator } = require('../utils/message-generator.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message, client) {
		if (message.author.bot) {
			return;
		}

		if (message.content.includes('@here') || message.content.includes('@everyone')) {
			return;
		}

		const mentions = message.mentions.users;
		if (client.user && mentions.has(client.user.id)) {
			message.channel.sendTyping();
			const messageContent = message.content.replace(/<.*?>/g, '').trim();
			const response = await messageGenerator(messageContent);
			message.channel.send(response.content);
		}
	},
};