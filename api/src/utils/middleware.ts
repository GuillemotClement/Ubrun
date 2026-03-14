import { NextFunction } from "express";
import type { Request, Response } from "supertest";
import * as logger from "./logger";

const unknowEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: "unknow endpoint" });
};

const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  logger.error(error.message);

  next(error);
};

export { unknowEndpoint, errorHandler };
