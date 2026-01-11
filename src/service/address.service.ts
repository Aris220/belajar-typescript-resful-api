import { User } from "@prisma/client";
import {
  AddresResponse,
  CreateAddressRequest,
  GetAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prisma } from "../application/database";
import { response } from "express";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddresResponse> {
    const createRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );

    const address = await prisma.address.create({
      data: createRequest,
    });

    return toAddressResponse(address);
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddresResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );
    const address = await prisma.address.findFirst({
      where: {
        id: getRequest.id,
        contact_id: getRequest.contact_id,
      },
    });
    if (!address) {
      throw new ResponseError(404, "addres not found");
    }
    return toAddressResponse(address);
  }
}
