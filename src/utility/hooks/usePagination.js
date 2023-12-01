import { useState } from "react";

const usePagination = ({ totalItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  //Total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  //Methods
  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    goToPage(currentPage - 1);
  };

  const onSelectPage = (selected) => {
    goToPage(selected);
  };

  const setItemsPerPage = (newItemsPerPage) => {
    const newTotalPages = Math.ceil(totalItems / newItemsPerPage);
    const newCurrentPage = Math.min(currentPage, newTotalPages);
    setCurrentPage(newCurrentPage);
  };

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    onSelectPage,
  };
};

export default usePagination;
