import { chatbotPrompt } from "@/helpers/chatbot-prompt";
import { db } from "@/lib/db";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
  }));

  // const cutsomers = await db.customers.findMany({});

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt([]),
  });

  console.log("outboundmessages", outboundMessages);

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo", //gpt-3.5-turbo
    messages: outboundMessages,
    temperature: 0.4, // how crazy the AI is
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 500, // max length of the response
    stream: true,
    n: 1, // number of responses
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
