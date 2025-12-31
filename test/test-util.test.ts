import { prisma } from "../src/application/database";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export class UserTest {
  static async delete() {
    await prisma.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prisma.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("secret", 10),
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        username: "test",
      },
    });
    if (!user) {
      throw new Error("User is not found");
    }
    return user;
  }
}
