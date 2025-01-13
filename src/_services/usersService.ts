import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";
import IUser from "@/_interfaces/IUser";
import validateUserData from "@/_validators/validateUserData";

class UsersService {
  // Função para listar todos os usuários com base nos parâmetros de query
  async listAll(queryParams: Partial<IUser>) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          pix_key: true,
          whatsapp: true,
          clicks: true,
          created_at: true,
          updated_at: true,
          deleted_at: true
        },
        where: {
          whatsapp: queryParams.whatsapp ?? undefined,
          pix_key: queryParams.pix_key ?? undefined,
          name: queryParams.name ? { contains: queryParams.name } : undefined,
          deleted_at: null // Filtra os usuários que não foram deletados
        }
      });

      // Lança erro se não encontrar usuários
      if (!users || users.length === 0) {
        throw new Error("Não existem usuários.");
      }

      return users;
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao buscar usuários.");
    }
  }

  // Função para criar um novo usuário
  async create(userData: Partial<IUser>) {
    // Validação básica dos dados
    if (
      !userData.name ||
      !userData.pix_key ||
      !userData.whatsapp ||
      !userData.password
    ) {
      throw new Error("Todos os campos são obrigatórios.");
    }
    try {
      // Validação dos dados do usuário
      validateUserData(userData);

      // Criptografando a senha antes de salvar
      const hashedPassword = await bcrypt.hash(userData.password!, 10);

      // Criando o novo usuário
      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          pix_key: userData.pix_key,
          whatsapp: userData.whatsapp,
          password: hashedPassword
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
