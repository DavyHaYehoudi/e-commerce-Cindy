import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

const List = ({ handleClientClick, clientDetails }) => {
  const clientsStore = useSelector((state) => state?.clients?.data);

  return (
    <div className="client-list">
      <h2>Liste des clients</h2>
      <ul>
        {clientsStore?.map((client) => (
          <Item
            key={client._id}
            client={client}
            handleClientClick={handleClientClick}
            clientDetails={clientDetails}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
