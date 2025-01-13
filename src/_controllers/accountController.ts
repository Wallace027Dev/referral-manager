import IUser from "@/_interfaces/IUser";
import loginService from "@/_services/loginService";

class AccountController {
  async login(body: Partial<IUser>) {
    return loginService.login(body);
  }
}

const accountController = new AccountController();
export default accountController;
