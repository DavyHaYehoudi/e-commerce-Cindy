import React, { useState, useEffect, Suspense } from "react";
import { tabs } from "../../../constants/statisticsTabs";
import { Get } from "../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { handleFetchError } from "../../../services/errors/handleFetchError";

const TabBar = ({ selectedYear }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(null);
  const handleUnauthorized = useUnauthorizedRedirect();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `statistics/${selectedYear}`;
        const responseData = await Get(endpoint, null, handleUnauthorized);
        setData(responseData);
      } catch (error) {
        handleFetchError(error);
      }
    };

    if (selectedYear !== "") {
      fetchData();
    }
  }, [selectedYear, handleUnauthorized]);

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
