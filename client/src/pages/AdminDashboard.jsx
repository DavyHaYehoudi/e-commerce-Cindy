import React, { useEffect, useState } from "react";
import List from "../components/admin/byClient/list";
import useFetchSlice from "../selectors/useFetchSlice";
import DarkMode from "../components/darkMode/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../features/admin/clientsSlice";
import Operations from "../components/admin/byOperation";
import Statistics from "../components/admin/byStatistic";
import Produits from "../components/admin/byProduct";

const AdminDashboard = () => {
  const [clientDetails, setClientDetails] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState("Clients");
  const dispatch = useDispatch();
  const totalClientsCount = useSelector(
    (state) => state?.clients?.totalClientsCount
  );

  useFetchSlice("clients", undefined, itemsPerPage);
  useFetchSlice("product");

  useEffect(() => {
    dispatch(fetchClients({ itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  const handleChangeItemPerPage = (event) => {
    const selectedValue = event.target.value;
    setItemsPerPage(
      selectedValue === "TOUS" ? -1 : parseInt(selectedValue, 10)
    );
  };

  // ouverture/fermeture rangée client
  const handleClientClick = (clientId) => {
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [clientId]: !prevDetails[clientId],
    }));
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="admin-dashboard" data-testid="admin-dashboard">
      <div className="admin-dashboard-menu">
        <div>
          <button className="account-btn"  onClick={() => handleTabChange("Clients")}>Clients</button>
          <button className="account-btn"  onClick={() => handleTabChange("Operations")}>
            Operations
          </button>
          <button className="account-btn"  onClick={() => handleTabChange("Produits")}>Produit</button>
          <button className="account-btn"  onClick={() => handleTabChange("Statistiques")}>
            Statistiques
          </button>
        </div>
        <div className="darkMode">
          <DarkMode />
        </div>
      </div>
      {selectedTab === "Clients" && (
        <>
          <div>
            <label htmlFor="itemsPerPage">
              {" "}
              {totalClientsCount} clients au total{" "}
            </label>
            <select
              id="itemsPerPage"
              name="itemsPerPage"
              value={itemsPerPage === -1 ? "TOUS" : itemsPerPage}
              onChange={handleChangeItemPerPage}
              defaultValue={5}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value="TOUS">TOUS</option>
            </select>
          </div>
          <List
            handleClientClick={handleClientClick}
            clientDetails={clientDetails}
          />
        </>
      )}
      {selectedTab === "Operations" && <Operations />}
      {selectedTab === "Produits" && <Produits />}
      {selectedTab === "Statistiques" && <Statistics />}
    </div>
  );
};

export default AdminDashboard;
