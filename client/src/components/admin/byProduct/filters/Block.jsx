import React from "react";
import { BsFilterSquareFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Category from "./Category";
import Collection from "./Collection";
import Status from "./Status";
import useFilter from "./hooks/usefilter";

const Block = ({ setSearchBarValue }) => {
  const {
    checkedItems,
    isFilterOpen,
    collectionSelected,
    categoriesStore,
    collectionsStore,
    handleCheckboxChange,
    handleValidation,
    handleReset,
    toggleFilter,
    setCollectionSelected,
    setIsFilterOpen,
    isValidationButtonDisabled,
    validationButtonClass,
  } = useFilter(setSearchBarValue);

  return (
    <div className="filter-block">
      <div className="filter-icon" onClick={toggleFilter}>
        <span>
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
