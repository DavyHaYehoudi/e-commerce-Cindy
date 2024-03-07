import React from "react";

const Dates = ({
  handlePreciseDateChange,
  handleRangeDateChange,
  preciseDate,
  setPreciseDate,
  rangeDate,
  setRangeDate,
  selectedOption,
  setSelectedOption
}) => {


  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    setPreciseDate(null);
    setRangeDate({});
  };

  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">DATE DE COMMANDE :</p>
      <div>
        <input
          type="radio"
          id="datePrecise"
          name="dateOption"
          value="datePrecise"
          checked={selectedOption === "datePrecise"}
          onChange={handleOptionChange}
        />
        <label htmlFor="datePrecise">Une date précise :</label>
        {selectedOption === "datePrecise" && (
          <input
            type="date"
            onChange={handlePreciseDateChange}
            value={preciseDate || ""}
          />
        )}
      </div>
      <div>
        <input
          type="radio"
          id="dateRange"
          name="dateOption"
          value="dateRange"
          checked={selectedOption === "dateRange"}
          onChange={handleOptionChange}
        />
        <label htmlFor="dateRange">Entre deux dates :</label>
        {selectedOption === "dateRange" && (
          <>
            <input
              type="date"
              onChange={(e) => handleRangeDateChange(e, "start")}
              value={rangeDate.start || ""}
            />
            <input
              type="date"
              onChange={(e) => handleRangeDateChange(e, "end")}
              value={rangeDate.end || ""}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dates;
