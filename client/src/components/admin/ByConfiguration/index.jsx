import React from "react";
import Collections from "./collections/Collections.jsx";
import Categories from "./categories/index.jsx";
import Tags from "./tags/Tags.jsx";
import Materials from "./materials/Materials.jsx";

const Configuration = () => {
  return (
    <div className="admin-configuration">
      <h1>Configurations</h1>
      <Collections />
      <Categories />
      <Tags />
      <Materials />
    </div>
  );
};

export default Configuration;
