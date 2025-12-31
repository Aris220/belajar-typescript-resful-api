// jest.mock("../src/application/database");

import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util.test";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });
  test("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });

    logger.debug(response.body);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should register new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "secret",
      name: "test",
    });

    logger.debug(response.body);

    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });

  test("should succes login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "secret",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  test("should be rejected login user if username wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "wrong",
      password: "secret",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  test("should be rejected login user if username empty", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "secret",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test("should be rejected login user if password wrong", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "wrong",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  test("should be rejected login user if password empty", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
