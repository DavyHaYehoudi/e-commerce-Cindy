import React from "react";

const Modal = ({
  handleCancel,
  handleConfirm,
  productsLinkedToCollectionId = [],
  categoriesLinkedToCollectionId = [],
  productsLinkedToCategories = [],
  productsLinkedToMaterialId = [],
  productSolded,
  name
}) => {
  const productsLinkedToCollectionIdNumber =
    productsLinkedToCollectionId.length;
  const categoriesLinkedToCollectionIdNumber =
    categoriesLinkedToCollectionId.length;
  const productsLinkedToCategoriesNumber = productsLinkedToCategories.length;
  const productsLinkedToMaterialIdNumber = productsLinkedToMaterialId.length;
  const productSoldedNumber = productSolded.length;

  let alertProductLinkedToCollectionId = `Cette collection est reliée à ${productsLinkedToCollectionIdNumber} produit${
    productsLinkedToCollectionIdNumber > 1 ? "s." : "."
  }`;
  let alertCategoriesLinkedToCollectionId = `Cette collection est reliée à ${categoriesLinkedToCollectionIdNumber} catégorie${
    categoriesLinkedToCollectionIdNumber > 1 ? "s." : "."
  }`;
  let alertProductsLinkedToCategories =
    categoriesLinkedToCollectionIdNumber > 1
      ? `Ces ${categoriesLinkedToCollectionIdNumber} catégories sont reliées à ${productsLinkedToCategoriesNumber} ${
          productsLinkedToCategoriesNumber > 1 ? "produits." : "produit."
        }`
      : `Cette catégorie est reliée à ${productsLinkedToCategoriesNumber} ${
          productsLinkedToCategoriesNumber > 1 ? "produits." : "produit."
        }`;
  let alertProductsLinkedToMaterial =
    productsLinkedToMaterialIdNumber > 1
      ? `${productsLinkedToMaterialIdNumber} produits sont reliés au matériau.`
      : "1 produit est relié au matériau.";

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="configuration-confirm-action">
          <div className="block">
            <div className="alert">
              <p className="title"> {name} </p>
              {productsLinkedToCollectionIdNumber > 0 ||
              productsLinkedToCategoriesNumber > 0 ||
              productsLinkedToMaterialIdNumber > 0 ? (
                <p>
                  <br />
                  {productSoldedNumber>0
                    ? `⚠️ Des produits déjà vendus sont reliés (${productSoldedNumber}), le paramètre ne sera pas supprimé. Il sera archivé et vous pourrez le restaurer par la suite, au besoin.`
                    : `⚠️  Il y a des produits reliés.`}
                </p>
              ) : (
                <p>
                  Etes-vous sûr de vouloir{" "}
                  {productSoldedNumber>0 ? "archiver" : "supprimer"} ?
                </p>
              )}

              {categoriesLinkedToCollectionIdNumber > 0 && (
                <p>
                  ⚠️ Les catégories associées à cette collection en seront
                  impactées .
                </p>
              )}
              <br />
            </div>
          </div>
          <div className="block">
            {productsLinkedToCollectionIdNumber > 0 && (
              <>
                <hr />
                <br />
                {alertProductLinkedToCollectionId}{" "}
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
            {categoriesLinkedToCollectionIdNumber > 0 && (
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
            {productsLinkedToCategoriesNumber > 0 && (
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
          <div className="block">
            {productsLinkedToMaterialIdNumber > 0 && (
              <>
                <br />
                <p>{alertProductsLinkedToMaterial} </p>
                <ul>
                  {productsLinkedToMaterialId.map((product) => (
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
