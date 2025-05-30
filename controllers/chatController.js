const OpenAI = require("openai");
const apiKey = process.env.OPENAI_KEY;

const chatMessage = async (conversationHistory) => {
  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversationHistory,
      max_tokens: 500,
      temperature: 0.4,
    });

    const llmResponseContent = completion.choices[0]?.message?.content;

    if (!llmResponseContent) {
      console.warn("OpenAI 응답에서 content를 찾을 수 없습니다:", completion);
      return "죄송합니다. AI가 답변을 생성했지만 내용을 찾을 수 없습니다.";
    }

    return llmResponseContent;
  } catch (error) {
    console.error("OpenAI API 호출 중 오류 발생:", error);

    return "죄송합니다. AI 답변 생성 중 문제가 발생했습니다. 다시 시도해 주세요.";
  }
};

module.exports = {
  handleMessage: async (ws, message) => {
    try {
      // WebSocket 메시지 파싱
      const parsedMessage = JSON.parse(decodeURI(message));

      // 실제 대화 히스토리 추출
      const conversationHistory = parsedMessage.messages;

      const response = await chatMessage(conversationHistory);
      ws.send(response);
    } catch (error) {
      console.error(error);
      ws.send("죄송합니다. 답변을 생성하지 못했습니다. 다시 시도해 주세요.");
    }
  },
};
