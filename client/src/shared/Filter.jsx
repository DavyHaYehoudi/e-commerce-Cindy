import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/actions';

const Filter = () => {
  const filterValue = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div>
      <label htmlFor="filterSelect">Filter:</label>
      <select id="filterSelect" value={filterValue} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default Filter;
