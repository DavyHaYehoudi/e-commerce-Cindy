import React, { useState } from "react";
import Block from "./Block";
import { useDispatch } from "react-redux";
import { fetchClients } from "../../../../../features/admin/clientsSlice";
import SearchBarAdmin from "../../../../../shared/searchBar/SearchBarAdmin";

const ClientFilterPanel = ({
  totalClientsCount,
  itemsPerPage,
  handleChangeItemPerPage,
}) => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearchBarValue(name);
    if (name.length > 2) {
      dispatch(fetchClients({ itemsPerPage: "", name }));
    } else {
      dispatch(fetchClients({ itemsPerPage }));
    }
  };
  return (
    <div className="clientsFilterPanel">
      <div>
        <label htmlFor="itemsPerPage">
          {" "}
          {totalClientsCount} client{totalClientsCount > 1 ? "s" : ""} au total{" "}
        </label>
        <select
          className="itemsPerPage-select"
          id="itemsPerPage"
          name="itemsPerPage"
          value={itemsPerPage === -1 ? "TOUS" : itemsPerPage}
          onChange={handleChangeItemPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value="TOUS">TOUS</option>
        </select>
      </div>
      <SearchBarAdmin
        searchBarValue={searchBarValue}
        handleSearchChange={handleSearchChange}
        placeholder="Nom ou prénom (au moins 3 lettres)"
      />
      <Block
        itemsPerPage={itemsPerPage}
        setSearchBarValue={setSearchBarValue}
      />
    </div>
  );
};

export default ClientFilterPanel;
