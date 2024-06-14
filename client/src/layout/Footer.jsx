import React from "react";
import payment from "../assets/payment.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer role="contentinfo" >
      <div className="footer-contain-top">
        <div className="col">
          <h3>MENU PRINCIPAL</h3>
          <ul>
            <li><Link to="menu-tab-collections">Collections</Link> </li>
            <li><Link to="menu-tab-categories">Catégories</Link> </li>
            <li><Link to="products" >Produits</Link></li>
            <li><Link to="tradition" >Tradition</Link></li>
            <li><Link to="about">Moi</Link></li>
            <li><Link to="contact">Contact</Link></li>
          </ul>
        </div>
        <div className="col social">
          <h3>RESEAUX SOCIAUX</h3>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/people/Cindy-Pantoustier-Naturopathe/100085082745386/?ref=pages_you_manage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="facebook" width="32px"/>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/cindy_naturo/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="instagram" width="32px" />
              </a>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>INFORMATIONS</h3>
          <ul>
            <li><Link to="deliveries&returns"> Livraisons et Retours</Link></li>
            <li><Link to="legal-notice">Mentions légales</Link> </li>
            <li><Link to="terms-of-sales">Conditions générales de vente</Link> </li>
          </ul>
        </div>
      </div>
      <div className="footer-contain-bottom">
        <div className="info">
          <div className="payment">
            <img src={payment} alt="payment" width="300px" />
          </div>
          <div className="logo">© Atelier Noralya</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
