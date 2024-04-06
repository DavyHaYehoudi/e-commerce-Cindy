import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Name from "./bodyCheat/sections/Name";
import Groups from "./bodyCheat/sections/Groups";
import Description from "./bodyCheat/sections/Description";
import ImagesSecondary from "./bodyCheat/sections/ImagesSecondary";
import Confirmation from "./bodyCheat/sections/Confirmation";
import Tags from "./bodyCheat/tags/Tags";
import { useSelector } from "react-redux";
import useTagManagement from "./bodyCheat/hooks/useTagManagment";
import useImageManagement from "./bodyCheat/hooks/useImageManagment";
import useFormFields from "./bodyCheat/hooks/useFormFields";
import MaterialsSelect from "./bodyCheat/materials";
import useMaterialDataManagement from "./hooks/useMaterialDataManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSubmitForm from "./hooks/useSubmitForm";
import { validationBeforeSubmit } from "../../../../helpers/utils/products/validationBeforeSubmit";

const Modal = ({ handleCloseModal, data,currentAction ,currentProductId}) => {
  //States
  const [showMaterials, setShowMaterials] = useState(true);
  //Store
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);
  //Hooks
  const { name, collection, category, description } = data || {};
  const { fields, handleChangeFields } = useFormFields({
    name,
    collection,
    category,
    description,
  });
  const { tags, addTag, removeTag } = useTagManagement(data);
  const { images, handleImageUpload, loading, handleDeleteImage } =
    useImageManagement(5, data);
  const { materialsData, addMaterialData, setMaterialsData } =
  useMaterialDataManagement(data);
  console.log('materialsData:', materialsData)
  const { handleSubmit } = useSubmitForm(
    handleCloseModal,
    fields,
    tags,
    materialsData,
    images
  );
  //Functions
  const handleMaterialsSelectToggle = () => {
    const confirm = window.confirm(
      "En basculant de la section avec ou sans matériau, les données renseignées dans l'une ou l'autre s'effacent. Etes-vous sûr de vouloir basculer ?"
    );
    if (confirm) {
      setShowMaterials(!showMaterials);
      setMaterialsData([]);
    }
  };

  const confirmationEnabled = validationBeforeSubmit(fields, materialsData);

  return (
    <div className="product-modal">
      <div className="product-modal-content">
        <h2>Création d'un produit</h2>
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
          addMaterialData={addMaterialData}
          data={data}
          currentAction={currentAction}
          currentProductId={currentProductId}
        />
        <Description fields={fields} handleChangeFields={handleChangeFields} />
        <ImagesSecondary
          imagesSecondary={images}
          handleChangeImagesSecondary={handleImageUpload}
          loading={loading}
          handleDeleteImage={handleDeleteImage}
        />
        <Confirmation
          handleSubmit={handleSubmit}
          confirmationEnabled={confirmationEnabled}
        />
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Modal;