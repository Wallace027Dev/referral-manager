import IUser from "@/_interfaces/IUser";
import loginService from "@/_services/accountService";

class AccountController {
  async login(body: Partial<IUser>) {
    return loginService.login(body);
  }

  async signup(body: Partial<IUser>) {
    return loginService.signup(body);
  }
}

const accountController = new AccountController();
export default accountController;
