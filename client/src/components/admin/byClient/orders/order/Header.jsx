import React from "react";
import { formatDate } from "../../../../../helpers/utils/formatDate";
import ActionsDropdown from "./ActionsDropdown";
import OrderStep from "../../../../../shared/OrderStep";
import ToggleButton from "../../../../../shared/ToggleButton";

const Header = ({ order, handleSendToClient, step, lastSentDateToClient }) => {
  const {
    firstName: firstNameShipping,
    lastName: lastNameShipping,
    email: emailShipping,
    phone: phoneShipping,
    street: streetShipping,
    postalCode: postalCodeShipping,
    city: cityShipping,
    country: countryShipping,
  } = order?.shippingAddress || {};

  const {
    companyName:companyNameBilling,
    firstName:firstNameBilling,
    lastName:lastNameBilling,
    email:emailBilling,
    street:streetBilling,
    postalCode:postalCodeBilling,
    city:cityBilling,
    country:countryBilling,
    phone:phoneBilling
  } = order?.billingAddress || {};

  return (
    <div
      className="admin-order-item-header"
      data-testid="admin-order-item-header"
    >
      <div className="admin-order-item-header order-header">
        <div>
          <p>
            <span className="dotted">Date de commande</span> :{" "}
            {order.createdAt ? formatDate(order.createdAt) : "Date NC"}
          </p>
          <ToggleButton
            initialText="Détails"
            hiddenText="Fermer"
            buttonClass="account-btn toggle"
            content={
              <div className="order-header-details">
                {" "}
                <div>
                  <span className="dotted">Adresse de livraison</span> :
                  <p>
                    {firstNameShipping} {lastNameShipping}
                  </p>
                  <p>{emailShipping}</p>
                  <p>{phoneShipping}</p>
                  <p>{streetShipping}</p>
                  <p>
                    {postalCodeShipping} {cityShipping}
                  </p>
                  <p>{countryShipping}</p>
                </div>
                <div>
                  <span className="dotted">Adresse de facturation</span> :
                  <p>{companyNameBilling}</p>
                  <p>
                    {firstNameBilling} {lastNameBilling}
                  </p>
                  <p>{emailBilling}</p>
                  <p>{phoneBilling}</p>
                  <p>{streetBilling}</p>
                  <p>
                    {postalCodeBilling} {cityBilling}
                  </p>
                  <p>{countryBilling}</p>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <OrderStep order={order} />
      <ActionsDropdown
        order={order}
        step={step}
        handleSendToClient={handleSendToClient}
        lastSentDateToClient={lastSentDateToClient}
      />
    </div>
  );
};

export default Header;
