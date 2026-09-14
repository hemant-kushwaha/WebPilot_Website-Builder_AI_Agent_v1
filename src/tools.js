import {
  createDirectory,
  writeFile,
  readFile,
  listFiles,
} from "./workspace/fileSystem.js";

/*
 * Tool definitions
 *
 * These tell Gemini:
 * - what tools exist
 * - what each tool does
 * - what arguments each tool accepts
 */

export const websiteTools = [
  {
    type: "function",
    name: "createDirectory",

    description:
      "Creates a new directory inside the generated website workspace.",

    parameters: {
      type: "object",

      properties: {
        path: {
          type: "string",
          description: "Relative directory path. Example: coffee-shop",
        },
      },

      required: ["path"],
    },
  },

  {
    type: "function",
    name: "writeFile",

    description: "Creates or overwrites a file inside the website workspace.",

    parameters: {
      type: "object",

      properties: {
        path: {
          type: "string",
          description: "Relative file path. Example: coffee-shop/index.html",
        },

        content: {
          type: "string",
          description: "Complete content of the file.",
        },
      },

      required: ["path", "content"],
    },
  },

  {
    type: "function",
    name: "readFile",

    description:
      "Reads the contents of an existing file from the website workspace.",

    parameters: {
      type: "object",

      properties: {
        path: {
          type: "string",
          description: "Relative file path. Example: coffee-shop/index.html",
        },
      },

      required: ["path"],
    },
  },

  {
    type: "function",
    name: "listFiles",

    description: "Lists all files and directories inside a website project.",

    parameters: {
      type: "object",

      properties: {
        path: {
          type: "string",
          description: "Relative directory path. Example: coffee-shop",
        },
      },

      required: ["path"],
    },
  },
];

/*
 * Tool executor
 *
 * Gemini will give us a tool name and arguments.
 *
 * Example:
 *
 * {
 *   name: "writeFile",
 *   args: {
 *     path: "coffee-shop/index.html",
 *     content: "<html>...</html>"
 *   }
 * }
 *
 * We use the name to find the correct JavaScript function.
 */

export const toolExecutors = {
  createDirectory,
  writeFile,
  readFile,
  listFiles,
};

/*
 * Executes a Gemini tool call.
 */

export async function executeTool(name, args) {
  const tool = toolExecutors[name];

  if (!tool) {
    throw new Error(`Unknown tool: ${name}`);
  }

  return await tool(args);
}
