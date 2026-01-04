import { Contact } from "@prisma/client";

export type ContactResponse = {
  //? following prisma rules
  id: number;
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  //? if not following prisma rules
  // id: number;
  // first_name: string;
  // last_name?: string;
  // email?: string;
  // phone?: string;
};

export type CreateContactRequest = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export type UpdateContactRequest = {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    //? following prisma rules
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
    //? if not following prisma rules
    // id: contact.id,
    // first_name: contact.first_name,
    // last_name: contact.last_name || undefined,
    // email: contact.email || undefined,
    // phone: contact.phone || undefined,
  };
}
