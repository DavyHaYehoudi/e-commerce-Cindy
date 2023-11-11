import React, { useState } from "react";
import Pagination from "../../../../shared/Pagination";
import Item from "./Item";

const List = ({
  clients,
  handleClientClick,
  clientDetails,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="client-list">
      <h2>Liste des clients</h2>
      <ul>
        {currentItems.map((client) => (
          <Item
            key={client.id}
            client={client}
            handleClientClick={handleClientClick}
            clientDetails={clientDetails}
          />
        ))}
      </ul>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={clients.length}
        paginate={paginate}
      />
    </div>
  );
};

export default List;
