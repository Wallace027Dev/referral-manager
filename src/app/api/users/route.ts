import { NextRequest } from "next/server";
import usersController from "@/_controllers/usersController";
import handleError from "@/_error/handleError";
import getUserQueryParams from "@/_utils/getUserQueryParams";

export async function GET(req: NextRequest) {
  try {
    const queryParams = getUserQueryParams(req);

    return await usersController.listAll(queryParams);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
    return handleError("INTERNAL_SERVER_ERROR");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    return await usersController.create(body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
