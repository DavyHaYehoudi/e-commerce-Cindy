import ArticleNumberByProduct from "./ArticleNumberByProduct";
import useAdminTrackingNumberCreate from "./hooks/useAdminTrackingNumberCreate";

const AdminTrackingNumberCreate = ({
  client,
  orderId,
  trackingInfo,
  error,
  dispatch,
  isFormValid,
  checkboxStates,
  productStore,
  setError,
  setTrackingInfo,
  setSelectedProducts,
  setCheckboxStates,
  selectedProducts,
  setTrackingNumberBoxOpen,
  setIsFormValid,
}) => {
  const { articleNumber, setArticleNumber, handleValidate, handleCancel } =
    useAdminTrackingNumberCreate({
      dispatch,
      setError,
      setSelectedProducts,
      setCheckboxStates,
      setTrackingInfo,
      setTrackingNumberBoxOpen,
      setIsFormValid,
    });
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
              selectedProducts,
              orderId,
              articleNumber
            )
          }
          disabled={!isFormValid}
          className={isFormValid ? "btn-confirm" : "noValid"}
        >
          Valider
        </button>
        <button onClick={() => handleCancel()} className="btn-cancel">
          Annuler
        </button>
      </div>
    </div>
  );
};

export default AdminTrackingNumberCreate;
