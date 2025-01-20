import * as yup from "yup";

// Esquema de validação (Yup)
const validateLogin = yup.object({
  whatsapp: yup
    .string()
    .trim()
    .matches(/^\d{10,11}$/, "O WhatsApp deve ter entre 10 e 11 dígitos")
    .required("O WhatsApp é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("A senha é obrigatória")
});

export default validateLogin;
