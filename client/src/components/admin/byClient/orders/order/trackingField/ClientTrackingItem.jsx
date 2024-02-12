import React from "react";
import { formatDate } from "../../../../../../helpers/utils/formatDate";
import ArticleNumberByProduct from "./ArticleNumberByProduct";
import { MdEdit } from "react-icons/md";
import ProductListItem from "./ProductListItem";
import useClientTrackingItem from "./hooks/useClientTrackingItem";

const ClientTrackingItem = ({
  item,
  client,
  orderId,
  checkboxStates,
  error,
  selectedProducts,
  isFormValid,
  productStore,
  setError,
  setSelectedProducts,
  setCheckboxStates,
  setIsFormValid,
}) => {
  const {
    setArticleNumber,
    articleNumber,
    setIsEdited,
    handleValidate,
    isEdited,
    handleCancel,
  } = useClientTrackingItem({
    setError,
    setSelectedProducts,
    setCheckboxStates,
    setIsFormValid,
  });

  const handleEdition = () => {
    setIsEdited(!isEdited);
  };

  return (
    <div className="trackingNumber trackingNumberClientItem" key={item.id}>
      <div className="header">
        <p>
          <span className="underline">Numéro de suivi retour client</span> :{" "}
          <span className="trackingNumberValue">{item.value}</span>{" "}
          <small>- Envoyé le {formatDate(item.date, false)}</small>
        </p>
        <button
          className="account-btn icon-edit info-tooltip"
          onClick={handleEdition}
          aria-label="Modifier"
        >
          <MdEdit />
        </button>
      </div>
      <ul>
        {item?.productsByOrder?.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            client={client}
            orderId={orderId}
            articleNumber={product.articlesNumber}
            productStore={productStore}
          />
        ))}
      </ul>
      {isEdited && (
        <>
          <ArticleNumberByProduct
            client={client}
            orderId={orderId}
            articleNumber={articleNumber}
            checkboxStates={checkboxStates}
            productStore={productStore}
            setCheckboxStates={setCheckboxStates}
            setSelectedProducts={setSelectedProducts}
            setArticleNumber={setArticleNumber}
            setError={setError}
            setIsFormValid={setIsFormValid}
          />
          {error && <p className="error-message">{error}</p>}
          <div
            className="trackingNumberClientItem-validate"
            data-testid="trackingNumberClientItem-validate"
          >
            <button
              className={isFormValid ? "btn-confirm" : "noValid"}
              onClick={() =>
                handleValidate(item, selectedProducts, articleNumber, orderId)
              }
              disabled={!isFormValid}
            >
              Valider
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              Annuler
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientTrackingItem;
