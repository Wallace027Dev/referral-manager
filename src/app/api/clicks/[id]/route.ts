import { NextRequest } from "next/server";
import clicksController from "@/_controllers/clicksController";
import handleError from "@/_error/handleError";
import getClickQueryParams from "@/_utils/getClickQueryParams";
import getAndValidateID from "@/_utils/getAndValidateId";

export async function GET(req: NextRequest) {
  try {
    const id = getAndValidateID(req);
    const queryParams = getClickQueryParams(req);

    return await clicksController.listAllByUserId(id, queryParams);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
