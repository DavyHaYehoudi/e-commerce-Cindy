import { useState } from "react";
import ArticleNumberByProduct from "./ArticleNumberByProduct";
import { handleCancel, handleValidate } from "./handle/validateAdmin";

const AdminTrackingNumberCreate = ({
  client,
  orderId,
  trackingInfo,
  error,
  dispatch,
  isFormValid,
  checkboxStates,
  productStore,
  ordersStore,
  productsStore,
  setError,
  setTrackingInfo,
  setSelectedProducts,
  setCheckboxStates,
  selectedProducts,
  setTrackingNumberBoxOpen,
  setIsFormValid,
}) => {
  const [articleNumber, setArticleNumber] = useState({});
  return (
    <div className="AdminTrackingNumberCreate">
      <div className="trackingNumber-content">
        <label htmlFor="trackingNumberInput">Numéro de suivi d'envoi : </label>
        <input
          type="text"
          id="trackingNumberInput"
          placeholder="Entrer le numéro de suivi"
          value={trackingInfo.trackingField}
          onChange={(e) =>
            setTrackingInfo({ ...trackingInfo, trackingField: e.target.value })
          }
        />
      </div>
      <label htmlFor="trackingNumberInputDate">
        Choisir une date d'envoi :
      </label>
      <input
        type="date"
        id="trackingNumberInputDate"
        value={trackingInfo.date}
        onChange={(e) =>
          setTrackingInfo({ ...trackingInfo, date: e.target.value })
        }
      />
      <ArticleNumberByProduct
        client={client}
        orderId={orderId}
        checkboxStates={checkboxStates}
        ordersStore={ordersStore}
        productsStore={productsStore}
        productStore={productStore}
        articleNumber={articleNumber}
        setArticleNumber={setArticleNumber}
        setSelectedProducts={setSelectedProducts}
        setCheckboxStates={setCheckboxStates}
        setError={setError}
        setIsFormValid={setIsFormValid}
      />
      <div className="AdminTrackingNumberCreate-validate">
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={() =>
            handleValidate(
              trackingInfo,
              setError,
              selectedProducts,
              setTrackingNumberBoxOpen,
              dispatch,
              client.id,
              orderId,
              articleNumber,
              setArticleNumber,
              setTrackingInfo,
              setSelectedProducts,
              setCheckboxStates,
              setIsFormValid
            )
          }
          disabled={!isFormValid}
          className={isFormValid ? "btn-confirm" : "noValid"}
        >
          Valider
        </button>
        <button
          onClick={() =>
            handleCancel(
              setTrackingInfo,
              setSelectedProducts,
              setError,
              setCheckboxStates,
              setTrackingNumberBoxOpen,
              setArticleNumber,
              setIsFormValid
            )
          }
          className="btn-cancel"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default AdminTrackingNumberCreate;
