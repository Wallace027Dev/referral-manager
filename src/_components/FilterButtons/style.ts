import styled from "styled-components";

export const FilterButtons = styled.div`
  button {
    padding: 10px 20px;
    border-radius: 0;
    background-color: transparent;
    border: 1px solid white;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    min-width: 120px;
    text-align: center;

    &.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    &:hover {
      border-color: rgb(0, 153, 255);
    }

    &:not(.active) {
      background-color: rgb(0, 153, 255);
    }
  }

  /* Responsividade */
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    /* Primeiros 4 botões em 2 colunas */
    button:nth-child(-n + 4) {
      flex: 1 1 45%;
    }

    /* O último botão ocupa 100% da largura */
    button:last-child {
      flex: 1 1 100%;
    }

    button {
      flex: 1 1 100%;
      width: 100%;
      border: none;
    }
  }
`;
