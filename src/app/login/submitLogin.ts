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
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (response.ok) {
      const defaultWhatsappNumber =
        process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP_NUMBER;

      if (!defaultWhatsappNumber) {
        setMessage("Número de WhatsApp não configurado corretamente.");
        setLoading(false);
        return;
      }

      if (responseData.user.whatsapp === defaultWhatsappNumber) {
        console.log("igual")
        router.push("/dashboard/admin");
      } else {
        router.push(`/dashboard/${responseData.user.id}`);
      }
    } else {
      const { message } = await response.json();
      setMessage(message || "Erro ao realizar login.");
    }
  } catch {
    setMessage("Erro ao realizar login. Tente novamente.");
  } finally {
    setLoading(false);
  }
}

export default submitLogin;
