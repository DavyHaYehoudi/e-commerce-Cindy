import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFilterSquareFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Category from "./Category";
import Collection from "./Collection";
import Status from "./Status";
import { formattedDataProduct } from "../utils/filter/formattedDataProduct"
import { fetchProduct } from "../../../../features/admin/productSlice";

const Block = ({ setSearchBarValue }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [collectionSelected, setCollectionSelected] = useState("");
  const categoriesStore = useSelector((state) => state?.category?.data);
  const collectionsStore = useSelector((state) => state?.collection?.data);

  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  const handleValidation = () => {
    const { collection, categories, other } =
      formattedDataProduct(
        checkedItems,
        collectionSelected,
        categoriesStore,
        collectionsStore
      ) || {};

    dispatch(
      fetchProduct({
        collection,
        categories,
        others: other.join(","),
      })
    );
    setIsFilterOpen(false);
    setSearchBarValue("");
    setCollectionSelected("");
  };
  const handleReset = () => {
    setCheckedItems({});
    setCollectionSelected("");
    dispatch(fetchProduct());
  };

  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
    setCheckedItems({});
  };

  const isValidationButtonDisabled =
    !Object.values(checkedItems).some((value) => value === true) &&
    collectionSelected === "";

  const validationButtonClass = isValidationButtonDisabled
    ? "account-btn"
    : "account-btn validate-btn";
  return (
    <div className="filter-block">
      <div className="filter-icon" onClick={toggleFilter}>
        <span>
          {" "}
          <BsFilterSquareFill />
          Filtres
        </span>
      </div>
      {isFilterOpen && (
        <div className="filterBlock-content">
          <span
            className="filter-block-close"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <AiOutlineClose />
          </span>
          <Collection
            collectionSelected={collectionSelected}
            setCollectionSelected={setCollectionSelected}
            collections={collectionsStore}
          />
          <Category
            handleCheckboxChange={handleCheckboxChange}
            checkedItems={checkedItems}
            categories={categoriesStore}
          />
          <Status
            handleCheckboxChange={handleCheckboxChange}
            checkedItems={checkedItems}
          />
          <div className="filterBlock-content-action">
            <button className="account-btn reset-btn" onClick={handleReset}>
              Réinitialiser
            </button>
            <button
              className={validationButtonClass}
              onClick={handleValidation}
              disabled={isValidationButtonDisabled}
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Block;
