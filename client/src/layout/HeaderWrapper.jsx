import React, { useState } from "react";
import Langs from "../components/smarts/Langs";
import NavIcons from "../components/smarts/NavIcons";
import NavMenu from "../components/smarts/NavMenu";
import { Link } from "react-router-dom";
import MegaMenu from "../components/smarts/MegaMenu";

const HeaderWrapper = () => {
  const [megaMenuSection, setMegaMenuSection] = useState(null);

  const handleMenuEnter = (section) => {
    setMegaMenuSection(section);
  };

  const handleMenuLeave = () => {
    setMegaMenuSection(null);
  };
  return (
    <div className="headerWrapper">
      <div className="flex-item">
        <Langs />
        <h1>
          <Link to="/">Nom de la société</Link>
        </h1>
        <div className="navIcons-wrapper">
          <NavIcons />
        </div>
      </div>
      <div className="menu" onMouseLeave={handleMenuLeave}>
        <NavMenu
          handleMenuEnter={handleMenuEnter}
          handleMenuLeave={handleMenuLeave}
        />

        <MegaMenu
          megaMenuSection={megaMenuSection}
          handleMenuEnter={handleMenuEnter}
        />
      </div>
    </div>
  );
};

export default HeaderWrapper;
