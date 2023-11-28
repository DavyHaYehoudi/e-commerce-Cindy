import React, { useState } from "react";
import { formatDate } from "../../../../../../helpers/formatDate";
import ArticleNumberByProduct from "./ArticleNumberByProduct";
import { MdEdit } from "react-icons/md";
import {
  handleCancelClientTrackingNumber,
  handleValidateClientTrackingNumber,
} from "./handle/validate";
import ProductListItem from "./ProductListItem";

const ClientTrackingItem = ({
  item,
  clientId,
  orderId,
  setSelectedProducts,
  articleNumberRefs,
  checkboxStates,
  setCheckboxStates,
  error,
  setError,
  selectedProducts,
  dispatch,
  productsStore,
  productActions,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const handleEdition = () => {
    setIsEdited(!isEdited);
  };
  return (
    <div className="trackingNumber trackingNumberClientItem" key={item.id}>
      <div className="header">
        <p>
          <u>Numéro de suivi retour client</u> :{" "}
          <span className="trackingNumberValue">{item.value}</span>{" "}
          <small>- Envoyé le {formatDate(item.date)}</small>
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
        {item?.products?.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            clientId={clientId}
            orderId={orderId}
            productsStore={productsStore}
            productActions={productActions}
          />
        ))}
      </ul>
      {isEdited && (
        <>
          <ArticleNumberByProduct
            clientId={clientId}
            orderId={orderId}
            setSelectedProducts={setSelectedProducts}
            articleNumberRefs={articleNumberRefs}
            checkboxStates={checkboxStates}
            setCheckboxStates={setCheckboxStates}
          />
          {error && <p className="error-message">{error}</p>}
          <div className="trackingNumberClientItem-validate">
            <button
              className="btn-confirm"
              onClick={() =>
                handleValidateClientTrackingNumber(
                  item,
                  setError,
                  selectedProducts,
                  articleNumberRefs,
                  dispatch,
                  clientId,
                  orderId,
                  setSelectedProducts,
                  setCheckboxStates
                )
              }
            >
              Valider
            </button>
            <button
              className="btn-cancel"
              onClick={() =>
                handleCancelClientTrackingNumber(
                  setSelectedProducts,
                  articleNumberRefs,
                  setError,
                  setCheckboxStates
                )
              }
            >
              Annuler
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientTrackingItem;
