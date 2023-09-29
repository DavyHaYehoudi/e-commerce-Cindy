import React from "react";
import { Link } from "react-router-dom";
import bo from "../../assets/bo.png"

const MegaMenu = ({ megaMenuSection }) => {
  const isDisplay1Visible = megaMenuSection === "display1";
  const isDisplay2Visible = megaMenuSection === "display2";
  return (
    <div
      className={`megaMenu ${
        isDisplay1Visible || isDisplay2Visible ? "visible" : "hidden"
      }`}
    >
      <div
        className={`megaMenu-display1 ${
          isDisplay1Visible ? "visible" : "hidden"
        }`}
      >
        <div>
          <h3>
            <Link to="menu-tab-category/accessoires-cheveux">
              Accessoires cheveux{" "}
            </Link>{" "}
          </h3>
          <div>
            <ul>
              <li>
                <Link to="menu-tab-subcategory/couronnes">Couronnes</Link>{" "}
              </li>
              <li>
                <Link to="menu-tab-subcategory/peignes-et-pics">
                  Peignes et pics
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3>
            <Link to="menu-tab-category/bijoux">Bijoux</Link>
          </h3>
          <div>
            <ul>
              <li>
                <Link to="menu-tab-subcategory/boucles-d-oreilles">
                  Boucles d'oreilles
                </Link>
              </li>
              <li>
                <Link to="menu-tab-subcategory/bracelets">Bracelets</Link>
              </li>
              <li>
                <Link to="menu-tab-subcategory/colliers">Colliers</Link>
              </li>
              <li>
                <Link to="menu-tab-subcategory/colliers-de-dos">
                  Colliers de dos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3>
            <Link to="menu-tab-category/demoiselles-d-honneur">
              Demoiselles d'honneur
            </Link>
          </h3>
          <div>
            <ul>
              <li>
                <Link to="menu-tab-subcategory/bracelets">Bracelets</Link>
              </li>
              <li>
                <Link to="menu-tab-subcategory/cartes-cadeau">
                  Cartes cadeau
                </Link>
              </li>
              <li>
                <Link to="menu-tab-subcategory/coffret-cadeau">
                  Coffret cadeau
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="imgMenu">
          <img src={bo} alt="" />
        </div>
      </div>
      <div>
        <div
          className={`megaMenu-display2-col ${
            isDisplay2Visible ? "visible" : "hidden"
          }`}
        >
          <h3>
            <Link to="menu-tab-category/bijoux-de-mains">Bijoux de mains</Link>
          </h3>
          <h3>
            <Link to="menu-tab-category/bracelets">Bracelets</Link>
          </h3>
          <h3>
            <Link to="menu-tab-category/chouchous">Chouchous</Link>
          </h3>
          <h3>
            <Link to="menu-tab-category/colliers">Colliers</Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
