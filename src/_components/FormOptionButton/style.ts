import styled from "styled-components";

const FormOptionButton = styled.div`
  margin: 2rem auto;
  display: flex;
  justify-content: center;

  button {
    background: none;
    padding: 0;
  }

  button {
    color: var(--primary);
    font-weight: 700;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 0;
      height: 2px;
      background: var(--primary);
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
