import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type SignupFormData = {
  name: string;
  pixKey: string;
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
    const response = await fetch("/api/signup", {
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
      setMessage(result.message || "Erro ao cadastrar usuário.");
    }
  } catch (error) {
    setMessage("Erro ao cadastrar usuário.");
    setLoading(false);
  }
}

export default submitSignup;
