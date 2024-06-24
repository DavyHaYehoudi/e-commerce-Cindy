import React from "react";
import useStoreInfo from "../../../../../shared/hooks/useStoreInfo";

let options = [
  { name: "En promotion", label: "promotion" },
  { name: "Nouveau", label: "untilNew" },
  { name: "Suspendu", label: "pending" },
  { name: "En vedette", label: "isStar" },
];
const Status = ({ handleCheckboxChange, checkedItems }) => {
  const { role } = useStoreInfo({ productsId: "", material: "" });
  console.log('role:', role)
  if (role !== "admin") {
    options = [
      { name: "En promotion", label: "promotion" },
      { name: "Nouveau", label: "untilNew" },
      { name: "En vedette", label: "isStar" },
    ];
  }
  return (
    <div className="filterBlock-content-subBlock">
      <p className="underline">PAR STATUTS :</p>
      {options &&
        options.map(({ name }) => (
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

export default Status;
