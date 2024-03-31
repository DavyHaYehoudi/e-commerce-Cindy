import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Name from "./Name";
import Groups from "./Groups";
import Description from "./Description";
import ImagesSecondary from "./ImagesSecondary";
import Confirmation from "./Confirmation";
import Tags from "./tags/Tags";
import { useSelector } from "react-redux";
import useTagManagement from "./hooks/useTagManagment";
import useImageManagement from "./hooks/useImageManagment";
import useFormFields from "./hooks/useFormFields";
import MaterialsSelect from "./materials";

const Modal = ({ handleCloseModal }) => {
  const { fields, handleChangeFields } = useFormFields({
    name: "",
    collection: "",
    category: "",
    description: "",
  });
  const [materialsData, setMaterialsData] = useState([]);
  console.log('materialsData:', materialsData)
  const [showMaterials, setShowMaterials] = useState(true);

  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);

  const { tags, addTag, removeTag } = useTagManagement();
  const { images, handleMainImageUpload } = useImageManagement(5);

  const handleMaterialsSelectToggle = () => {
    setShowMaterials(!showMaterials);
  };
  const addMaterialData = (newData, materialId) => {
    console.log('addMaterialData:')
    setMaterialsData((prevData) => {
      // Recherchez l'objet correspondant au materialId
      const updatedData = prevData.map((obj) => {
        if (obj._id === materialId) {
          // Mettez à jour les données pour cet objet
          return { ...obj, ...newData };
        }
        return obj; // Renvoyez les autres objets sans modification
      });
      return updatedData; // Renvoyez le tableau mis à jour
    });
  };
  
  // const addMaterialData = (newData) => {
  //   setMaterialsData((prevData) => [...prevData, newData]);
  // };
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
