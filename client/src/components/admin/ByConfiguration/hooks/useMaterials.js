import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "../../../../features/admin/materialSlice";

const useMaterials = () => {
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editedMaterial, setEditedMaterial] = useState({ name: "", value: "" });
  const [newMaterial, setNewMaterial] = useState({ name: "", value: "#cc0000" });
  const [isContentVisible, setIsContentVisible] = useState(false);
  const materials = useSelector((state) => state?.material?.data);
  const dispatch = useDispatch();

  const handleChange = (e, type, isEdited) => {
    const value = e.target.value;
    const setter = isEdited ? setEditedMaterial : setNewMaterial;
    setter((prevMaterial) => ({ ...prevMaterial, [type]: value }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.name.trim() !== "" && newMaterial.value.trim() !== "") {
      dispatch(addMaterial(newMaterial));
      setNewMaterial({ name: "", value: "" });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddMaterial();
    }
  };

  const handleDeleteMaterial = (materialId) => {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer ce matériau ?"
    );
    if (confirmation) {
      dispatch(deleteMaterial(materialId));
    }
  };

  const handleEditMaterial = (materialId) => {
    if (
      editedMaterial.name.trim() !== "" ||
      editedMaterial.value.trim() !== ""
    ) {
      dispatch(updateMaterial({ materialId, ...editedMaterial }));
      setEditMaterialId(null);
      setEditedMaterial({ name: "", value: "" });
    }
  };

  const handleEditClick = (materialId, materialName, materialValue) => {
    setEditMaterialId(materialId);
    setEditedMaterial({ name: materialName, value: materialValue });
  };

  return {
    editMaterialId,
    editedMaterial,
    newMaterial,
    isContentVisible,
    materials,
    setEditMaterialId,
    setIsContentVisible,
    handleChange,
    handleAddMaterial,
    handleDeleteMaterial,
    handleEditMaterial,
    handleEditClick,
    handleKeyPress
  };
};

export default useMaterials;
