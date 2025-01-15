import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed do banco de dados...");

  // Criando 10 usuários com dados fictícios
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Usuário ${i + 1}`,
        whatsapp: `55${Math.floor(1000000000 + Math.random() * 9000000000)}`, // Gerando número no formato brasileiro
        pix_key: `pixkey_${i + 1}`,
        password: `senha${i + 1}`,
        link_id: `link_${Math.random().toString(36).substring(2, 10)}`, // Link único
      },
    });

    console.log(`Usuário criado: ${user.name}`);

    // Criando de 1 a 5 cliques para cada usuário
    const numClicks = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numClicks; j++) {
      await prisma.click.create({
        data: {
          user_id: user.id,
          contact: `contato${j + 1}@teste.com`,
          clicked_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)), // Data aleatória no passado
        },
      });
    }

    console.log(`Criados ${numClicks} cliques para o usuário ${user.name}`);
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
