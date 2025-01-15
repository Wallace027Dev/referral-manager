import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  border: 0.5px solid #ddd;
`;

export const TableHeader = styled.thead`
  background-color: #f4f4f4;

  th {
    padding: 1rem;
    font-size: 1rem;
    color: #333;
    border-bottom: 2px solid #ddd;
  }

  @media (max-width: 768px) {
    th {
      padding: 0.5rem 1rem;
    }
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(odd) {
    background-color: #f9f9f9;
  }

  td {
    padding: 0.8rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
`;
