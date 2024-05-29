import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../../../features/admin/productSlice";
import SearchBarAdmin from "../../../../shared/searchBar/SearchBarAdmin";
import Block from "./filters/Block";
import Products from "./Products";

const ProductFilterPanel = () => {
  const [searchBarValue, setSearchBarValue] = useState("");
  const totalProductsCount = useSelector(
    (state) => state?.product?.totalProductsCount
  );
  const dispatch = useDispatch();
  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearchBarValue(name);
    if (name.length > 2) {
      dispatch(fetchProduct({ name }));
    } else {
      dispatch(fetchProduct());
    }
  };

  return (
    <div className="productsFilterPanel">
      <div className="productsFilterPanel-content">
        <div>
          {totalProductsCount} produit{totalProductsCount > 1 ? "s" : ""} au
          total{" "}
        </div>

        <SearchBarAdmin
          searchBarValue={searchBarValue}
          handleSearchChange={handleSearchChange}
          placeholder="Nom du produit (au moins 3 lettres)"
        />
        <Block setSearchBarValue={setSearchBarValue} />
      </div>
      <Products />
    </div>
  );
};

export default ProductFilterPanel;
