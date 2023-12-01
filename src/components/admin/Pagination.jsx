import React from "react";
import "../../styles/admin/pagination.scss";

function Pagination(props) {
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    onSelectPage,
  } = props.paginationComponentOptions;

  return (
    <div className="pagination_section">
      <div className="pagination_link">
        <button className="pre_btn" onClick={prevPage}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`pagination_btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => {
              onSelectPage(index + 1);
            }}
          >
            {index + 1}
          </button>
        ))}

        <button className="next_btn" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
