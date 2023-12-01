import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { Pagination } from "../admin";
import SearchBar from "./SearchBar";
import DateFilter from "./DateFilter";
import "../../styles/common/dataTable.scss";

function ReactDataTable({
  columns,
  data,
  pagination,
  showDateFilter,
  searchBar,
  header,
  subHeader,
  onSearch,
  search,
  onSearchChange,
  onDateChange,
  clearFilter,
  addButton,
  paginationFields,
}) {
  //Redux state
  const { loader } = useSelector((state) => state.app);

  //Paginations options
  const paginationComponentOptions = {
    ...paginationFields,
  };

  // const { currentData, currentPage, totalPages, nextPage, prevPage, goToPage } =
  //   paginationFields;
  return (
    <DataTable
      // fixedHeader
      // fixedHeaderScrollHeight="500px"
      responsive
      columns={columns}
      data={data}
      pagination={pagination}
      progressPending={loader}
      progressComponent={<Loader />}
      subHeader={subHeader}
      subHeaderComponent={
        <div className="top_bar">
          {header && (
            <h3 className="title pt-2 mb-0 text-capitalize">{header}</h3>
          )}
          {searchBar && (
            <div className="right_search_bar">
              <SearchBar
                onSearch={onSearch}
                search={search}
                onSearchChange={onSearchChange}
              />
              {showDateFilter && (
                <DateFilter
                  onDateChange={onDateChange}
                  dateFilter={onDateChange}
                  clearFilter={clearFilter}
                />
              )}
            </div>
          )}
          {addButton && addButton}
        </div>
      }
      persistTableHead
      paginationResetDefaultPage={true}
      paginationComponent={Pagination}
      paginationComponentOptions={paginationComponentOptions}
      // paginationPerPage={5}
      // paginationRowsPerPageOptions={[10, 25, 50, 100]}
      // paginationDefaultPage={currentPage}
    />
  );
}

export default ReactDataTable;
