import React, { useEffect, useState, useCallback } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import useCreateOrder from "../../components/payment/hooks/useCreateOrder";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../features/accountClient/customerSlice";
import { Link } from "react-router-dom";

const Success = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const { handleOrderConfirm } = useCreateOrder();
  const cart = useSelector((state) => state?.customer?.data?.client);
  const dispatch = useDispatch();

  const stableHandleOrderConfirm = useCallback(handleOrderConfirm, []);
  const stableCart = JSON.stringify(cart);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumberParams = urlParams.get("orderNumber");
    if (orderNumberParams) {
      setOrderNumber(orderNumberParams);

      // Récupérer les données du localStorage
      const orderDataConfirm = localStorage.getItem("orderDataConfirm");
      if (orderDataConfirm) {
        const parsedOrderData = JSON.parse(orderDataConfirm);

        stableHandleOrderConfirm(parsedOrderData);
        localStorage.removeItem("orderDataConfirm");
      } else {
        console.log("Aucune donnée de commande trouvée dans le localStorage");
      }
    }
    if (cart) {
      dispatch(clearCart());
    }
    // Utiliser stableCart pour comparer les valeurs de cart
  }, [stableHandleOrderConfirm, stableCart, dispatch]);

  return (
    <div className="payment-success-page">
      <div className="success-page-container">
        <span>
          {" "}
          <IoShieldCheckmarkSharp size={100} />{" "}
        </span>
        <p>
          Payment bien effectué.
          <p> Numéro de commande : {orderNumber}</p>
          <p
            style={{
              cursor: "pointer",
              backgroundColor: "var(--primary)",
              color: "whiteSmoke",
              padding: "5px",
              borderRadius: "5px",
              maxWidth:"300px",
              margin:"auto"
            }}
          >
            <Link to="/account">
              Suivez l'évolution de votre commande dans votre espace client ➡️
            </Link>{" "}
          </p>
        </p>
      </div>
    </div>
  );
};

export default Success;
