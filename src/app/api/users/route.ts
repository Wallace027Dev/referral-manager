import usersController from "@/_controllers/usersController";
import handleError from "@/_error/handleError";
import getQueryParams from "@/_utils/getQueryParams";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const queryParams = getQueryParams(req);

    return await usersController.listAll(queryParams);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    return await usersController.create(body);
  } catch (error) {
    return handleError(error);
  }
}

