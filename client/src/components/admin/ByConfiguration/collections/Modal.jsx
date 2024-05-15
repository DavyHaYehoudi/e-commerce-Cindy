import React from "react";

const Modal = ({
  handleCancel,
  handleConfirm,
  productsLinkedToCollectionId = null,
  categoriesLinkedToCollectionId = null,
  productsLinkedToCategories = null,
}) => {
  const productsLinkedToCollectionIdNumber =
    productsLinkedToCollectionId.length;
  const categoriesLinkedToCollectionIdNumber =
    categoriesLinkedToCollectionId.length;
  const productsLinkedToCategoriesNumber = productsLinkedToCategories.length;

  let alertProductLinkedToCollectionId = `Cette collection est reliée à ${productsLinkedToCollectionIdNumber} produit${
    productsLinkedToCollectionIdNumber > 1 ? "s" : ""
  }`;
  let alertCategoriesLinkedToCollectionId = `Cette collection est reliée à ${categoriesLinkedToCollectionIdNumber} catégorie${
    categoriesLinkedToCollectionIdNumber > 1 ? "s" : ""
  }`;
  let alertProductsLinkedToCategories =
    categoriesLinkedToCollectionIdNumber > 1
      ? `Ces ${categoriesLinkedToCollectionIdNumber} catégories sont elles-mêmes reliées à ${productsLinkedToCategoriesNumber} ${
          productsLinkedToCategoriesNumber > 1
            ? "produits qui seront supprimés également"
            : "produit qui sera supprimé également"
        }`
      : `Cette catégorie est elle-même reliée à ${productsLinkedToCategoriesNumber} ${
          productsLinkedToCategoriesNumber > 1
            ? "produits qui seront supprimés également."
            : "produit qui sera supprimé également."
        }`;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="collection-confirm-action">
          <p className="alert">
            Tout ce qui est relié à cette collection sera supprimé aussi en même
            temps si vous confirmez. {alertProductLinkedToCollectionId}{" "}
          </p>

          {productsLinkedToCollectionId &&
            productsLinkedToCollectionId.length > 0 && (
              <ol>
                {productsLinkedToCollectionId.map((product) => (
                  <li key={product?._id}>{product?.name} </li>
                ))}
              </ol>
            )}
          {categoriesLinkedToCollectionId &&
            categoriesLinkedToCollectionId.length > 0 && (
              <>
                <p>{alertCategoriesLinkedToCollectionId}</p>
                <ol>
                  {categoriesLinkedToCollectionId.map((category) => (
                    <li key={category?._id}>{category?.name} </li>
                  ))}
                </ol>
              </>
            )}
          {alertProductsLinkedToCategories &&
            alertProductsLinkedToCategories.length > 0 && (
              <>
                <p>{alertProductsLinkedToCategories} </p>
                <ol>
                  {productsLinkedToCategories.map((product) => (
                    <li key={product._id}>{product?.name} </li>
                  ))}
                </ol>
              </>
            )}
          <div className="buttons">
            <button
              className="confirm-action-button cancel"
              onClick={handleCancel}
            >
              Annuler
            </button>
            <button
              className="confirm-action-button confirm"
              onClick={handleConfirm}
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
