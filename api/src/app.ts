import express from "express";
import type { Request, Response } from "express";

export const app = express();

app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  console.log("running");
  res.send("pong");
});
