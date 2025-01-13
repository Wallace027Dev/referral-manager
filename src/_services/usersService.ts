import ISignupData from "@/_interfaces/signupData";
import prisma from "../../prisma/prisma";
import bcrypt from 'bcrypt';

class UsersService {
  async listAll(queryParams: {
    whatsapp?: string;
    pixKey?: string;
    name?: string;
  }) {
    try {
      // Filtra os usuários de acordo com os parâmetros da query
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          pixKey: true,
          whatsapp: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
        },
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

  async create(userData: ISignupData) {
    // Validação básica dos dados
    if (
      !userData.name ||
      !userData.pixKey ||
      !userData.whatsapp ||
      !userData.password
    ) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    try {
      // Hashing da senha antes de salvar
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          pixKey: userData.pixKey,
          whatsapp: userData.whatsapp,
          password: hashedPassword,
        }
      });

      return newUser;
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao criar usuário.");
    }
  }
}

const usersService = new UsersService();
export default usersService;
