import styled from "styled-components";

export const DashboardContainer = styled.div`
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
`;

export const Heading = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #007bff;
`;

export const FilterButtons = styled.div`
  button {
    padding: 10px 20px;
    border-radius: 0;
    background-color: transparent;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

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

  button + button {
    border-left: white solid 0.5px;
    border-right: white solid 0.5px;
  }
`;

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

export const NoDataMessage = styled.p`
  font-size: 1rem;
  color: #888;
`;

export const TotalClicks = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
