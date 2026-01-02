import { prisma } from "../src/application/database";
import { Contact, User } from "@prisma/client";
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

export class ContactTest {
  static async deleteAll() {
    await prisma.contact.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async create() {
    await prisma.contact.create({
      data: {
        first_name: "aris",
        last_name: "kurnia",
        email: "aris@mail.com",
        phone: "01234567",
        username: "test",
      },
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prisma.contact.findFirst({
      where: {
        username: "test",
      },
    });
    if (!contact) {
      throw new Error("contact not found");
    }
    return contact;
  }
}
