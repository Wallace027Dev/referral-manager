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
}

const clicksService = new ClicksService();
export default clicksService;
