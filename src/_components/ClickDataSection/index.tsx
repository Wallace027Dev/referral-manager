import IClick from "@/_interfaces/IClick";
import FilterButtonsComponent from "../FilterButtons";
import TableComponent from "../TableComponent";

interface IClickDataSectionProps {
  activeFilter: string;
  filterClicksByDate: (monthsAgo: number) => void;
  showTotalClicks: () => void;
  filteredClicks: IClick[];
}

const ClickDataSection: React.FC<IClickDataSectionProps> = ({
  activeFilter,
  filterClicksByDate,
  showTotalClicks,
  filteredClicks
}) => {
  return (
    <>
      <FilterButtonsComponent
        activeFilter={activeFilter}
        onFilterClick={filterClicksByDate}
        onShowTotalClicks={showTotalClicks}
      />
      <TableComponent
        isAdmin={true}
        data={filteredClicks}
        currentForm="clicks"
      />
    </>
  );
};

export default ClickDataSection;
