import FormOptionButton from "./style";

const FormOptionButtons: React.FC<{ currentForm: string; handleCurrentForm: () => void }> = ({ currentForm, handleCurrentForm }) => (
  <FormOptionButton>
    {["clicks", "users"].map((form) => (
      <button
        key={form}
        onClick={() => handleCurrentForm()}
        className={currentForm === form ? "active" : ""}
      >
        {form === "clicks" ? "Indicações" : "Usuários"}
      </button>
    ))}
  </FormOptionButton>
);

export default FormOptionButtons;