import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { systemPrompt } from "../lib/constants";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  // Handle file uploads if present
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.content.includes("[Uploaded file:")) {
    return new Response(
      JSON.stringify({
        role: "assistant",
        content:
          "I've received your file. If this were a real medical report, I could analyze it for key health indicators. Is there anything specific you'd like to know about women's health?",
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  // Use AI SDK to generate response
  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}