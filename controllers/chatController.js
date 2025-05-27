const OpenAI = require("openai");
const apiKey = process.env.OPENAI_KEY;

const chatMessage = async (message) => {
  const client = new OpenAI({ apiKey });
  const userMessage = message.toString().trim();

  const response = await client.responses.create({
    model: "gpt-4o",
    input: userMessage,
  });

  return response.output_text;
};

module.exports = {
  handleMessage: async (ws, message) => {
    try {
      const response = await chatMessage(message);
      ws.send(response);
    } catch (error) {
      console.error(error);
      ws.send("죄송합니다. 답변을 생성하지 못했습니다. 다시 시도해 주세요.");
    }
  },
};
