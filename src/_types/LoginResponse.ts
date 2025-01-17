type LoginResponse = {
  user: {
    id: string;
    name: string;
    whatsapp: string;
  };
  message?: string;
};

export default LoginResponse;