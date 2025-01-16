import { NextRequest } from "next/server";
import clicksController from "@/_controllers/clicksController";
import handleError from "@/_error/handleError";
import { validateWhatsappNumber } from "@/_validators/validateWhatsappNumber";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = Number(body.user_id)
    const whatsappNumber = validateWhatsappNumber(body.contact);

    return await clicksController.registerClick(id, whatsappNumber);
  } catch (error) {
    return handleError(error);
  }
}
