import React from "react";
import paymentCard from "../../assets/paymentCard.png";

const PaymentForm = () => {
  return (
    <div className="payment-form">
      <h2>Contact</h2>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Adresse e-mail"
      />
      <div className="checkbox">
        <input type="checkbox" id="subscribe" name="subscribe" />
        <label htmlFor="subscribe">
          Envoyez-moi les nouvelles et les offres par e-mail
        </label>
      </div>

      <h2>Livraison</h2>
      <label htmlFor="country">Pays/région:</label>
      <select id="country" name="country">
        <option value="france">France</option>
        <option value="belgium">Belgique</option>
        <option value="switzerland">Suisse</option>
        <option value="germany">Allemagne</option>
        <option value="spain">Espagne</option>
        <option value="italy">Italie</option>
        <option value="united-kingdom">Royaume-Uni</option>
        <option value="netherlands">Pays-Bas</option>
        <option value="portugal">Portugal</option>
        <option value="luxembourg">Luxembourg</option>
      </select>
      <input type="text" id="firstname" name="firstname" placeholder="Prénom" />
      <input type="text" id="last-name" name="last-name" placeholder="Nom" />
      <input type="text" id="address" name="address" placeholder="Adresse" />
      <input
        type="text"
        id="apartment"
        name="apartment"
        placeholder="Appartement"
      />
      <input
        type="text"
        id="postal-code"
        name="postal-code"
        placeholder="Code postal"
      />
      <input type="text" id="city" name="city" placeholder="Ville" />
      <input type="tel" id="phone" name="phone" placeholder="Téléphone" />

      <div className="checkbox">
        <input type="checkbox" id="saveAddress" name="saveAddress" />
        <label htmlFor="saveAddress">
          Sauvegarder mes coordonnées pour la prochaine fois
        </label>
      </div>

      <h2>Paiement</h2>
      <p>Toutes les transactions sont sécurisées et chiffrées.</p>
      <div className="credit-cards">
        <p>Carte de crédit</p>
        <img src={paymentCard} alt="" />
      </div>
      <input
        type="text"
        id="card-number"
        name="card-number"
        placeholder="Numéro de carte"
      />
      <input
        type="text"
        id="expiration-date"
        name="expiration-date"
        placeholder="Date d'expiration (MM/AA)"
      />
      <input
        type="text"
        id="security-code"
        name="security-code"
        placeholder="Code de sécurité"
      />
      <input
        type="text"
        id="card-name"
        name="card-name"
        placeholder="Nom sur la carte"
      />

      <div className="checkbox">
        <input
          type="checkbox"
          id="useShippingAddress"
          name="useShippingAddress"
        />
        <label htmlFor="useShippingAddress">
          Utiliser l'adresse d'expédition comme adresse de facturation
        </label>
      </div>

      <button type="submit">Vérifier la commande</button>
    </div>
  );
};

export default PaymentForm;
