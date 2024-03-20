import React, { useEffect, useState } from "react";
import useFetchSlice from "../selectors/useFetchSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import Menu from "../components/admin";

const AdminDashboard = () => {
  const [clientDetails, setClientDetails] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const dispatch = useDispatch();
  const totalClientsCount = useSelector(
    (state) => state?.clients?.totalClientsCount
  );

  useFetchSlice("clients", undefined, itemsPerPage);
  useFetchSlice("product");
  useFetchSlice("material")
  useFetchSlice("promocode")
  useFetchSlice("collection")
  useFetchSlice("tag")
  useFetchSlice("categorie")

  useEffect(() => {
    dispatch(fetchClients({ itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  const handleChangeItemPerPage = (event) => {
    const selectedValue = event.target.value;
    setItemsPerPage(
      selectedValue === "TOUS" ? "all" : parseInt(selectedValue, 10)
    );
  };

  // ouverture/fermeture rangée client
  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
  };

  return (
    <div className="admin-dashboard" data-testid="admin-dashboard">
      <Menu
        totalClientsCount={totalClientsCount}
        itemsPerPage={itemsPerPage}
        handleChangeItemPerPage={handleChangeItemPerPage}
        handleClientClick={handleClientClick}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default AdminDashboard;
