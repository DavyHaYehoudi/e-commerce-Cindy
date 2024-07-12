import React from "react";
import { BsFilterSquareFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Criteria from "./Criteria";
import Dates from "./Dates";
import useFilter from "./hooks/useFilter";
import OrderNumber from "./OrderNumber";

const Block = ({ itemsPerPage, setSearchBarValue }) => {
  const {
    checkedItems,
    setCheckedItems,
    preciseDate,
    setPreciseDate,
    rangeDate,
    setRangeDate,
    isFilterOpen,
    selectedOption,
    setSelectedOption,
    handleCheckboxChange,
    handlePreciseDateChange,
    handleRangeDateChange,
    handleValidation,
    handleReset,
    setIsFilterOpen,
    toggleFilter,
    isValidationButtonDisabled,
    validationButtonClass,
    handleChangeOrderNumber,
    orderNumber,
  } = useFilter(itemsPerPage, setSearchBarValue);
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
          <Criteria
            handleCheckboxChange={handleCheckboxChange}
            checkedItems={checkedItems}
          />
          <Dates
            handlePreciseDateChange={handlePreciseDateChange}
            handleRangeDateChange={handleRangeDateChange}
            preciseDate={preciseDate}
            setPreciseDate={setPreciseDate}
            rangeDate={rangeDate}
            setRangeDate={setRangeDate}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setCheckedItems={setCheckedItems}
          />
          <OrderNumber
            orderNumber={orderNumber}
            handleChangeOrderNumber={handleChangeOrderNumber}
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
