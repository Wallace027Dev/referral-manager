import prisma from "../../prisma/prisma";

class UsersService {
  async listAll(queryParams: {
    whatsapp?: string;
    pixKey?: string;
    name?: string;
  }) {
    try {
      // Filtra os usuários de acordo com os parâmetros da query
      const users = await prisma.user.findMany({
        where: {
          whatsapp: queryParams.whatsapp ? queryParams.whatsapp : undefined,
          pixKey: queryParams.pixKey ? queryParams.pixKey : undefined,
          name: queryParams.name ? { contains: queryParams.name } : undefined
        }
      });

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

const usersService = new UsersService();
export default usersService;
