import styled from "styled-components";

const FormOptionButton = styled.div`
  button {
    background: none;
    padding: 0;
  }

  button {
    color: #007bff;
    font-weight: 700;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 0;
      height: 2px;
      background: #007bff;
      transition: width 0.3s ease, transform 0.3s ease;
      transform: translateX(-50%);
    }

    &:hover::after,
    &.active::after {
      width: 100%;
    }
  }

  button + button {
    margin-left: 1rem;
  }
`;

export default FormOptionButton;