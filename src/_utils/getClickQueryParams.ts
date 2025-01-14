import { NextRequest } from "next/server";

// Função para extrair e tratar os query params
export default function getClickQueryParams(req: NextRequest) {
  return {
    contact: req.nextUrl.searchParams.get("contact") ?? undefined,
    user_id: Number(req.nextUrl.searchParams.get("user_id")) ?? undefined
  };
}
