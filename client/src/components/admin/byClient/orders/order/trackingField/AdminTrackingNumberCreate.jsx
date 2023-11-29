import { useState } from "react";
import ArticleNumberByProduct from "./ArticleNumberByProduct";
import { handleCancel, handleValidate } from "./handle/validateAdmin";

const AdminTrackingNumberCreate = ({
  clientId,
  orderId,
  trackingInfo,
  error,
  dispatch,
  checkboxStates,
  isFormValid,
  productsStore,
  productActions,
  setError,
  setTrackingInfo,
  setSelectedProducts,
  setCheckboxStates,
  selectedProducts,
  setTrackingNumberBoxOpen,
  setChecking,
  handleCheckQuantity,
  handleTrackingNumber,
  handleTrackingDate,
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
          onBlur={(e) => handleTrackingNumber(e.target.value)}
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
        onBlur={(e) => handleTrackingDate(e.target.value)}
      />
      <ArticleNumberByProduct
        clientId={clientId}
        orderId={orderId}
        checkboxStates={checkboxStates}
        productsStore={productsStore}
        productActions={productActions}
        articleNumber={articleNumber}
        setArticleNumber={setArticleNumber}
        setSelectedProducts={setSelectedProducts}
        setCheckboxStates={setCheckboxStates}
        setError={setError}
        handleCheckQuantity={handleCheckQuantity}
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
              clientId,
              orderId,
              articleNumber,
              setArticleNumber,
              setTrackingInfo,
              setSelectedProducts,
              setCheckboxStates,
              setChecking
            )
          }
          className="btn-confirm"
          disabled={!isFormValid}
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
              setChecking
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
