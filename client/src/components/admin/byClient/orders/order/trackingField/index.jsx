import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminTrackingItem from "./AdminTrackingItem";
import ClientTrackingItem from "./ClientTrackingItem";
import AdminTrackingNumberCreate from "./AdminTrackingNumberCreate";

const Listing = ({
  trackingNumberList,
  clientId,
  orderId,
  productsActionsStore,
}) => {
  const [trackingNumberBoxOpen, setTrackingNumberBoxOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [error, setError] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState({
    trackingField: "",
    date: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const dispatch = useDispatch();
  const productStore = useSelector((state) => state.product);

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
          productStore={productStore}
          productsActionsStore={productsActionsStore}
          checkboxStates={checkboxStates}
          setCheckboxStates={setCheckboxStates}
          setError={setError}
          selectedProducts={selectedProducts}
          setTrackingNumberBoxOpen={setTrackingNumberBoxOpen}
          setTrackingInfo={setTrackingInfo}
          setSelectedProducts={setSelectedProducts}
          setIsFormValid={setIsFormValid}
        />
      )}
      {(trackingNumberList ?? []).map((item) =>
        item?.isAdmin ? (
          <AdminTrackingItem
            key={item.id}
            item={item}
            clientId={clientId}
            orderId={orderId}
            productStore={productStore}
            productsActionsStore={productsActionsStore}
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
            productStore={productStore}
            productsActionsStore={productsActionsStore}
            setCheckboxStates={setCheckboxStates}
            setError={setError}
            setSelectedProducts={setSelectedProducts}
            setIsFormValid={setIsFormValid}
          />
        )
      )}
    </div>
  );
};

export default Listing;
