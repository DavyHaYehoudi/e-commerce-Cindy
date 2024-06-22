import React from "react";
import Collections from "./collections";
import Categories from "./categories/index.jsx";
import Tags from "./tags/Tags.jsx";
import Materials from "./materials/Materials.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Configuration = () => {
  return (
    <div className="admin-configuration">
      <h1>Configurations</h1>
      <Collections />
      <Categories />
      <Tags />
      <Materials />
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Configuration;
