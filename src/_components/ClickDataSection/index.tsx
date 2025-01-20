import IClick from "@/_interfaces/IClick";
import FilterButtonsComponent from "../FilterButtons";
import TableComponent from "../TableComponent";

const ClickDataSection: React.FC<{
  activeFilter: string;
  filterClicksByDate: (monthsAgo: number) => void;
  showTotalClicks: () => void;
  filteredClicks: IClick[];
  clicks: IClick[];
}> = ({
  activeFilter,
  filterClicksByDate,
  showTotalClicks,
  filteredClicks,
  clicks
}) => {
  console.log(clicks, filteredClicks)
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
