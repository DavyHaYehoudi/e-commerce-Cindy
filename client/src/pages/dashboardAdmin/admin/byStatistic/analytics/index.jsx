import React from "react";
import { formatPrice } from "../../../../../helpers/utils/prices";

const Analytic = ({ data }) => {
  if (!data) {
    return <div>Chargement en cours...</div>;
  }
  const {
    topSellingProducts,
    topCartProducts,
    ordersCount,
    averageByOrder,
    currentMonthOrdersCount,
    ordersCanceled,
  } = data;
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className="analytics-stats">
      <div className="tab-stats-content">
        <p>Nombre total de commandes : <strong>{ordersCount}</strong>  </p>
        <p>Nombre de commandes annulées : <strong>{ordersCanceled}</strong>  </p>
        <p>
          Nombre de commandes pour ce mois ({currentMonth}) :{" "}
         <strong>{currentMonthOrdersCount}</strong> 
        </p>
        <p>Montant moyen par commande : <strong className="in">{formatPrice(averageByOrder)}</strong>  </p>
      </div>
      <div className="tab-tables-container">
        <div className="content-table">
          <h3 className="underline">Produits les plus vendus</h3>
          {topSellingProducts && topSellingProducts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Nom</th>
                  <th>Matériau</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts?.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="name">{product?.productName}</td>
                    <td>{product?.materialName}</td>
                    <td className="center">{product?.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun produit vendu actuellement.</p>
          )}
        </div>
        <div className="content-table">
          <h3 className="underline">
            Produits les plus fréquents dans le panier des clients
          </h3>
          {topCartProducts && topCartProducts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Nom</th>
                  <th>Matériau</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {topCartProducts?.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="name">{product?.productName}</td>
                    <td>{product?.materialName}</td>
                    <td className="center">{product?.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun produit dans les paniers actuellement.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytic;
