import IClick from "@/_interfaces/IClick";
import clicksService from "@/_services/clicksService";
import { NextResponse } from "next/server";

class ClicksController {
  async listAllByUserId(userId: number, queryParams: Partial<IClick>) {
    const clicks = await clicksService.listAllByUserId(userId, queryParams);
    return NextResponse.json(clicks);
  }
}

const clicksController = new ClicksController();
export default clicksController;
