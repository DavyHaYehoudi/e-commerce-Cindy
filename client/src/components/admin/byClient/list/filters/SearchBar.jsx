import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ handleSearchChange, searchBarValue }) => {
  return (
    <div>
      <div className="searchBar-client-filter-wrapper">
        <input
          type="search"
          id="searchInput"
          placeholder="Nom/prénom (au moins 3 lettres)"
          onChange={handleSearchChange}
          className="searchBar-client-filter"
          value={searchBarValue}
        />
        <span className="searchBar-client-filter-icon">
          {" "}
          <FaSearch />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
