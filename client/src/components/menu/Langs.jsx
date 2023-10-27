import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Langs = () => {
  return (
    <div id="langs">
      <p id="p-fr">français</p>
      <span aria-label="Ouvrir le contenu">
        <MdOutlineKeyboardArrowDown aria-hidden="true" />
      </span>
    </div>
  );
};

export default Langs;
