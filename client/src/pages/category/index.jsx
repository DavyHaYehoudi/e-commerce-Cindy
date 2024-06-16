import React from "react";
import { useSelector } from "react-redux";
import CartOffcanvas from "../MasterProduct/cartAccess";
import CardCategory from "./CardCategory";

const Categories = () => {
  const categoriesStore = useSelector((state) => state?.category?.data);
  return (
    <div className="categories-ui">
      <div className="animated-container">
        <h1 className="text-effect-1">TOUTES LES CATEGORIES</h1>
        <div className="categories-wrapper-ui">
          {categoriesStore &&
            categoriesStore.length > 0 &&
            categoriesStore
              .filter((category) => !category?.isArchived)
              .map((category) => (
                <CardCategory  category={category} key={category?._id} />
              ))}
        </div>
      </div>
      <CartOffcanvas />
    </div>
  );
};

export default Categories;
