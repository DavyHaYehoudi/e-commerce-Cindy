import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
// import { setSearchTerm } from '../redux/actions';

const SearchBar = () => {
  //   const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    // dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div>
      <div className="searchBar-client-filter-wrapper">
        <input
          type="search"
          id="searchInput"
          // value={searchTerm}
          placeholder="Entrer un nom d'au moins 3 lettres"
          onChange={handleSearchChange}
          className="searchBar-client-filter"
        />
        <span className="searchBar-client-filter-icon">  <FaSearch /></span>
     
      </div>
    </div>
  );
};

export default SearchBar;
