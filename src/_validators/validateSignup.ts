import * as yup from "yup";

// Definindo o esquema de validação
const validateSignup = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .matches(/^[A-Za-zÀ-ÿ\s]+$/u, "O nome deve conter apenas letras")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  pix_key: yup.string().required("O Pix é obrigatório"),
  whatsapp: yup
    .string()
    .trim()
    .matches(/^\d{10,11}$/, "O WhatsApp deve ter entre 10 e 11 dígitos")
    .required("O WhatsApp é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória")
});

export default validateSignup;
