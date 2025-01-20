import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type SignupFormData = {
  name: string;
  pix_key: string;
  whatsapp: string;
  password: string;
  confirmPassword: string;
};

async function submitSignup(
  data: SignupFormData,
  setLoading: (value: boolean) => void,
  setMessage: (value: string) => void,
  router: AppRouterInstance
) {
  try {
    setLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      router.replace("/login");
    } else {
      if (response.status === 409) {
        setMessage(
          "Falha no cadastro: O WhatsApp informado já está registrado."
        );
      } else {
        // Tratamento genérico para outros erros
        const errorMessage =
          result?.message ||
          `Erro desconhecido. Código HTTP: ${response.status}`;
        setMessage(`Falha no cadastro: ${errorMessage}`);
      }
    }
  } catch (error) {
    setMessage("Erro ao cadastrar usuário.");
    setLoading(false);
  }
}

export default submitSignup;
