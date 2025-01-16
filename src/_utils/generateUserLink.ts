import { v4 as uuidv4 } from "uuid";

// Função para criar o link personalizado
async function generateUserLink(userName?: string): Promise<string> {
  // Gera o identificador único (usando o nome ou um UUID)
  const uniqueId = userName
    ? userName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : uuidv4();

  // Combina o ID do usuário com o identificador único
  const userLink = `${process.env.BASE_URL}/ref/${uniqueId}`;

  return userLink;
}

export default generateUserLink;