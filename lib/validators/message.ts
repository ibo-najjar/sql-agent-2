import { z } from "zod";

export const MessageSchema = z.object({
  id: z.string(),
  isUserMessage: z.boolean(), // system or user
  text: z.string(),
});

// array validation
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
export type MessageArray = z.infer<typeof MessageArraySchema>;
