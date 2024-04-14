import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMainImageToFirebaseStorage } from "../../../../../../features/admin/productSlice";

const Confirmation = ({
  handleSubmit,
  confirmationEnabled,
  currentAction,
  addImagesToFirebaseStorage,
  deleteImagesFromStorage,
  deleteAllImagesFromStorage,
}) => {
  const dispatch=useDispatch()
  const originalsMainImagesStore = useSelector(
    (state) => state?.product?.originalsMainImages
  );
  const materialsProduct = useSelector((state) => state?.product?.materials);
  return (
    <div className="confirm-section">
      {currentAction === "create" && (
        <button
          disabled={!confirmationEnabled}
          className={`account-btn ${
            confirmationEnabled ? "icon-validate" : ""
          }`}
          onClick={async () => {
            try {
              const paths = await addImagesToFirebaseStorage();
              handleSubmit(currentAction, paths);
            } catch (error) {
              console.log("error dans button valider :", error);
            }
          }}
        >
          Valider
        </button>
      )}
      {currentAction === "edit" && (
        <div className="edit-section">
          <button
            className="account-btn delete"
            onClick={() => {
              handleSubmit("delete");
              deleteAllImagesFromStorage();
            }}
          >
            Supprimer le produit
          </button>
          <button
            className="account-btn icon-validate"
            onClick={async () => {
              try {
                console.log('originalsMainImagesStore:', originalsMainImagesStore)
                const mainImagesToRemove = originalsMainImagesStore?.filter((path) =>
                !materialsProduct?.some((mat) => mat?.main_image === path)
              ).filter(Boolean);
        
              console.log('materialsProduct:', materialsProduct)
              const mainImagesToAdd = materialsProduct?.filter((element) =>
              !originalsMainImagesStore?.some(
                (path) => path === element?.main_image
              )
            ).map(item => item?.main_image);
              console.log("mainImagesToRemove:", mainImagesToRemove);
              console.log("mainImagesToAdd:", mainImagesToAdd);
                // dispatch(updateMainImageToFirebaseStorage({originalsMainImagesStore,materialsProduct}))
                const pathsToAdd = await addImagesToFirebaseStorage();
                const pathsToDelete = await deleteImagesFromStorage();
                const paths = pathsToAdd.filter(
                  (path) => !pathsToDelete.includes(path)
                );
                handleSubmit(currentAction, paths);
              } catch (error) {
                console.log(
                  "error dans button enregistrer les modifications :", 
                  error
                );
              }
            }}
          >
            Enregistrer les modifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
