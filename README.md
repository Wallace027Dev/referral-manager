
# Gestor de Indicações

Este é um projeto desenvolvido com [Next.js](https://nextjs.org) para gerenciar indicações de usuários e cliques em links personalizados. O sistema permite o cadastro de usuários, login, geração de links de indicação, e visualização de dados de cliques e usuários.

## 👀 Preview

<div align="center">
  <img src="./public/preview-1.png" alt="Tela inicial" width="32%"/>
  <img src="./public/preview-2.png" alt="Dashboard de indicações" width="32%"/>
  <img src="./public/preview-3.png" alt="Detalhes do usuário" width="32%"/>
</div>

## Funcionalidades

- **Cadastro de Usuários**: Permite que novos usuários se cadastrem com informações como nome, WhatsApp, chave Pix e senha.
- **Login**: Autenticação de usuários com WhatsApp e senha.
- **Geração de Links de Indicação**: Cada usuário pode gerar um link único para compartilhar.
- **Registro de Cliques**: Registra cliques nos links de indicação.
- **Dashboard**: Visualização de dados de cliques e usuários, com filtros por período.
- **Administração**: Acesso administrativo para visualizar todos os usuários e cliques.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor e geração de páginas estáticas.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Styled-Components**: Biblioteca para estilização de componentes.
- **Prisma**: ORM para interação com o banco de dados MySQL.
- **Yup e Joi**: Validação de dados no frontend e backend.
- **JWT**: Autenticação baseada em tokens.
- **Bcrypt**: Criptografia de senhas.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
├── prisma/                  # Configuração do Prisma e seed do banco de dados
├── public/                  # Arquivos públicos (imagens, ícones, etc.)
├── src/
│   ├── _components/         # Componentes reutilizáveis
│   ├── _controllers/        # Controladores para lógica de negócio
│   ├── _error/              # Tratamento de erros
│   ├── _interfaces/         # Interfaces TypeScript
│   ├── _services/           # Serviços para interação com o banco de dados
│   ├── _styles/             # Estilos globais e componentes estilizados
│   ├── _types/              # Tipos TypeScript
│   ├── _utils/              # Funções utilitárias
│   ├── _validators/         # Validação de dados
│   ├── app/                 # Páginas e rotas do Next.js
│   │   ├── api/             # Rotas de API
│   │   ├── dashboard/       # Dashboard de usuários e cliques
│   │   ├── indications/     # Página de registro de cliques
│   │   ├── login/           # Página de login
│   │   ├── signup/          # Página de cadastro
│   │   └── style.ts         # Estilos específicos das páginas
├── .gitignore               # Arquivos ignorados pelo Git
├── package.json             # Dependências e scripts do projeto
├── tsconfig.json            # Configuração do TypeScript
└── README.md                # Documentação do projeto
```

## Pré-requisitos

- Node.js (versão 18 ou superior)
- MySQL (configurado no arquivo `.env` com a variável `DATABASE_URL`)

## Configuração do Arquivo `.env`

Antes de iniciar o projeto, configure as variáveis de ambiente no arquivo `.env`:

```properties
DATABASE_URL= # URL de conexão com o banco de dados MySQL
BASE_URL= # URL base do servidor
JWT_SECRET= # Chave secreta para geração de tokens JWT
NEXT_PUBLIC_BASE_URL= # URL pública da aplicação
NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER= # Número padrão do WhatsApp
NEXT_PUBLIC_DEFAULT_WHATSAPP_MESSAGE= # Mensagem padrão do WhatsApp

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/gestor-indicacoes.git
   cd gestor-indicacoes
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados no arquivo `.env`:

   ```env
   DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
   ```

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Popule o banco de dados com dados fictícios (opcional):

   ```bash
   npm run seed
   ```

## Como Executar o Projeto

### Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Produção

Para construir e iniciar o projeto em produção:

```bash
npm run build
npm start
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm start`: Inicia o servidor em produção.
- `npm run lint`: Executa o linter.
- `npm run seed`: Popula o banco de dados com dados fictícios.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
