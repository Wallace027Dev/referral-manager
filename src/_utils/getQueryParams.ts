import { NextRequest } from "next/server";

// Função para extrair e tratar os query params
export default function getQueryParams(req: NextRequest) {
  return {
    whatsapp: req.nextUrl.searchParams.get("whatsapp") ?? undefined,
    pixKey: req.nextUrl.searchParams.get("pixKey") ?? undefined,
    name: req.nextUrl.searchParams.get("name") ?? undefined
  };
}
