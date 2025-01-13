import usersController from "@/_controllers/usersController";
import handleError from "@/_error/handleError";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const queryParams = getQueryParams(req);

    return await usersController.listAll(queryParams);
  } catch (error) {
    return handleError(error);
  }
}

// Função para extrair e tratar os query params
function getQueryParams(req: NextRequest) {
  return {
    whatsapp: req.nextUrl.searchParams.get("whatsapp") ?? undefined,
    pixKey: req.nextUrl.searchParams.get("pixKey") ?? undefined,
    name: req.nextUrl.searchParams.get("name") ?? undefined
  };
}
