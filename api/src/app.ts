import express from "express";
import type { Request, Response } from "express";
import userRouter from "./controllers/user.controller";
import loginRouter from "./controllers/login.controller";
import cors from "cors";
import * as middleware from "./utils/middleware";
export const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  console.log("running");
  res.send("pong");
});

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknowEndpoint);
