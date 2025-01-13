"use client";
import Form from "../signup/style";

export default function Login() {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Formulário enviado!");
      }}
    >
      <div className="mb-3">
        <label className="form-label" htmlFor="input-whatsapp">
          Whatsapp:
        </label>
        <input
          type="tel"
          className="form-control"
          name="whatsapp"
          id="input-whatsapp"
          pattern="\d{10,11}" // Valida números de 10 ou 11 dígitos
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="input-password">
          Senha:
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="input-password"
          required
        />
      </div>

      <button className="btn btn-primary w-100" type="submit">
        Cadastrar
      </button>
    </Form>
  );
}
