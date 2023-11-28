import ArticleNumberByProduct from "./ArticleNumberByProduct";
import { handleCancel, handleValidate } from "./handle/validateAdmin";

const AdminTrackingNumberCreate = ({
  clientId,
  orderId,
  trackingInfo,
  setTrackingInfo,
  setSelectedProducts,
  articleNumberRefs,
  checkboxStates,
  setCheckboxStates,
  error,
  setError,
  selectedProducts,
  setTrackingNumberBoxOpen,
  dispatch,
}) => {
  return (
    <div className="AdminTrackingNumberCreate">
      <div className="trackingNumber-content">
        <label htmlFor="trackingNumberInput">Numéro de suivi d'envoi : </label>
        <input
          type="text"
          id="trackingNumberInput"
          placeholder="Entrer le numéro de suivi"
          value={trackingInfo.number}
          onChange={(e) =>
            setTrackingInfo({ ...trackingInfo, number: e.target.value })
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
        clientId={clientId}
        orderId={orderId}
        setSelectedProducts={setSelectedProducts}
        articleNumberRefs={articleNumberRefs}
        checkboxStates={checkboxStates}
        setCheckboxStates={setCheckboxStates}
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
              articleNumberRefs,
              dispatch,
              clientId,
              orderId,
              setTrackingInfo,
              setSelectedProducts,
              setCheckboxStates
            )
          }
          className="btn-confirm"
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
              articleNumberRefs
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
