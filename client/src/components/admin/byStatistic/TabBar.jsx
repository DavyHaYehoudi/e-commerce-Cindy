import React, { useState, Suspense } from "react";

const TabBar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "ANALYSES",
    "AVOIRS",
    "REMBOURSEMENTS",
    "ECHANGES",
    "CARTES-CADEAUX",
    "COMPTES",
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabComponents = [
    React.lazy(() => import("./analytics")),
    React.lazy(() => import("./credits")),
    React.lazy(() => import("./refunds")),
    React.lazy(() => import("./exchanges")),
    React.lazy(() => import("./giftcards")),
    React.lazy(() => import("./accounts")),
  ];

  return (
    <div className="tab-bar">
      <div className="tab-bar-tabs">
        {tabs.map((tab, index) => (
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
            <RenderComponent component={tabComponents[activeTab]} />
          )}
        </Suspense>
      </div>
    </div>
  );
};
const RenderComponent = ({ component: Component }) => {
  return <Component />;
};
export default TabBar;
