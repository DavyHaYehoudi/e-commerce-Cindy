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
import formatMaterialProduct from "../../../../helpers/utils/formatMaterialProduct";

const Modal = ({ handleCloseModal }) => {
  const [showMaterials, setShowMaterials] = useState(true);

  const { fields, handleChangeFields } = useFormFields({
    name: "",
    collection: "",
    category: "",
    description: "",
  });

  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);

  const { tags, addTag, removeTag } = useTagManagement();
  const { images, handleMainImageUpload } = useImageManagement(5);
  const { materialsData, addMaterialData, setMaterialsData } =
    useMaterialDataManagement();
    const { handleSubmit, isSubmitting } = useSubmitForm();

  const handleMaterialsSelectToggle = () => {
    const confirm = window.confirm(
      "En basculant de la section avec ou sans matériau, les données renseignées dans l'une ou l'autre s'effacent. Etes-vous sûr de vouloir basculer ?"
    );
    if (confirm) {
      setShowMaterials(!showMaterials);
      setMaterialsData([]);
    }
  };

  const validateFields = fields?.name && fields?.collection && fields?.category;
  const validateMaterials =
    materialsData?.length > 0 &&
    materialsData?.every((material) => material?.main_image);
  const confirmationEnabled = validateFields && validateMaterials;
  
    // Création du formData
  const formData = {
    name: fields.name,
    _collection: fields.collection,
    category: fields.category,
    tags: tags.map((tag) => tag._id),
    secondary_images: images,
    main_description: fields.description,
    materials: formatMaterialProduct(materialsData),
  };

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
        />
        <Description fields={fields} handleChangeFields={handleChangeFields} />
        <ImagesSecondary
          imagesSecondary={images}
          handleChangeImagesSecondary={handleMainImageUpload}
        />
        <Confirmation
          handleSubmit={()=> handleSubmit(formData)}
          confirmationEnabled={confirmationEnabled}
          isSubmitting={isSubmitting}
        />
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
};

export default Modal;
