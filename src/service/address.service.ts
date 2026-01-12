import { Address, User, Contact } from "@prisma/client";
import {
  AddresResponse,
  CreateAddressRequest,
  GetAddressRequest,
  RemoveAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prisma } from "../application/database";
import { response } from "express";
import { ResponseError } from "../error/response-error";
import { UserRequest } from "../type/user-request";

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

  static async checkAddressMustExists(
    contactId: number,
    addressId: number
  ): Promise<Address> {
    const address = await prisma.address.findFirst({
      where: {
        contact_id: contactId,
        id: addressId,
      },
    });

    if (!address) {
      throw new ResponseError(404, `Address not found`);
    }
    return address;
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
    const address = await this.checkAddressMustExists(
      getRequest.contact_id,
      getRequest.id
    );
    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddresResponse> {
    const updateRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );
    await this.checkAddressMustExists(
      updateRequest.contact_id,
      updateRequest.id
    );

    const address = await prisma.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contact_id,
      },
      data: updateRequest,
    });

    return toAddressResponse(address);
  }

  static async remove(
    user: User,
    request: RemoveAddressRequest
  ): Promise<AddresResponse> {
    const removeRequest = Validation.validate(
      AddressValidation.REMOVE,
      request
    );
    await ContactService.checkContactMustExists(
      user.username,
      request.contact_id
    );
    await this.checkAddressMustExists(
      removeRequest.contact_id,
      removeRequest.id
    );

    const address = await prisma.address.delete({
      where: {
        id: removeRequest.id,
        // contact_id: removeRequest.contact_id,
      },
    });
    return toAddressResponse(address);
  }

  static async list(
    user: User,
    contactId: number
  ): Promise<Array<AddresResponse>> {
    await ContactService.checkContactMustExists(user.username, contactId);

    const addresses = await prisma.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((address) => toAddressResponse(address));
  }
}
