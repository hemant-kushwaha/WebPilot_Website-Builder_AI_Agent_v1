import { GoogleGenAI } from "@google/genai";

import { WEBSITE_SYSTEM_PROMPT } from "./prompt.js";

import { websiteTools, executeTool } from "./tools.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const model = process.env.MODEL;

export async function runWebsiteBuilder({
  message,
  previousInteractionId = null,
  res,
}) {
  let input = message;
  let interactionId = previousInteractionId;

  while (true) {
    const stream = await ai.interactions.create({
      model,

      system_instruction: WEBSITE_SYSTEM_PROMPT,

      input,

      previous_interaction_id: interactionId || undefined,

      tools: websiteTools,
      stream: true,
      // generation_config: {
      //   thinking_level: "minimal",
      // },
    });

    const functionResults = [];
    let currentCall = null;

    for await (const event of stream) {
      //// Send text immediately to browser
      if (event.event_type === "step.delta" && event.delta.type === "text") {
        res.write(event.delta.text);
      }

      // Get interaction ID
      if (event.event_type === "interaction.completed") {
        interactionId = event.interaction.id;
      }

      // Function call
      if (
        event.event_type === "step.start" &&
        event.step?.type === "function_call"
      ) {
        currentCall = {
          id: event.step.id,
          name: event.step.name,
          arguments: "",
        };
      }

      // Function arguments arrive as deltas
      if (
        event.event_type === "step.delta" &&
        event.delta?.type === "arguments_delta"
      ) {
        currentCall.arguments += event.delta.arguments;
      }

      // Function call finished
      if (event.event_type === "step.stop" && currentCall) {
        let result;

        try {
          const args = JSON.parse(currentCall.arguments); //arguments_delta gives you the arguments as a JSON string.'{"path":"hemant-portfolio"}'

          result = await executeTool(currentCall.name, args);
        } catch (error) {
          result = {
            error: error.message,
          };
        }

        functionResults.push({
          type: "function_result",
          name: currentCall.name,
          call_id: currentCall.id,
          result: [
            {
              type: "text",
              text:
                typeof result === "string" ? result : JSON.stringify(result),
            },
          ],
        });

        currentCall = null;
      }
    }

    // Breaking the outer loop
    if (functionResults.length === 0) return { interactionId };

    //Tool was called So outer LOOP continues
    input = functionResults;
  }
}
