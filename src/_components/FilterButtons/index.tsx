import { useState } from "react";
import { FilterSelect } from "./style";

interface FilterProps {
  activeFilter: string;
  onFilterClick: (monthsAgo: number) => void;
  onShowTotalClicks: () => void;
}

const FilterButtonsComponent: React.FC<FilterProps> = ({
  activeFilter,
  onFilterClick,
  onShowTotalClicks
}) => {
  return (
    <FilterSelect>
      <select
        onChange={(e) =>
          e.target.value === "total"
            ? onShowTotalClicks()
            : onFilterClick(parseInt(e.target.value))
        }
        value={activeFilter}
      >
        <option value="3m">3 meses atrás</option>
        <option value="2m">2 meses atrás</option>
        <option value="1m">1 mês atrás</option>
        <option value="0m">Este mês</option>
        <option value="total">Total Histórico</option>
      </select>
    </FilterSelect>
  );
};

export default FilterButtonsComponent;
