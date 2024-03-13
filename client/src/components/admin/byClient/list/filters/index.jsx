import React from "react";
import SearchBar from "./SearchBar";
import Block from "./Block";

const ClientFilterPanel = ({
  totalClientsCount,
  itemsPerPage,
  handleChangeItemPerPage,
}) => {
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
      <SearchBar itemsPerPage={itemsPerPage} />
      <Block itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default ClientFilterPanel;
