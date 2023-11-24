const { Configuration, OpenAIApi } = require('openai');
const { config } = require('dotenv');

config();

const configuration = new Configuration({
	apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

async function messageGenerator(content, instruction) {
	try {
		const chatCompletion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo-16k',
			temperature: 0.2,
			messages: [{ role: 'user', content: `${instruction} \n\n\n ${content}` }],
		});
		if (chatCompletion?.data?.choices?.[0]?.message) {
			return chatCompletion.data.choices[0].message;
		}
		return 'Sorry, i\'m having connection problems. :pleading_face:';

	}
	catch (error) {
		console.error(error);
	}
}

module.exports = { messageGenerator };