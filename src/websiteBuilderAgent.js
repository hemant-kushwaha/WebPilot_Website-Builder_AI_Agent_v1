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
    console.log("Calling Gemini...");

    const interaction = await ai.interactions.create({
      model,

      system_instruction: WEBSITE_SYSTEM_PROMPT,

      input,

      previous_interaction_id: interactionId || undefined,

      tools: websiteTools,
    });

    interactionId = interaction.id;

    console.log("Interaction ID:", interactionId);

    /*
     * Current Gemini Interactions API
     * uses `steps`, not `outputs`.
     */
    const steps = interaction.steps || [];

    console.log(
      "Steps:",
      steps.map((step) => step.type),
    );

    const functionResults = [];

    /*
     * Gemini can return one or more
     * function_call steps.
     */
    for (const step of steps) {
      if (step.type !== "function_call") {
        continue;
      }

      console.log("Tool requested:", step.name);

      console.log("Arguments:", step.arguments);

      let result;

      try {
        result = await executeTool(step.name, step.arguments);
      } catch (error) {
        console.error("Tool execution error:", error);

        result = {
          error: error.message,
        };
      }

      console.log("Tool result:", result);

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

    /*
     * No function calls means Gemini
     * has finished the task.
     */
    if (functionResults.length === 0) {
      console.log("No more tools required.");

      return {
        text: interaction.output_text || "",

        interactionId,
      };
    }

    /*
     * Send all tool results back to Gemini.
     */
    input = functionResults;
  }
}
