const errorMessages = {
  USER_NOT_FOUND: {
    message: "Usuário não encontrado.",
    status: 404
  },
  INVALID_PASSWORD: {
    message: "Senha incorreta.",
    status: 401
  },
  USER_ALREADY_REGISTERED: {
    message: "Usuário já cadastrado com esse whatsapp ou pix_key.",
    status: 409
  },
  INTERNAL_SERVER_ERROR: {
    message: "Erro interno no servidor.",
    status: 500
  },
  ROUTE_NOT_FOUND: {
    message: "Rota não encontrada.",
    status: 404
  }
};

export default errorMessages;