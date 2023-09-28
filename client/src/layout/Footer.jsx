import React from "react";
import payment from "../assets/payment.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
const Footer = () => {
  return (
    <footer>
      <div className="footer-contain-top">
        <div className="col">
          <h3>BOUTIQUE</h3>
          <ul>
            <li>Accessoires cheveux</li>
            <li>Bijoux</li>
            <li>Demoiselles d'honneur</li>
            <li>Bracelets</li>
          </ul>
        </div>
        <div className="col">
          <h3>MENU PRINCIPAL</h3>
          <ul>
            <li>Pour un jour unique</li>
            <li>Pour le quotidien</li>
            <li>A propos</li>
            <li>Contact</li>
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
                <img src={facebook} alt="facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/cindy_naturo/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="instagram" />
              </a>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>INFORMATIONS</h3>
          <ul>
            <li>Livraisons et Retours</li>
            <li>Mentions légales</li>
            <li>Conditions générales de vente</li>
          </ul>
        </div>
      </div>
      <div className="footer-contain-bottom">
        <div className="info">
          <div className="logo">© SUPER CINDY</div>
          <div className="payment">
            <img src={payment} alt="payment" width="300px" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
