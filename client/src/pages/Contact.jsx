import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {SlScreenSmartphone} from "react-icons/sl"
import {AiOutlineMail} from "react-icons/ai"
// import Spin from "../components/Spin";

const Contact = () => {
  const [successForm] = useState({
    success: false,
    failed: false,
  });
  const [spinActiv] = useState(false);
  const form = useRef();
  const phoneNumber = "0618010504";

//   const sendEmail = (e) => {
//     console.log("e :", e);
//     e.preventDefault();
//     setSpinActiv(true);
//   }
  // L autofocus ne fonctionne pas toujours au chargement de la page
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("nom").focus();
    }, 0);
  }, []);

  return (
    <section id="contact">
      <p id="contact-text" >
        <span>
          ⚠️ Les informations saisies sur cette page sont confidentielles et
          sécurisées
        </span>
      </p>
      <div id="contact-content-container">
        <div id="contact-info-box">
          <div className="info">
            <Link to={`tel:${phoneNumber}`}>
             <SlScreenSmartphone />
              <span>06 18 01 05 04</span>
            </Link>
          </div>
          <div className="info">
            <Link
              to="mailto:contact@cindy-naturopathe.com"
              rel="noopener noreferrer"
              target="_blanck"
            >
             <AiOutlineMail />
              <span>contact@cindy-naturopathe.com</span> 
            </Link>
          </div>
        </div>
        <form id="contact-form-box" ref={form}>
          {/* {spinActiv && <Spin />} */}
          {successForm.success && (
            <p className="successForm">
              Les données ont bien été envoyées, je reviens vers vous
              rapidement. 🙋🏻‍♀️
            </p>
          )}
          {successForm.failed && (
            <p>
              Il semble y avoir un problème de réseau. Veuillez renvoyer le
              formulaire un peu plus tard. 🤷🏻‍♀️
            </p>
          )}
          <fieldset
            className={
              successForm.success || successForm.failed || spinActiv
                ? "d-none"
                : ""
            }
          >
            <legend>Formulaire de contact</legend>

            <input
              type="text"
              id="nom"
              name="name"
              placeholder="NOM *"
              autoFocus
              required
            />
            <input
              type="text"
              id="prenom"
              name="firstname"
              placeholder="PRENOM"
            />
            <input
              type="text"
              id="telephone"
              name="tel"
              placeholder="TELEPHONE *"
              required
            />
            <textarea
              id="message"
              name="message"
              placeholder="MESSAGE"
            ></textarea>
            <input type="submit" value="ENVOYER" className="btn" />
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default Contact;
