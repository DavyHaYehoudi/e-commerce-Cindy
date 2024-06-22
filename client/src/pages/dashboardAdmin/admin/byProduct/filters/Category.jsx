import React from "react";

const Category = ({ handleCheckboxChange, checkedItems,categories }) => {
  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">PAR CATEGORIES :</p>
      {categories&&categories.map(({ name }) => (
        <div key={name}>
          <input
            type="checkbox"
            id={name}
            name={name}
            onChange={handleCheckboxChange}
            checked={checkedItems[name] || false}
          />
          <label htmlFor={name}>{name}</label>
        </div>
      ))}
    </div>
  );
};

export default Category;
