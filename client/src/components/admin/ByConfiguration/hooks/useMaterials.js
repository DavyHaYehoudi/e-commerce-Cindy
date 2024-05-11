import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "../../../../features/admin/materialSlice";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";

const useMaterials = () => {
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editedMaterial, setEditedMaterial] = useState({ name: "", value: "" });
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    value: "#cc0000",
  });
  const [isContentVisible, setIsContentVisible] = useState(false);
  const materials = useSelector((state) => state?.material?.data);
  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

  const handleChange = (e, type, isEdited) => {
    const value = e.target.value;
    const setter = isEdited ? setEditedMaterial : setNewMaterial;
    setter((prevMaterial) => ({ ...prevMaterial, [type]: value }));
  };

  const handleAddMaterial = () => {
    if (newMaterial.name.trim() !== "" && newMaterial.value.trim() !== "") {
      dispatch(addMaterial({ newMaterial, handleUnauthorized }));
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
      dispatch(deleteMaterial({ materialId, handleUnauthorized }));
    }
  };

  const handleEditMaterial = (materialId) => {
    if (
      editedMaterial.name.trim() !== "" ||
      editedMaterial.value.trim() !== ""
    ) {
      dispatch(
        updateMaterial({
          data: { materialId, ...editedMaterial },
          handleUnauthorized,
        })
      );
      setEditMaterialId(null);
      setEditedMaterial({ name: "", value: "" });
    }
  };
  const handleKeyPressEdit = (event, materialId) => {
    if (event.key === "Enter") {
      handleEditMaterial(materialId);
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
    handleKeyPress,
    handleKeyPressEdit,
  };
};

export default useMaterials;
