import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Name from "./bodyCheat/sections/Name";
import Groups from "./bodyCheat/sections/Groups";
import Description from "./bodyCheat/sections/Description";
import ImagesSecondary from "./bodyCheat/sections/ImagesSecondary";
import Confirmation from "./bodyCheat/sections/Confirmation";
import Tags from "./bodyCheat/tags/Tags";
import { useDispatch, useSelector } from "react-redux";
import useTagManagement from "./bodyCheat/hooks/useTagManagment";
import useImageManagement from "./bodyCheat/hooks/useImageManagment";
import useFormFields from "./bodyCheat/hooks/useFormFields";
import MaterialsSelect from "./bodyCheat/materials";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSubmitForm from "./hooks/useSubmitForm";
import { validationBeforeSubmit } from "../../../../helpers/utils/products/validationBeforeSubmit";
import {
  addOriginalsMainImages,
  resetProductMaterials,
} from "../../../../features/admin/productSlice";

const Modal = ({
  handleCloseModal,
  data,
  currentAction,
  currentProductId,
  isWithMaterial,
}) => {
  //States
  const [showMaterials, setShowMaterials] = useState(true);
  //Store
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);
  const materialsData = useSelector((state) => state?.product?.materials);

  //Hooks
  const dispatch = useDispatch();
  const { name, collection, category, description } = data || {};
  const { fields, handleChangeFields } = useFormFields({
    name,
    collection,
    category,
    description,
  });
  const { tags, addTag, removeTag } = useTagManagement(data);
  //Nombre par défaut de carrés upload images secondaires
  const initialImageCount = 5;
  const {
    localImages,
    loading,
    handleChangeImage,
    handleDeleteImage,
    addImagesToFirebaseStorage,
    deleteImagesFromStorage,
    deleteAllImagesFromStorage,
  } = useImageManagement({ data, currentAction, initialImageCount });

  const { handleSubmit } = useSubmitForm({
    handleCloseModal,
    fields,
    tags,
    materialsData,
    currentProductId,
  });
  //Functions
  const handleMaterialsSelectToggle = () => {
    const confirm = window.confirm(
      "En basculant de la section avec ou sans matériau, les données renseignées dans l'une ou l'autre s'effacent. Etes-vous sûr de vouloir basculer ?"
    );
    if (confirm) {
      setShowMaterials(!showMaterials);
      // setMaterialsData([]);
      dispatch(resetProductMaterials());
    }
  };

  useEffect(() => {
    if (currentAction === "edit" && !isWithMaterial) {
      setShowMaterials(false);
    }
  }, [currentAction, isWithMaterial]);

  useEffect(() => {
    //Initialisation du state originaslMainImages et materials dans le store
    if (data?.materials) {
      dispatch(addOriginalsMainImages(data?.materials));
    }
  }, [data?.materials, dispatch]);

  const confirmationEnabled = validationBeforeSubmit(fields, materialsData);

  return (
    <div className="product-modal">
      <div className="product-modal-content">
        {currentAction === "edit" ? (
          <h2>Modification du produit</h2>
        ) : (
          <h2>Création d'un produit</h2>
        )}
        <span className="product-modal-close" onClick={handleCloseModal}>
          <AiOutlineClose />
        </span>
        <Name fields={fields} handleChangeFields={handleChangeFields} />
        <Groups
          fields={fields}
          handleChangeFields={handleChangeFields}
          tags={tags}
          handleAddTag={addTag}
          collectionsStore={collectionsStore}
          categoriesStore={categoriesStore}
          tagsStore={tagsStore}
        />
        <Tags tags={tags} handleRemoveTag={removeTag} />
        <MaterialsSelect
          showMaterials={showMaterials}
          handleMaterialsSelectToggle={handleMaterialsSelectToggle}
          currentAction={currentAction}
          currentProductId={currentProductId}
          isWithMaterial={isWithMaterial}
        />
        <Description fields={fields} handleChangeFields={handleChangeFields} />
        <ImagesSecondary
          localImages={localImages}
          handleChangeImage={handleChangeImage}
          handleDeleteImage={handleDeleteImage}
          loading={loading}
          currentAction={currentAction}
        />
        <Confirmation
          handleSubmit={handleSubmit}
          confirmationEnabled={confirmationEnabled}
          currentAction={currentAction}
          addImagesToFirebaseStorage={addImagesToFirebaseStorage}
          deleteImagesFromStorage={deleteImagesFromStorage}
          deleteAllImagesFromStorage={deleteAllImagesFromStorage}
        />
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Modal;
