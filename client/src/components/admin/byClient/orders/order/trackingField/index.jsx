import React, { useRef, useState } from "react";
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
    number: "",
    date: "",
  });

  const dispatch = useDispatch();
  const productsStore = useSelector((state) => state.products);
  const productActions = useSelector((state) => state.productActions);
  const articleNumberRefs = useRef({});

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
          setTrackingInfo={setTrackingInfo}
          setSelectedProducts={setSelectedProducts}
          articleNumberRefs={articleNumberRefs}
          checkboxStates={checkboxStates}
          setCheckboxStates={setCheckboxStates}
          error={error}
          setError={setError}
          selectedProducts={selectedProducts}
          setTrackingNumberBoxOpen={setTrackingNumberBoxOpen}
          dispatch={dispatch}
        />
      )}
      {(trackingNumberList ?? []).map((item) =>
        item.isAdmin ? (
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
            setSelectedProducts={setSelectedProducts}
            checkboxStates={checkboxStates}
            setCheckboxStates={setCheckboxStates}
            error={error}
            setError={setError}
            selectedProducts={selectedProducts}
            dispatch={dispatch}
            productsStore={productsStore}
            productActions={productActions}
          />
        )
      )}
    </div>
  );
};

export default Listing;
