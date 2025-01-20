import handleError from "@/_error/handleError";
import IUser from "@/_interfaces/IUser";
import usersService from "@/_services/usersService";
import { NextResponse } from "next/server";

class UsersController {
  async listAll(queryParams: Partial<IUser>) {
    try {
      const users = await usersService.listAll(queryParams);
      return NextResponse.json(users);
    } catch (error: any) {
      if (error.message.includes("Usuário não encontrado")) {
        return handleError("USER_NOT_FOUND");
      }

      if (error.message.includes("Senha incorreta")) {
        return handleError("INVALID_PASSWORD");
      }

      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
  }

  async listById(userId: number) {
    try {
      const users = await usersService.listById(userId);
      return NextResponse.json(users);
    } catch (error: any) {
      if (error.message.includes("Usuário não encontrado")) {
        return handleError("USER_NOT_FOUND");
      }

      if (error.message.includes("Senha incorreta")) {
        return handleError("INVALID_PASSWORD");
      }

      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
  }

  async create(userData: Partial<IUser>) {
    try {
      const users = await usersService.create(userData);
      return NextResponse.json(users);
    } catch (error: any) {
      if (error.message.includes("Usuário não encontrado")) {
        return handleError("USER_NOT_FOUND");
      }

      if (error.message.includes("Senha incorreta")) {
        return handleError("INVALID_PASSWORD");
      }

      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
  }
}

const usersController = new UsersController();
export default usersController;
