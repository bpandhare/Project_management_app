import express from 'express';
import 'dotenv/config';
import {clerkMiddleware} from '@clerk/express'
import {serve} from "inngest/express"
import { Inngest,functions} from "./inngest/index.js"

import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send('Server is live!');
});

app.use("/api/inngest",server({client:Inngest,functions}));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});