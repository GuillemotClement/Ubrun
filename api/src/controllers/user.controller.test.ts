import { db } from "../lib/drizzle";
import supertest from "supertest";
import { app } from "../app";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import passwordUtils from "../utils/password";
import { userTable } from "../db/schema";

const api = supertest(app);

beforeEach(async () => {
  await db.delete(userTable);
  const hashedPassword = await passwordUtils.hashPassword("password");
  const initialUser = [
    {
      name: "gizmo",
      email: "gizmo@mail.com",
      password: hashedPassword,
    },
    {
      name: "mimix",
      email: "mimix@mail.com",
      password: hashedPassword,
    },
  ];
  await db.insert(userTable).values(initialUser);
});

describe("GET /api/users", () => {
  it("should be define", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should return user list", async () => {
    const response = await api.get("/api/users");
    expect(response.body.users.length).toBe(2);
  });

  it("should not return password", async () => {
    const response = await api.get("/api/users");
    expect(
      response.body.users.every((user: object) => !("password" in user)),
    ).toBe(true);
  });
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "jean",
      email: "jean@mail.com",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/users");

    expect(response.body.users.length).toBe(3);
  });

  it("should throw error if email is not valid", async () => {
    const newUser = {
      name: "jean",
      email: "jeaail.com",
      password: "password",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.errors).toHaveProperty("email");
  });

  it("should thrrow error is name is not valid", async () => {
    const newUser = {
      name: "j",
      email: "jean@mail.com",
      password: "password",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.errors).toHaveProperty("name");
  });
});
