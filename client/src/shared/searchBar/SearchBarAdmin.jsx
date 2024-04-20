import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBarAdmin = ({
  handleSearchChange,
  searchBarValue,
  placeholder,
}) => {
  return (
    <div>
      <div className="searchBarAdmin-wrapper">
        <input
          type="search"
          id="searchInput"
          placeholder={placeholder}
          onChange={handleSearchChange}
          className="searchBarAdmin-filter"
          value={searchBarValue}
        />
        <span className="searchBarAdmin-icon">
          {" "}
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default SearchBarAdmin;
