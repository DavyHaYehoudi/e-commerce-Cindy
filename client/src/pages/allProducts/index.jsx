import React from "react";
import SearchBarAdmin from "../../shared/searchBar/SearchBarAdmin";
import Block from "../dashboardAdmin/admin/byProduct/filters/Block";
import Products from "./Products";
import useAllProductsPage from "./hooks/useAllProductsPage";

const AllProductsPage = () => {
  const {
    searchBarValue,
    setSearchBarValue,
    materialCount,
    updateMaterialCount,
    handleSearchChange,
  } = useAllProductsPage();

  return (
    <div id="allProducts">
      <div className="allProducts-content">

      <div className="productsFilterPanel">
        <div className="productsFilterPanel-content">
          <div>
            {materialCount} produit{materialCount > 1 ? "s" : ""} au total{" "}
          </div>

          <SearchBarAdmin
            searchBarValue={searchBarValue}
            handleSearchChange={handleSearchChange}
            placeholder="Nom du produit (au moins 3 lettres)"
          />
          <Block setSearchBarValue={setSearchBarValue} />
        </div>
        <Products updateMaterialCount={updateMaterialCount} />
      </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
