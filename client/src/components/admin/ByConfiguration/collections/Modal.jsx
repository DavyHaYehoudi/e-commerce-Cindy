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
    productsLinkedToCollectionIdNumber > 1 ? "s." : "."
  }`;
  let alertCategoriesLinkedToCollectionId = `Cette collection est reliée à ${categoriesLinkedToCollectionIdNumber} catégorie${
    categoriesLinkedToCollectionIdNumber > 1 ? "s." : "."
  }`;
  let alertProductsLinkedToCategories =
    categoriesLinkedToCollectionIdNumber > 1
      ? `Ces ${categoriesLinkedToCollectionIdNumber} catégories sont elles-mêmes reliées à ${productsLinkedToCategoriesNumber} ${
          productsLinkedToCategoriesNumber > 1
            ? "produits qui perdent le lien avec leur catégorie."
            : "produit qui perd le lien avec sa catégorie."
        }`
      : `Cette catégorie est elle-même reliée à ${productsLinkedToCategoriesNumber} ${
          productsLinkedToCategoriesNumber > 1
            ? "produits qui perdent le lien avec leur catégorie."
            : "produit qui perd le lien avec sa catégorie."
        }`;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="collection-confirm-action">
          <div className="block">
            <p className="alert">
              ⚠️ Les produits reliés à cette collection et aux catégories
              associées se retrouveront sans collection ou catégorie affectée ce
              qui les suspendra de l'affichage sur le site.
              <br />
              <br />
              ⚠️ Les catégories associées à cette collection seront supprimées.
              <br />
              <br />
            </p>
          </div>
          <div className="block">
            {productsLinkedToCollectionId &&
              productsLinkedToCollectionId.length > 0 && (
                <>
                  <hr />
                  <br />
                  {productsLinkedToCollectionIdNumber > 0 &&
                    alertProductLinkedToCollectionId}{" "}
                  <ul>
                    {productsLinkedToCollectionId.map((product) => (
                      <li key={product?._id}>{product?.name} </li>
                    ))}
                  </ul>
                  <br />
                  <hr />
                </>
              )}
          </div>
          <div className="block">
            {categoriesLinkedToCollectionId &&
              categoriesLinkedToCollectionId.length > 0 && (
                <>
                  <br />
                  <p>{alertCategoriesLinkedToCollectionId}</p>
                  <ul>
                    {categoriesLinkedToCollectionId.map((category) => (
                      <li key={category?._id}>{category?.name} </li>
                    ))}
                  </ul>
                  <br />
                  <hr />
                </>
              )}
          </div>
          <div className="block">
            {alertProductsLinkedToCategories &&
              alertProductsLinkedToCategories.length > 0 && (
                <>
                  <br />
                  <p>{alertProductsLinkedToCategories} </p>
                  <ul>
                    {productsLinkedToCategories.map((product) => (
                      <li key={product._id}>{product?.name} </li>
                    ))}
                  </ul>
                  <br />
                  <hr />
                </>
              )}
          </div>
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
