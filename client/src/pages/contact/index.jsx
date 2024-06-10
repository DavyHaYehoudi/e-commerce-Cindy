import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import useContactForm from "./hooks/useContactForm";

const Contact = () => {
  const { form, successForm, loading, handleSubmit } = useContactForm();
  return (
    <section id="contact">
      <p id="contact-text">
        <span>
          ⚠️ Les informations saisies sur cette page sont confidentielles et
          sécurisées
        </span>
      </p>
      <form id="contact-form-box" onSubmit={handleSubmit} ref={form}>
        {successForm.success && (
          <p className="successForm">
            Les données ont bien été envoyées, je reviens vers vous rapidement.
            🙋🏻‍♀️
          </p>
        )}
        {successForm.failed && (
          <p>
            Il semble y avoir un problème de réseau. Veuillez renvoyer le
            formulaire un peu plus tard. 🤷🏻‍♀️
          </p>
        )}
        <fieldset
          className={successForm.success || successForm.failed ? "d-none" : ""}
        >
          <legend>Formulaire de contact</legend>

          <input
            type="text"
            id="nom"
            name="lastname"
            placeholder="NOM *"
            autoFocus
            required
            aria-required="true"
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
            name="phone"
            placeholder="TELEPHONE"
          />
          <textarea
            id="message"
            name="message"
            placeholder="MESSAGE *"
            required
            aria-required="true"
          ></textarea>
          {loading && (
            <div className="loader">
              <MoonLoader color="var(--dark)" />
              <p>Veuillez patienter...</p>
            </div>
          )}
          <input type="submit" value="ENVOYER" className="btn contact-btn" />
        </fieldset>
      </form>
    </section>
  );
};

export default Contact;
