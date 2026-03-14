import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import type { Request, Response } from "express";
import userRepository from "../repository/user.repository";
const loginRouter = express.Router();

loginRouter.post("/", async (request: Request, response: Response) => {
  const { name, password } = request.body;

  const user = await userRepository.getByName(name);
  if (!user) {
    response.status(401).json({ errors: "Invalid credential" });
    return;
  }
  const passwordValid =
    user === null ? false : await bcrypt.compare(password, user?.password);
  if (!passwordValid) {
    response.status(401).json({ errors: "Invalid credential" });
    return;
  }

  const userForToken = {
    name: user.name,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET!, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({ token, username: user.name });
});

export default loginRouter;
