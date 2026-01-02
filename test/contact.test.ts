import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util.test";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  test("should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "aris",
        last_name: "kurnia",
        email: "aris@mail.com",
        phone: "01234567",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("aris");
    expect(response.body.data.last_name).toBe("kurnia");
    expect(response.body.data.email).toBe("aris@mail.com");
    expect(response.body.data.phone).toBe("01234567");
  });

  test("should create new contact", async () => {
    const response = await supertest(web)
      .post("/api/contacts")
      .set("X-API-TOKEN", "test")
      .send({
        first_name: "",
        last_name: "kurnia",
        email: "aris",
        phone: "",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
