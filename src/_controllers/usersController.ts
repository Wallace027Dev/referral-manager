import usersService from "@/_services/usersService";
import { NextResponse } from "next/server";

class UsersController {
  async listAll(queryParams: { whatsapp?: string, pixKey?: string, name?: string  }) {
    const users = await usersService.listAll(queryParams);
    return NextResponse.json(users);
  }
}

const usersController = new UsersController();
export default usersController;
