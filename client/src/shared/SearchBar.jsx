import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setSearchTerm } from '../redux/actions';

const SearchBar = () => {
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    // dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div>
      <label htmlFor="searchInput">Search:</label>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
