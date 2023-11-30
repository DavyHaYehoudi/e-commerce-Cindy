import React, { useState } from "react";
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
  console.log('isFormValid:', isFormValid)

  const dispatch = useDispatch();
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);

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
            setIsFormValid={setIsFormValid}
          />
        )
      )}
    </div>
  );
};

export default Listing;
