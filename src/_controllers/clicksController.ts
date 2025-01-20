import errorMessages from "@/_error/errorMessages";
import handleError from "@/_error/handleError";
import IClick from "@/_interfaces/IClick";
import clicksService from "@/_services/clicksService";
import { NextResponse } from "next/server";

class ClicksController {
  async listAll(queryParams: Partial<IClick>) {
    try {
      const clicks = await clicksService.listAll(queryParams);
      return NextResponse.json(clicks);
    } catch (error: any) {
      if (error instanceof Error && error.message in errorMessages) {
        return handleError(error.message as keyof typeof errorMessages);
      }
      return handleError("INTERNAL_SERVER_ERROR");
    }
  }

  async listAllByUserId(userId: number, queryParams: Partial<IClick>) {
    try {
      const clicks = await clicksService.listAllByUserId(userId, queryParams);
      return NextResponse.json(clicks);
    } catch (error: any) {
      if (error instanceof Error && error.message in errorMessages) {
        return handleError(error.message as keyof typeof errorMessages);
      }
      return handleError("INTERNAL_SERVER_ERROR");
    }
  }

  async registerClick(userId: number, whatsappNumber: string) {
    try {
      const clicks = await clicksService.registerClick(userId, whatsappNumber);
      return NextResponse.json({ message: "Sucesso", data: clicks });
    } catch (error: any) {
      if (error instanceof Error && error.message in errorMessages) {
        return handleError(error.message as keyof typeof errorMessages);
      }
      return handleError("INTERNAL_SERVER_ERROR");
    }
  }
}

const clicksController = new ClicksController();
export default clicksController;
