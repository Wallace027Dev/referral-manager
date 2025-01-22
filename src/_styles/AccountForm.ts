import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  max-width: 1280px;
  padding: 1rem;
  margin: 3rem auto;

  div {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  h1 {
    color: var(--primary);
    font-weight: 900;
  }

  p {
    color: #ff2401;
  }

  label {
    margin-top: 0.5rem;
  }

  input,
  button {
    width: 100%;
  }

  input {
    text-align: start;
  }

  button {
    text-align: center;
    margin-top: 2rem;
  }
`;

export default Form;
