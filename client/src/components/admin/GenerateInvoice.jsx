import React from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const GenerateInvoice = () => {
  const location = useLocation();
  const { user, order } = location.state || {}; 
  console.log("location state :",location);

  const handleDownloadPDF = () => {
    const content = document.getElementById("invoice-content");
    const options = { margin: 10, filename: "invoice.pdf", image: { type: "jpeg", quality: 0.98 } };
    html2pdf(content, options);
  };

  return (
    <div id="invoice-content">
      {/* ... (rest of the component remains the same) */}

      {/* Infos du user */}
      <div className="user-info">
        <h2>Informations du client</h2>
        <p>{user?.firstName} {user?.lastName}</p>
        <p>Email: {user?.email}</p>
        <p>Téléphone: {user?.phone}</p>
        <p>Adresse: {user?.address}</p>
      </div>

      {/* Infos de la commande */}
      <div className="order-info">
        <h2>Informations de la commande</h2>
        <p>Date de commande: {order?.date}</p>
        <p>Statut: {order?.status}</p>
        <p>Total de la commande: {order?.totalAmount}</p>
        {/* <p>Méthode de paiement: {order?.paymentMethod.cardType} se terminant par {order?.paymentMethod.last4Digits}</p> */}
        <p>Adresse de livraison: {order?.shippingAddress}</p>
      </div>

      {/* ... (rest of the component remains the same) */}

    </div>
  );
};

export default GenerateInvoice;
