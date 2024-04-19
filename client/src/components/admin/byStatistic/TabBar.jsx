import React, { useState, useEffect, Suspense } from "react";
import { tabs } from "../../../constants/statisticsTabs";
import { customFetch } from "../../../services/customFetch";

const TabBar = ({ selectedYear }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `statistics/${selectedYear}`;
        const responseData = await customFetch(endpoint);
        setData(responseData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    if (selectedYear !== "") {
      fetchData();
    }
  }, [selectedYear]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabComponents = [
    React.lazy(() => import("./analytics")),
    React.lazy(() => import("./credits")),
    React.lazy(() => import("./refunds")),
    React.lazy(() => import("./exchanges")),
    React.lazy(() => import("./giftcards")),
    React.lazy(() => import("./productImages")),
    React.lazy(() => import("./balance")),
  ];

  return (
    <div className="tab-bar">
      <div className="tab-bar-tabs">
        {tabs?.map((tab, index) => (
          <div
            key={tab}
            className={`tab ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="tab-content">
        <Suspense fallback={<div>Chargement...</div>}>
          {activeTab !== null && (
            <RenderComponent component={tabComponents[activeTab]} data={data} />
          )}
        </Suspense>
      </div>
    </div>
  );
};

const RenderComponent = ({ component: Component, data }) => {
  return <Component data={data} />;
};

export default TabBar;
