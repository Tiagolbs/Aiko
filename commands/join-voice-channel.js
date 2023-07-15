const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Joins user\'s voice channel'),
	async execute(interaction) {
		const voice_channel = interaction.member?.voice.channel;
		if (voice_channel) {
			joinVoiceChannel({
				channelId: voice_channel.id,
				guildId: voice_channel.guild.id,
				adapterCreator: voice_channel.guild.voiceAdapterCreator,
				selfDeaf: false,
			});
			await interaction.reply({ content: ':smile:', ephemeral: true });
			return;
		}
		await interaction.reply('Sorry i can\'t join to your voice channel :pleading_face:');
	},
};