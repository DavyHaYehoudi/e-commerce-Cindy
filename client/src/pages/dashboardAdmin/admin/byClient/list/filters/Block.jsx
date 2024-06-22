import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { BsFilterSquareFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Criteria from "./Criteria";
import Dates from "./Dates";
import { formattedDataClient } from "../../utils/formattedDataClient";
import { fetchClients } from "../../../../../../features/admin/clientsSlice";

const Block = ({ itemsPerPage, setSearchBarValue }) => {
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
    setPreciseDate("");
    setRangeDate({});
    setSelectedOption("");
  };

  const handlePreciseDateChange = (event) => {
    setPreciseDate(event.target.value);
  };
  const handleRangeDateChange = (event, limit) => {
    setRangeDate({ ...rangeDate, [limit]: event.target.value });
  };
  const handleValidation = () => {
    const { steps, credit, refund, exchange, trackingNumber, note } =
      formattedDataClient(checkedItems);

    dispatch(
      fetchClients({
        itemsPerPage: -1,
        steps,
        credit,
        refund,
        exchange,
        trackingNumber,
        note,
        preciseDate,
        rangeDateStart: rangeDate.start,
        rangeDateEnd: rangeDate.end,
      })
    );
    setIsFilterOpen(false);
    setSearchBarValue("");
  };
  const handleReset = () => {
    setCheckedItems({});
    setRangeDate({});
    setPreciseDate("");
    setSelectedOption("");
    dispatch(
      fetchClients({
        itemsPerPage,
      })
    );
  };

  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
    setCheckedItems({});
    setRangeDate({});
    setPreciseDate("");
    setSelectedOption("");
  };

  const isValidationButtonDisabled =
    !Object.values(checkedItems).some((value) => value === true) &&
    preciseDate === "" &&
    !rangeDate.start &&
    !rangeDate.end;

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
