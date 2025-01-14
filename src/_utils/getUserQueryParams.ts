import { NextRequest } from "next/server";

// Função para extrair e tratar os query params
export default function getUserQueryParams(req: NextRequest) {
  return {
    whatsapp: req.nextUrl.searchParams.get("whatsapp") ?? undefined,
    pix_key: req.nextUrl.searchParams.get("pix_key") ?? undefined,
    name: req.nextUrl.searchParams.get("name") ?? undefined
  };
}
