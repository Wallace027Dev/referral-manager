import { useState } from "react";

export function useClickRegistration(
  userId: string | null,
  phoneNumber: string
) {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const registerClick = async () => {
    if (!userId) {
      setErrorMessage("ID do usuário não encontrado.");
      setIsValid(false);
      return;
    }

    try {
      const data = {
        user_id: userId,
        contact: phoneNumber
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/clicks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        if (responseData?.message === "Clique atualizado com sucesso.") {
          setErrorMessage("Clique atualizado com sucesso!");
        } else if (responseData?.message === "Clique registrado com sucesso.") {
          setErrorMessage("Seu link foi registrado com sucesso!");
        } else {
          setErrorMessage("Operação realizada com sucesso!");
        }

        // Busca o nome do usuário para personalizar a mensagem
        const userName = await getUserName(userId);

        // Mensagem personalizada com um valor padrão caso a variável de ambiente não esteja definida
        const message = (
          process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_MESSAGE ??
          "Olá, eu vim pela indicação de {{userName}}!"
        ).replace("{{userName}}", userName || "Indicado");
        // Redireciona o usuário para o WhatsApp com o número padrão
        const whatsappNumber = process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER;
        if (whatsappNumber) {
          window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            message
          )}`;
        }

        setIsValid(true);
      } else {
        const errorMessage =
          responseData?.message || "Houve um erro ao registrar o link.";
        setErrorMessage(errorMessage);
        setIsValid(false);
      }
    } catch (error) {
      setErrorMessage("Erro de rede, tente novamente mais tarde.");
      setIsValid(false);
    }
  };

  // Função para buscar o nome do usuário pelo userId
  const getUserName = async (userId: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`
      );
      const data = await response.json();

      if (data && data.name) {
        return data.name;
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
    }

    return null;
  };

  return {
    isValid,
    errorMessage,
    registerClick
  };
}
