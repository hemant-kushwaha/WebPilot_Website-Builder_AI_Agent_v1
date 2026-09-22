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
}) {
  let input = message;
  let interactionId = previousInteractionId;

  while (true) {
    const interaction = await ai.interactions.create({
      model,

      system_instruction: WEBSITE_SYSTEM_PROMPT,

      input,

      previous_interaction_id: interactionId || undefined,

      tools: websiteTools,
    });

    interactionId = interaction.id;
    const functionResults = [];

    // Gemini can return one or more function_call steps.
    for (const step of interaction.steps || []) {
      // Use IF to Execute Your Step Type

      if (step.type !== "function_call") continue;

      let result;

      try {
        result = await executeTool(step.name, step.arguments);
      } catch (error) {
        console.error("Tool execution error:", error);

        result = {
          error: error.message,
        };
      }

      // Function_result
      functionResults.push({
        type: "function_result",
        name: step.name,
        call_id: step.id,
        result: [
          {
            type: "text",
            text: typeof result === "string" ? result : JSON.stringify(result),
          },
        ],
      });
    }

    //No function calls means Gemini has finished the task.
    if (functionResults.length === 0) return interaction.output_text || "";

    //Send all tool results back to Gemini.
    input = functionResults;
  }
}
