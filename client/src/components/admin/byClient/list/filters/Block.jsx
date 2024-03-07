import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFilterSquareFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Steps from "./Steps";
import Dates from "./Dates";
import Options from "./Options";

const Block = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [preciseDate, setPreciseDate] = useState("");
  const [rangeDate, setRangeDate] = useState({ start: "", end: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  const handlePreciseDateChange = (event) => {
    setPreciseDate(event.target.value);
  };
  const handleRangeDateChange = (event, limit) => {
    setRangeDate({ ...rangeDate, [limit]: event.target.value });
  };
  const handleValidation = () => {
    console.log(
      "Filtres validés :",
      checkedItems,
      "Date précise sélectionnée :",
      preciseDate,
      "Range de date :",
      rangeDate
    );
  };
  const handleReset = () => {
    setCheckedItems({});
    setRangeDate({});
    setPreciseDate("");
    setSelectedOption("");
  };

  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

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
          <Steps
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
          />
          <Options
            handleCheckboxChange={handleCheckboxChange}
            checkedItems={checkedItems}
          />
          <div className="filterBlock-content-action">
            <button className="account-btn reset-btn" onClick={handleReset}>
              Réinitialiser
            </button>
            <button
              className="account-btn validate-btn"
              onClick={handleValidation}
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
