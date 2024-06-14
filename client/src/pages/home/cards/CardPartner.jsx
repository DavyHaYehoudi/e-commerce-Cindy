import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
const CardPartner = ({ partner }) => {
  return (
    <div className="card-container card">
      <div className="box-image">
        <img src={partner.img} alt={partner.link} />
      </div>
      <p>
        <a href={partner.link} target="_blank" rel="noopener noreferrer">
          {partner.link}
          <br /> <FaLongArrowAltRight />{" "}
        </a>
      </p>
    </div>
  );
};

export default CardPartner;
