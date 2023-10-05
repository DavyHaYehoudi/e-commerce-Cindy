import React from "react";
import { Link } from "react-router-dom";
import bo from "../../assets/bo.png";

const MegaMenu = ({ megaMenuSection }) => {
  const isDisplay1Visible = megaMenuSection === "display1";
  const isDisplay2Visible = megaMenuSection === "display2";
  return (
    <div id="mega-Menu">
      <div
        className={`mega-Menu-Display ${
          isDisplay1Visible || isDisplay2Visible ? "visible" : "hidden"
        }`}
      >
        <div
          className={`mega-Menu-Display-1 ${!isDisplay1Visible && "hidden"}`}
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
          <figure>
            <img src={bo} alt="" />
            <figcaption>Mes boucles d'oreilles</figcaption>
          </figure>
        </div>
        <div
          className={`mega-Menu-Display-2 ${!isDisplay2Visible && "hidden"}`}
        >
          <div>
            <h3>
              <Link to="menu-tab-category/accessoires-cheveux">
                Accessoires cheveux
              </Link>
            </h3>
            <div>
              <ul>
                <li>
                  <Link to="menu-tab-subcategory/chouchous">Chouchous</Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>
              <Link to="menu-tab-category/bien-etre">Bien-être</Link>
            </h3>
            <div>
              <ul>
                <li>
                  <Link to="menu-tab-subcategory/eaux-florales">
                    Eaux florales
                  </Link>
                </li>
                <li>
                  <Link to="menu-tab-subcategory/pochettes-maquillage">
                    Pochettes maquillage
                  </Link>
                </li>
                <li>
                  <Link to="menu-tab-subcategory/roll-on-visage">
                    Roll-on visage
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3>
              <Link to="menu-tab-category/bijoux">bijoux</Link>
            </h3>
            <div>
              <ul>
                <li>
                  <Link to="menu-tab-subcategory/bijoux-de-mains">
                    Bijoux de mains
                  </Link>
                </li>
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
              </ul>
            </div>
          </div>

          <figure>
            <img src={bo} alt="" />
            <figcaption>Mes boucles d'oreilles</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
