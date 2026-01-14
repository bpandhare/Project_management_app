import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { functions } from "./inngest/functions.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.json({ message: "Server is live 🚀" });
});

// Inngest route (CORRECT)
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// 🚫 ABSOLUTELY NO app.listen() ON VERCEL
export default app;
