import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({ categories, ...props }) => {
  return (
    <ul>
      {categories?.map((category) => (
        <CategoryItem key={category?._id} category={category} {...props} />
      ))}
    </ul>
  );
};

export default CategoriesList;
