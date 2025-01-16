import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type LoginFormData = {
  whatsapp: string;
  password: string;
};

async function submitLogin(
  data: LoginFormData,
  setLoading: (value: boolean) => void,
  setMessage: (value: string | null) => void,
  router: AppRouterInstance
) {
  setLoading(true);
  setMessage(null);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    const responseData = await response.json(); // Parse the response body once
    console.log(responseData)
  
    if (response.ok) {
      const { user } = responseData;
      router.push(`/dashboard/${user.id}`);
    } else {
      const { message } = responseData;
      setMessage(message || "Erro ao realizar login.");
    }
  } catch (error) {
    setMessage("Erro ao realizar login. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

export default submitLogin;
