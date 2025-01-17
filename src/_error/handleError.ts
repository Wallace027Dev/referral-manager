import { NextResponse } from "next/server";
import errorMessages from "./errorMessages";

export default function handleError(
  errorKey: keyof typeof errorMessages,
  customMessage?: string
) {
  const error = errorMessages[errorKey] || errorMessages.INTERNAL_SERVER_ERROR;
  const message = customMessage || error.message;

  return NextResponse.json({ error: message }, { status: error.status });
}
