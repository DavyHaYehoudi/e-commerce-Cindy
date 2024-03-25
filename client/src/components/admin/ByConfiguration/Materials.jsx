import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "../../../features/admin/materialSlice";

const Materials = () => {
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editedMaterial, setEditedMaterial] = useState(() => ({
    name: "",
    value: "",
  }));
  const [newMaterial, setNewMaterial] = useState(() => ({
    name: "",
    value: "",
  }));
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

  return (
    <div>
      <h2>materials</h2>
      <ul>
        {materials?.map((material) => (
          <li key={material?._id}>
            {editMaterialId === material?._id ? (
              <>
                <input
                  type="text"
                  value={editedMaterial.name}
                  onChange={(e) => handleChange(e, "name", true)}
                />
                <input
                  type="color"
                  value={editedMaterial.value}
                  onChange={(e) => handleChange(e, "value", true)}
                />
                <button onClick={() => handleEditMaterial(material._id)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{material.name}</span>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: material.value,
                  }}
                ></span>
                <span>{material.value}</span>
                <button
                  onClick={() =>
                    handleEditClick(material._id, material.name, material.value)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteMaterial(material._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nouveau matériau"
        value={newMaterial.name}
        onChange={(e) => handleChange(e, "name", false)}
      />
      <input
        type="color"
        placeholder="Choisir une couleur"
        value={newMaterial.value}
        onChange={(e) => handleChange(e, "value", false)}
      />
      <button onClick={handleAddMaterial}>Add Material</button>
    </div>
  );
};

export default Materials;
