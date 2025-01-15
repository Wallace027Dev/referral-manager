import IUser from "@/_interfaces/IUser";
import usersService from "@/_services/usersService";
import { NextResponse } from "next/server";

class UsersController {
  async listAll(queryParams: Partial<IUser>) {
    const users = await usersService.listAll(queryParams);
    return NextResponse.json(users);
  }

  async listById(userId: number) {
    const users = await usersService.listById(userId);
    return NextResponse.json(users);
  }

  async create(userData: Partial<IUser>) {
    const users = await usersService.create(userData);
    return NextResponse.json(users);
  }
}

const usersController = new UsersController();
export default usersController;
