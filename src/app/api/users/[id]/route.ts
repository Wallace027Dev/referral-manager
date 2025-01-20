import { NextRequest } from "next/server";
import usersController from "@/_controllers/usersController";
import handleError from "@/_error/handleError";
import getAndValidateID from "@/_utils/getAndValidateId";

export async function GET(req: NextRequest) {
  try {
    const id = getAndValidateID(req);

    return await usersController.listById(id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
