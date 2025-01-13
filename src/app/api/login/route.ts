import loginController from "@/_controllers/loginController";
import handleError from "@/_error/handleError";
import { NextRequest } from "next/server";

export async function POST (req: NextRequest) {
  try {
    const body = await req.json();
    return await loginController.login(body);
  } catch (error) {
      return handleError(error);
    }
}