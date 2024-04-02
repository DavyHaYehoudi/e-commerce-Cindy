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

const Modal = ({ handleCloseModal }) => {
  const { fields, handleChangeFields } = useFormFields({
    name: "",
    collection: "",
    category: "",
    description: "",
  });
  const [materialsData, setMaterialsData] = useState([]);
  console.log("materialsData:", materialsData);
  const [showMaterials, setShowMaterials] = useState(true);

  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);

  const { tags, addTag, removeTag } = useTagManagement();
  const { images, handleMainImageUpload } = useImageManagement(5);

  const handleMaterialsSelectToggle = () => {
    const confirm = window.confirm(
      "En basculant de la section avec ou sans matériau, les données renseignées dans l'une ou l'autre s'effacent. Etes-vous sûr de vouloir basculer ?"
    );
    if (confirm) {
      setShowMaterials(!showMaterials);
      setMaterialsData([])
    }
  };
  const addMaterialData = (newMaterialData) => {
    setMaterialsData((prevMaterialsData) => {
      // Vérifier si le matériau existe déjà dans le state
      const materialIndex = prevMaterialsData.findIndex(
        (material) => material._id === newMaterialData._id
      );

      // Si le matériau existe déjà, le mettre à jour
      if (materialIndex !== -1) {
        const updatedMaterialsData = [...prevMaterialsData];
        updatedMaterialsData[materialIndex] = {
          ...updatedMaterialsData[materialIndex],
          ...newMaterialData,
        };
        return updatedMaterialsData;
      }
      // Sinon, ajouter le nouveau matériau
      return [...prevMaterialsData, newMaterialData];
    });
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
        <Confirmation fields={fields} handleChangeFields={handleChangeFields} />
      </div>
    </div>
  );
};

export default Modal;
