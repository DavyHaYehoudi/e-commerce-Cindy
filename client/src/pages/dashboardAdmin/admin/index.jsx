import React, { useState } from "react";
import { IoMdPricetag } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { IoMdAnalytics } from "react-icons/io";
import { FcDataConfiguration } from "react-icons/fc";
import ClientFilterPanel from "./byClient/list/filters";
import List from "./byClient/list";
import Operations from "./byOperation";
import Statistics from "./byStatistic";
import Configuration from "./ByConfiguration";
import ProductFilterPanel from "./byProduct";

const Menu = ({
  totalClientsCount,
  itemsPerPage,
  handleChangeItemPerPage,
  handleClientClick,
  clientDetails,
}) => {
  const [selectedTab, setSelectedTab] = useState("Clients");
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <>
      <div className="admin-dashboard-menu">
        <div>
          <button
            className={`account-btn ${selectedTab === "Clients" ? "selected" : ""}`}
            onClick={() => handleTabChange("Clients")}
          >
            <span>
              <FaUser />
              Clients
            </span>
          </button>
          <button
            className={`account-btn ${selectedTab === "Operations" ? "selected" : ""}`}
            onClick={() => handleTabChange("Operations")}
          >
            <span>
              <TbDiscount2 />
              Operations
            </span>
          </button>
          <button
            className={`account-btn ${selectedTab === "Produits" ? "selected" : ""}`}
            onClick={() => handleTabChange("Produits")}
          >
            <span>
              <IoMdPricetag />
              Produit
            </span>
          </button>
          <button
            className={`account-btn ${selectedTab === "Statistiques" ? "selected" : ""}`}
            onClick={() => handleTabChange("Statistiques")}
          >
            <span>
              <IoMdAnalytics />
              Statistiques
            </span>
          </button>
          <button
            className={`account-btn ${selectedTab === "Configurations" ? "selected" : ""}`}
            onClick={() => handleTabChange("Configurations")}
          >
            <span>
            <FcDataConfiguration />
              Configurations
            </span>
          </button>
        </div>
      </div>
      {selectedTab === "Clients" && (
        <>
          <ClientFilterPanel
            totalClientsCount={totalClientsCount}
            itemsPerPage={itemsPerPage}
            handleChangeItemPerPage={handleChangeItemPerPage}
          />
          <List
            handleClientClick={handleClientClick}
            clientDetails={clientDetails}
          />
        </>
      )}
      {selectedTab === "Operations" && <Operations />}
      {selectedTab === "Produits" && <ProductFilterPanel />}
      {selectedTab === "Statistiques" && <Statistics />}
      {selectedTab === "Configurations" && <Configuration />}
    </>
  );
};

export default Menu;
