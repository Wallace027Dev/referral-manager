import { NextResponse } from "next/server";
import handleError from "@/_error/handleError";
import IUser from "@/_interfaces/IUser";
import accountService from "@/_services/accountService";

class AccountController {
  async login(body: Partial<IUser>) {
    try {
      const data = await accountService.login(body);
      return NextResponse.json(data, { status: 200 });
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

  async signup(body: Partial<IUser>) {
    try {
      const data = await accountService.signup(body);
      return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
      if (error.message.includes("Usuário já cadastrado")) {
        return handleError("USER_ALREADY_REGISTERED");
      }

      return handleError("INTERNAL_SERVER_ERROR", error.message);
    }
  }
}

const accountController = new AccountController();
export default accountController;
