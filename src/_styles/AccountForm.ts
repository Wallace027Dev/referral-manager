import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  max-width: 1280px;
  padding: 1rem;

  div {
    display: flex;
    flex-direction: column;
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
    min-width: 280px;
  }

  button {
    text-align: center;
    margin-top: 2rem;
  }
`;

export default Form;
