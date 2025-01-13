import * as yup from "yup";

// Definindo o esquema de validação
const validateSignup = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  pix_key: yup.string().required("O Pix é obrigatório"),
  whatsapp: yup
    .string()
    .trim()
    .matches(/^\d{10,11}$/, "O WhatsApp deve ter entre 10 e 11 dígitos")
    .required("O WhatsApp é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória")
});

export default validateSignup;