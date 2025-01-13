import usersService from "@/_services/usersService";
import { NextRequest, NextResponse } from "next/server";

class UsersController {
  async listAll(req: NextRequest) {
    const users = await usersService.listAll(req);
    return NextResponse.json(users);
  }
}

const usersController = new UsersController();
export default usersController;
