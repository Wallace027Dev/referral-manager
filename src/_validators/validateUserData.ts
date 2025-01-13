import IUser from "@/_interfaces/IUser";
import Joi from "joi";

export default function validateUserData(userData: Partial<IUser>) {
  // Esquema de validação do Joi
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "O campo nome deve ser uma string.",
      "string.empty": "O campo nome não pode estar vazio.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "string.max": "O nome pode ter no máximo 100 caracteres.",
      "any.required": "O campo nome é obrigatório."
    }),
    pixKey: Joi.string().min(10).max(50).required().messages({
      "string.base": "O campo pixKey deve ser uma string.",
      "string.empty": "O campo pixKey não pode estar vazio.",
      "string.min": "A chave Pix deve ter pelo menos 10 caracteres.",
      "string.max": "A chave Pix pode ter no máximo 50 caracteres.",
      "any.required": "O campo pixKey é obrigatório."
    }),
    whatsapp: Joi.string().min(10).max(20).required().messages({
      "string.base": "O campo whatsapp deve ser uma string.",
      "string.empty": "O campo whatsapp não pode estar vazio.",
      "string.min": "O número de WhatsApp deve ter pelo menos 10 caracteres.",
      "string.max": "O número de WhatsApp pode ter no máximo 20 caracteres.",
      "any.required": "O campo whatsapp é obrigatório."
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.base": "O campo senha deve ser uma string.",
      "string.empty": "O campo senha não pode estar vazio.",
      "string.min": "A senha deve ter pelo menos 6 caracteres.",
      "string.max": "A senha pode ter no máximo 20 caracteres.",
      "any.required": "O campo senha é obrigatório."
    })
  });

  // Validando os dados do usuário com o esquema
  const { error } = schema.validate(userData, { abortEarly: false });

  if (error) {
    // Caso haja erros, lança uma exceção com as mensagens de erro
    throw new Error(error.details.map((err) => err.message).join(", "));
  }
}
