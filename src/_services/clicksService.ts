import IClick from "@/_interfaces/IClick";
import prisma from "../../prisma/prisma";
import errorMessages from "@/_error/errorMessages";

class ClicksService {
  async listAllByUserId(userId: number, queryParams: Partial<IClick>) {
    try {
      // Verifica se o usuário existe
      const userExists = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!userExists) {
        throw new Error("USER_NOT_FOUND");
      }

      // Busca os cliques do usuário
      const clicks = await prisma.click.findMany({
        where: {
          user_id: userId,
          contact: queryParams.contact ?? undefined,
          clicked_at: queryParams.clicked_at ?? undefined,
          deleted_at: null
        }
      });

      // Verifica se há cliques registrados
      if (!clicks || clicks.length === 0) {
        throw new Error("NO_CLICKS_REGISTERED");
      }

      return clicks;
    } catch (error: unknown) {
      if (error instanceof Error && error.message in errorMessages) {
        throw new Error(error.message);
      }
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }

  async registerClick(userId: number, whatsappNumber: string) {
    try {
      // Verifica se o clique já existe
      const existingClick = await prisma.click.findFirst({
        where: {
          user_id: userId,
          contact: whatsappNumber
        }
      });

      if (existingClick) {
        throw new Error("USER_ALREADY_REGISTERED");
      }

      // Cria um novo clique caso não exista
      const newClick = await prisma.click.create({
        data: {
          user_id: userId,
          contact: whatsappNumber
        }
      });

      return {
        message: "Clique registrado com sucesso.",
        data: newClick
      };
    } catch (error: any) {
      if (error instanceof Error && error.message in errorMessages) {
        throw new Error(error.message);
      }
      throw new Error("INTERNAL_SERVER_ERROR");
    }
  }
}

const clicksService = new ClicksService();
export default clicksService;
