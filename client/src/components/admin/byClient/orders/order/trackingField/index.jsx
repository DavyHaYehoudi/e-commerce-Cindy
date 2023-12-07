import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminTrackingItem from "./AdminTrackingItem";
import ClientTrackingItem from "./ClientTrackingItem";
import AdminTrackingNumberCreate from "./AdminTrackingNumberCreate";

const Listing = ({
  trackingNumberList,
  client,
  orderId,
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
          client={client}
          orderId={orderId}
          trackingInfo={trackingInfo}
          error={error}
          isFormValid={isFormValid}
          productStore={productStore}
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
            client={client}
            orderId={orderId}
            productStore={productStore}
          />
        ) : (
          <ClientTrackingItem
            key={item.id}
            item={item}
            client={client}
            orderId={orderId}
            checkboxStates={checkboxStates}
            error={error}
            selectedProducts={selectedProducts}
            isFormValid={isFormValid}
            productStore={productStore}
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
