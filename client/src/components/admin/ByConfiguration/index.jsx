import React from "react";
import Collections from "./Collections";
import Categories from "./categories/index.jsx";
import Tags from "./Tags";
import Materials from "./Materials";

const Configuration = () => {
  return (
    <div>
      <h1>Configurations</h1>
      <Collections />
      <Categories />
      <Tags />
      <Materials />
    </div>
  );
};

export default Configuration;
