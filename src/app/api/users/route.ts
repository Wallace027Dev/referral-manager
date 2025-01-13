import usersController from "@/_controllers/usersController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return await usersController.listAll(req);
  } catch (error) {
    return handleError(error);
  }
}