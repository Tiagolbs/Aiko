const { Events } = require('discord.js');

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
			const messageContent = message.content.replace(/<.*?>/g, '').trim();

			message.channel.sendTyping();

			message.channel.send('teste');
		}
	},
};