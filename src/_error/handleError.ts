import { NextResponse } from "next/server";

export default function handleError(error: any) {
  const errorMessage = error?.message || "Erro desconhecido";
  
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}