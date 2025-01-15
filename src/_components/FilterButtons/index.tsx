import { FilterButtons } from "./style";

interface FilterProps {
  activeFilter: string;
  onFilterClick: (monthsAgo: number) => void;
  onShowTotalClicks: () => void;
}

const FilterButtonsComponent: React.FC<FilterProps> = ({ activeFilter, onFilterClick, onShowTotalClicks }) => (
  <FilterButtons>
    {["3m", "2m", "1m", "0m", "total"].map((filter) => (
      <button
        key={filter}
        onClick={filter === "total" ? onShowTotalClicks : () => onFilterClick(parseInt(filter))}
        className={activeFilter === filter ? "active" : ""}
      >
        {filter === "total" ? "Total Histórico" : `${filter.replace('m', '')} meses atrás`}
      </button>
    ))}
  </FilterButtons>
);

export default FilterButtonsComponent;