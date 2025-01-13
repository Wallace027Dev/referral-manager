import IUser from "@/_interfaces/IUser";
import loginService from "@/_services/loginService";
import { NextRequest } from "next/server";

class LoginController {
  async login(body: Partial<IUser>) {
    return loginService.login(body);
  }
}

const loginController = new LoginController();
export default loginController;
