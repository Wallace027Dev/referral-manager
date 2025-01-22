// Componente genérico para campos de formulário
type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
  isValid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = ({
  id,
  label,
  type,
  placeholder,
  isValid,
  error,
  ...props
}: InputFieldProps) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <input id={id} type={type} placeholder={placeholder} {...props} />
    {error && (
      <p style={{ color: isValid ? "var(--primary)" : "red" }}>{error}</p>
    )}
  </div>
);

export default InputField;