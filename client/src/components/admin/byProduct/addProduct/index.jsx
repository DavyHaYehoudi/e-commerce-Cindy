import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Name from "./Name";
import Groups from "./Groups";
import Materials from "./Materials";
import Description from "./Description";
import ImagesSecondary from "./ImagesSecondary";
import Confirmation from "./Confirmation";
import Tags from "./Tags";
import { useSelector } from "react-redux";

const Modal = ({ handleCloseModal }) => {
  const [fields, setFields] = useState({
    name: "",
    collection: "",
    category: "",
    tags: [],
    description: "",
    ImagesSecondary: [],
  });
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const categoriesStore = useSelector((state) => state?.category?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);

  console.log("fields dans modal parent :", fields);

  const handleChangeFields = (e, field) => {
    const value = e.target.value;
    const tag = tagsStore.find((tag) => tag._id === value); // Trouver l'objet tag correspondant à l'ID sélectionné
    const newValue = { _id: value, name: tag ? tag.name : "" }; // Construire l'objet avec _id et name
    setFields((prev) => {
      if (Array.isArray(prev[field])) {
        return { ...prev, [field]: [...prev[field], newValue] };
      } else {
        return { ...prev, [field]: newValue };
      }
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
          collectionsStore={collectionsStore}
          categoriesStore={categoriesStore}
          tagsStore={tagsStore}
        />
        <Tags fields={fields} handleChangeFields={handleChangeFields} />
        <Materials />
        <Description fields={fields} handleChangeFields={handleChangeFields} />
        <ImagesSecondary
          fields={fields}
          handleChangeFields={handleChangeFields}
        />
        <Confirmation fields={fields} handleChangeFields={handleChangeFields} />
      </div>
    </div>
  );
};

export default Modal;
