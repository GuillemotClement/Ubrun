import { Router } from "express";
import { Request, Response } from "express";
import passwordUtils from "../utils/password";
import * as z from "zod";
import userRepository from "../repository/user.repository";

const UserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
});

const userRouter = Router();

userRouter.get("/", async (_request: Request, response: Response) => {
  const users = await userRepository.getAll();

  response.json({ users: users });
  return;
});

userRouter.post("/", async (request: Request, response: Response) => {
  const payload = request.body;

  if (objectIsEmpty(payload)) {
    response.status(400).json({ error: "request is empty" });
    return;
  }

  const result = UserSchema.safeParse(payload);
  if (!result.success) {
    const tree = z.treeifyError(result.error);
    const errors = tree.properties;
    response.status(400).json({ errors });
    return;
  }

  const emailExisting = await userRepository.getByEmail(result.data.email);
  const nameExisting = await userRepository.getByName(result.data.name);

  if (emailExisting || nameExisting) {
    response.status(403).json({ error: "user already existing" });
    return;
  }

  const hashedPassword = await passwordUtils.hashPassword(result.data.password);

  const newUser = {
    name: result.data.name,
    email: result.data.email,
    password: hashedPassword,
  };

  try {
    const data = await userRepository.create(newUser);
    response.status(201).json({ user: data });
  } catch (err) {
    if (err instanceof Error) {
      response.status(500).json({ errors: err.message });
    } else {
      response.status(500).json({ errors: "An unexpected error occured" });
    }
  }
});

const objectIsEmpty = (obj: any) => {
  return (
    obj != null && typeof obj === "object" && Object.keys(obj).length === 0
  );
};

export default userRouter;
