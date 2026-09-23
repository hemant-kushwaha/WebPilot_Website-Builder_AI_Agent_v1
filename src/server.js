import "dotenv/config";
import cors from "cors";
import express from "express";

import { runWebsiteBuilder } from "./websiteBuilderAgent.js";

const app = express();

app.use(cors());
app.use(express.text({ type: "*/*" }));

let previousInteractionId = null;

app.post("/api/chat", async (req, res) => {
  const message = req.body;

  console.log("User Query:", message);

  if (!message) {
    return res.status(400).send("Message is required");
  }

  /*
   * SSE headers
   */
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders(); // to send headers immediately

  try {
    const result = await runWebsiteBuilder({
      message,
      previousInteractionId,
      res,
    });

    previousInteractionId = result.interactionId;
    res.end();
  } catch (error) {
    console.error("Website Builder Error:", error);

    res.write(`data: Something went wrong\n\n`);
    res.end();
    // res.status(500).send("Something went wrong");
  }
});

app.delete("/api", (_req, res) => {
  previousInteractionId = null;

  res.status(200).send();
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
