import React from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { fetchClients } from "../../../../../features/admin/clientsSlice";

const SearchBar = ({ itemsPerPage }) => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const name = e.target.value.trim();
    if (name.length > 2) {
      dispatch(fetchClients({ itemsPerPage, name }));
    } else {
      dispatch(fetchClients({ itemsPerPage }));
    }
  };

  return (
    <div>
      <div className="searchBar-client-filter-wrapper">
        <input
          type="search"
          id="searchInput"
          placeholder="Nom/prénom (au moins 3 lettres)"
          onChange={handleSearchChange}
          className="searchBar-client-filter"
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
