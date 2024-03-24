import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMaterial, deleteMaterial, updateMaterial } from "../../../features/admin/materialSlice";

const Materials = () => {
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editedMaterialName, setEditedMaterialName] = useState("");
  const [newMaterialName, setNewMaterialName] = useState("");
  const materials = useSelector((state) => state?.material?.data);

  const dispatch = useDispatch();

  const handleAddMaterial = () => {
    if (newMaterialName.trim() !== "") {
      const formatData = {
        name: newMaterialName,
      };
      dispatch(addMaterial(formatData));
      setNewMaterialName("");
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
  const handleEditMaterial = (materialId, name) => {
    dispatch(updateMaterial({ materialId, name }));
  };
  const handleEditClick = (materialId, materialName) => {
    setEditMaterialId(materialId);
    setEditedMaterialName(materialName);
  };

  const handleSaveClick = () => {
    if (editedMaterialName.trim() !== "") {
      handleEditMaterial(editMaterialId, editedMaterialName);
      setEditMaterialId(null);
      setEditedMaterialName("");
    }
  };

  return (
    <div>
      <h2>materials</h2>
      <ul>
        {materials?.map((collection) => (
          <li key={collection?._id}>
            {editMaterialId === collection?._id ? (
              <>
                <input
                  type="text"
                  value={editedMaterialName}
                  onChange={(e) => setEditedMaterialName(e.target.value)}
                />
                <button onClick={handleSaveClick}>Save</button>
              </>
            ) : (
              <>
                {collection?.name}
                <button
                  onClick={() =>
                    handleEditClick(collection?._id, collection?.name)
                  }
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteMaterial(collection?._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="New collection"
        value={newMaterialName}
        onChange={(e) => setNewMaterialName(e.target.value)}
      />
      <button onClick={() => handleAddMaterial(newMaterialName)}>
        Add Collection
      </button>
    </div>
  );
};

export default Materials;
