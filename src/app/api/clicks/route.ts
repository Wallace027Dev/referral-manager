import { NextRequest } from "next/server";
import clicksController from "@/_controllers/clicksController";
import handleError from "@/_error/handleError";
import { validateWhatsappNumber } from "@/_validators/validateWhatsappNumber";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams);

    return await clicksController.listAll(queryParams);
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
    const id = Number(body.user_id);
    const whatsappNumber = validateWhatsappNumber(body.contact);

    return await clicksController.registerClick(id, whatsappNumber);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
