export function validateWhatsappNumber(whatsappNumber: string): string {
  if (!whatsappNumber) {
    throw new Error("Número de WhatsApp não fornecido.");
  }
  return whatsappNumber;
}
