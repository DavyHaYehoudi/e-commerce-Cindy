import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "../../../features/admin/materialSlice";

const Materials = () => {
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editedMaterial, setEditedMaterial] = useState({ name: "", value: "" });
  const [newMaterial, setNewMateria] = useState({
    name: "",
    value: "",
  });
  const materials = useSelector((state) => state?.material?.data);

  const dispatch = useDispatch();

  const handleNewMaterial = (e, property) => {
    setNewMateria({ ...newMaterial, [property]: e.target.value });
  };
  const handleEditedMaterial = (e, property) => {
    setEditedMaterial({ ...editedMaterial, [property]: e.target.value });
  };

  const handleAddMaterial = () => {
    if (
      newMaterial["name"].trim() !== "" &&
      newMaterial["value"].trim() !== ""
    ) {
      const formatData = {
        name: newMaterial["name"],
        value: newMaterial["value"],
      };
      dispatch(addMaterial(formatData));
      setNewMateria({});
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
  const handleEditMaterial = (materialId, editedproperty) => {
    dispatch(updateMaterial({ materialId, editedproperty }));
  };
  const handleEditClick = (materialId, materialName, materialValue) => {
    setEditMaterialId(materialId);
    setEditedMaterial({ name: materialName, value: materialValue });
  };

  const handleSaveClick = () => {
    if (
      editedMaterial["name"].trim() !== "" ||
      editedMaterial["value"].trim() !== ""
    ) {
      handleEditMaterial(editMaterialId, editedMaterial);
      setEditMaterialId(null);
      setEditedMaterial({});
    }
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
                  value={editedMaterial["name"]}
                  onChange={(e) => handleEditedMaterial(e, "name")}
                />
                <input
                  type="color"
                  placeholder="Choisir une couleur"
                  value={editedMaterial["value"]}
                  onChange={(e) => handleEditedMaterial(e, "value")}
                />
                <button onClick={handleSaveClick}>Save</button>
              </>
            ) : (
              <>
                <span> {material?.name} </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: material?.value,
                  }}
                ></span>

                <span> {material?.value} </span>

                <button
                  onClick={() =>
                    handleEditClick(
                      material?._id,
                      material?.name,
                      material?.value
                    )
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteMaterial(material?._id)}>
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
        value={newMaterial["name"] || ""}
        onChange={(e) => handleNewMaterial(e, "name")}
      />
      <input
        type="color"
        placeholder="Choisir une couleur"
        value={newMaterial["value"] || ""}
        onChange={(e) => handleNewMaterial(e, "value")}
      />
      <button onClick={() => handleAddMaterial(newMaterial)}>
        Add Material
      </button>
    </div>
  );
};

export default Materials;
