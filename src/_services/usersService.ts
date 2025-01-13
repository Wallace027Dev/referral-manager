import { NextRequest } from "next/server";
import prisma from "../../prisma/prisma";

class UsersService {
  async listAll(req: NextRequest) {
    try {
      const users = await prisma.user.findMany();

      // Se não houver usuários, lança um erro
      if (!users || users.length === 0) {
        throw new Error("Não existem usuários");
      }

      return users;
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao buscar usuários.");
    }
  }
}

const usersService = new UsersService()
export default usersService;