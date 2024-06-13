import React from "react";
import SearchBarAdmin from "../../shared/searchBar/SearchBarAdmin";
import Block from "../dashboardAdmin/admin/byProduct/filters/Block";
import Products from "./Products";
import useAllProductsPage from "./hooks/useAllProductsPage";
import CartOffcanvas from "../MasterProduct/cartAccess";

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
        <h1>Tous les produits</h1>
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
      <CartOffcanvas />
    </div>
  );
};

export default AllProductsPage;
