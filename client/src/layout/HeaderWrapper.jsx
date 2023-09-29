import React, { useState } from "react";
import Langs from "../components/smarts/Langs";
import NavIcons from "../components/smarts/NavIcons";
import NavMenu from "../components/smarts/NavMenu";
import { Link } from "react-router-dom";
import MegaMenu from "../components/smarts/MegaMenu";
import logo from "../assets/logo.png"

const HeaderWrapper = () => {
  const [megaMenuSection, setMegaMenuSection] = useState(null);

  const handleMenuEnter = (section) => {
    setMegaMenuSection(section);
  };

  const handleMenuLeave = () => {
    setMegaMenuSection(null);
  };
  return (
    <div id="headerWrapper">
      <div id="flex-item">
        <Langs />
        <h1>
          <Link to="/"><img src={logo} alt="logo" width="200px"/> </Link>
        </h1>
        <div>
          <NavIcons />
        </div>
      </div>
      <div onMouseLeave={handleMenuLeave}>
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
