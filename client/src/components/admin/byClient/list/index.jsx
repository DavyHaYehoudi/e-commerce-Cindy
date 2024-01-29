import React, { useState } from "react";
import Pagination from "../../../../shared/Pagination";
import Item from "./Item";
import { useSelector } from "react-redux";

const List = ({ handleClientClick, clientDetails }) => {
  const clientsStore = useSelector((state) => state?.clients?.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clientsStore.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="client-list">
      <h2>Liste des clients</h2>
      <ul>
        {currentItems?.map((client) => (
          <Item
            key={client._id}
            client={client}
            handleClientClick={handleClientClick}
            clientDetails={clientDetails}
          />
        ))}
      </ul>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={clientsStore.length}
        paginate={paginate}
      />
    </div>
  );
};

export default List;
