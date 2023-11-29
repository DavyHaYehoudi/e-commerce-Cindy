import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTrackingItem from "./AdminTrackingItem";
import ClientTrackingItem from "./ClientTrackingItem";
import AdminTrackingNumberCreate from "./AdminTrackingNumberCreate";

const Listing = ({ trackingNumberList, clientId, orderId }) => {
  const [trackingNumberBoxOpen, setTrackingNumberBoxOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [error, setError] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState({
    trackingField: "",
    date: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [checking, setChecking] = useState({
    quantity: false,
    number: false,
    date: false,
  });

  const dispatch = useDispatch();
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);

  const handleCheckQuantity = (inputValues, product) => {
    let isQuantityValid = true;
    setError("");
    Object.entries(inputValues).forEach(([produit, value]) => {
      const numericValue = parseInt(value, 10);
      const numericMaxQuantity = product.quantity;

      if (isNaN(numericValue) || numericValue > numericMaxQuantity) {
        setError(
          `⚠️ Le nombre maximum d'articles pour cette ligne (${numericMaxQuantity}) a été dépassé !`
        );
        isQuantityValid = false;
      }
    });
    setChecking((prev) => ({ ...prev, quantity: isQuantityValid }));
    updateFormValidation();
    return isQuantityValid
  };

  const handleTrackingNumber = (value) => {
    setError("");
    if (!value.trim()) {
      setError("⚠️ Le champ du numéro de suivi ne peut pas être vide.");
    } else {
      setChecking((prev) => ({ ...prev, number: true }));
    }
    updateFormValidation();
  };
  const handleTrackingDate = (value) => {
    setError("");
    if (!value) {
      setError("⚠️ Veuillez choisir une date d'envoi.");
    } else {
      setChecking((prev) => ({ ...prev, date: true }));
    }
    updateFormValidation();
  };
  const updateFormValidation = () => {
    setChecking((prev) => {
      const allChecksPassed = Object.values(prev).every((check) => check);
      setIsFormValid(allChecksPassed);
      return prev;
    });
  };
  useEffect(() => {
    updateFormValidation();
  }, [checking]);

  return (
    <div className="trackingNumberList">
      <button
        className="addTrackingNumberBtn"
        onClick={() => setTrackingNumberBoxOpen(!trackingNumberBoxOpen)}
      >
        Ajouter un numéro de suivi
      </button>
      {trackingNumberBoxOpen && (
        <AdminTrackingNumberCreate
          clientId={clientId}
          orderId={orderId}
          trackingInfo={trackingInfo}
          error={error}
          isFormValid={isFormValid}
          dispatch={dispatch}
          productsStore={productsStore}
          productActions={productActions}
          checkboxStates={checkboxStates}
          setCheckboxStates={setCheckboxStates}
          setError={setError}
          selectedProducts={selectedProducts}
          setTrackingNumberBoxOpen={setTrackingNumberBoxOpen}
          setTrackingInfo={setTrackingInfo}
          setSelectedProducts={setSelectedProducts}
          setChecking={setChecking}
          handleCheckQuantity={handleCheckQuantity}
          handleTrackingNumber={handleTrackingNumber}
          handleTrackingDate={handleTrackingDate}
        />
      )}
      {(trackingNumberList ?? []).map((item) =>
        item?.isAdmin ? (
          <AdminTrackingItem
            key={item.id}
            item={item}
            clientId={clientId}
            orderId={orderId}
            productsStore={productsStore}
            productActions={productActions}
          />
        ) : (
          <ClientTrackingItem
            key={item.id}
            item={item}
            clientId={clientId}
            orderId={orderId}
            checkboxStates={checkboxStates}
            error={error}
            selectedProducts={selectedProducts}
            dispatch={dispatch}
            isFormValid={isFormValid}
            productsStore={productsStore}
            productActions={productActions}
            setCheckboxStates={setCheckboxStates}
            setError={setError}
            setSelectedProducts={setSelectedProducts}
            handleCheckQuantity={handleCheckQuantity}
          />
        )
      )}
    </div>
  );
};

export default Listing;
