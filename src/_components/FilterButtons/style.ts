import styled from "styled-components";

export const FilterSelect = styled.div`
  margin-bottom: 8px;
  max-width: 800px;
  margin: 0 auto;

  select {
    padding: 10px;
    border-radius: 4px;
    background-color: white;
    border: 1px solid var(--primary);
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    min-width: 320px;
    width: 100%;
    cursor: pointer;

    &:focus {
      border-color: var(--primary);
      outline: none;
    }
  }

  /* Responsividade */
  @media (max-width: 768px) {
    select {
      width: 100%;
    }
  }
`;
