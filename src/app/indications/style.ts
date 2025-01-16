import styled from "styled-components";

export const Header = styled.header`
  margin-bottom: 20px;
`;

export const Main = styled.main`
  form {
    label,
    input,
    p {
      text-align: left;
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 10px;
  text-align: center;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 10px;
`;

export const Message = styled.p`
  text-align: center;
  color: red;
  font-size: 14px;
`;
