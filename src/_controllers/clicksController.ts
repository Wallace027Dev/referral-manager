import IClick from "@/_interfaces/IClick";
import clicksService from "@/_services/clicksService";
import { NextResponse } from "next/server";

class ClicksController {
  async listAllByUserId(userId: number, queryParams: Partial<IClick>) {
    const clicks = await clicksService.listAllByUserId(userId, queryParams);
    return NextResponse.json(clicks);
  }

  async registerClick(userId: number, whatsappNumber: string) {
    const clicks = await clicksService.registerClick(userId, whatsappNumber);
    return NextResponse.json(clicks);
  }
}

const clicksController = new ClicksController();
export default clicksController;
