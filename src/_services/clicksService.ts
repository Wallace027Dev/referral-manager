import IClick from "@/_interfaces/IClick";
import prisma from "../../prisma/prisma";

class ClicksService {
  async listAllByUserId(userId: number, queryParams: Partial<IClick>) {
    try {
      const clicks = await prisma.click.findMany({
        where: {
          user_id: userId,
          contact: queryParams.contact ?? undefined,
          clicked_at: queryParams.clicked_at ?? undefined,
          deleted_at: null
        }
      });

      if (!clicks || clicks.length === 0) {
        throw new Error("Não existem cliques.");
      }

      return clicks;
    } catch (error: any) {
      throw new Error(error?.message || "Erro interno ao buscar cliques.");
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
        return {
          message: "O número já está registrado para este usuário.",
          data: existingClick
        };
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
      throw new Error(
        error?.message || "Erro interno ao criar um novo clique."
      );
    }
  }
}

const clicksService = new ClicksService();
export default clicksService;
