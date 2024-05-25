import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";

export type ChatGPTAgent = "user" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number; //how crazy the AI is
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number; // max length of the response
  stream: boolean;
  n: number; // number of responses
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder(); // for converting strings to Uint8Array
  const decoder = new TextDecoder(); // for converting Uint8Array to strings

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data); // parse the JSON
            const text = json.choices[0].delta?.content || ""; // get the text from the response
            console.log("text", text);
            if (counter > 2 && (text.match(/\n/) || []).length) {
              // if the text has more than 2 newlines, close the stream
              return;
            }
            const queue = encoder.encode(text); // encode the text to Uint8Array
            controller.enqueue(queue); // enqueue the Uint8Array
            counter++; // increment the counter
          } catch (error) {
            controller.error(error);
          }
        }
      }

      const parser = createParser(onParse); // create the parser

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk)); // feed the parser with the chunk
      }
    },
  });

  return stream;
}
