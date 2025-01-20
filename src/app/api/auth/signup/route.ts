import accountController from "@/_controllers/accountController";
import handleError from "@/_error/handleError";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    return await accountController.signup(body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
