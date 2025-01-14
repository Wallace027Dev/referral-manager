import { NextRequest } from "next/server";

export default function getAndValidateID(req: NextRequest) {
  const rota = req.nextUrl.pathname.split("/");
  const id = Number(rota[rota.length - 1]);

  if (!id) {
    throw new Error("ID não identificado");
  }

  return id;
}
