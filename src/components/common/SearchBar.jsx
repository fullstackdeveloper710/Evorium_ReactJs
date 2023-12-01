import React from "react";

const SearchBar = ({ onSearch, onSearchChange, search }) => {
  return (
    <div className="search_block">
      <input
        type="text"
        placeholder="Search"
        onChange={onSearchChange}
        value={search}
      />
      <button type="" className="search_btn" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
