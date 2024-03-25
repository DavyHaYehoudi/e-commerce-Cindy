import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMaterial,
  deleteMaterial,
  updateMaterial,
} from "../../../features/admin/materialSlice";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

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
    <div className="admin-materials">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>Materials</h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <ul>
            {materials?.map((material) => (
              <li key={material?._id} className="content-block-wrapper">
                {editMaterialId === material?._id ? (
                  <div className="content-block">
                    <div className="content-block-left">
                      <input
                        type="text"
                        className="account-input-config"
                        value={editedMaterial["name"]}
                        onChange={(e) => handleChange(e, "name", true)}
                      />
                      <span>{editedMaterial["value"]} </span>
                      <input
                        type="color"
                        placeholder="Choisir une couleur"
                        value={editedMaterial["value"]}
                        onChange={(e) => handleChange(e, "value", true)}
                      />
                    </div>
                    <div className="content-block-right">
                      <button
                        className="account-btn validate-btn"
                        onClick={() => handleEditMaterial(material._id)}
                      >
                        Enregistrer
                      </button>
                      <button
                        className="account-btn icon-trash"
                        onClick={() => setEditMaterialId("")}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="content-block-left">
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
                    </div>
                    <div className="content-block-right">
                      <button
                        className="icon-edit account-btn"
                        onClick={() =>
                          handleEditClick(
                            material?._id,
                            material?.name,
                            material?.value
                          )
                        }
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="icon-trash account-btn"
                        onClick={() => handleDeleteMaterial(material?._id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="adding">
            <input
              type="text"
              placeholder="Nouveau matériau"
              className="account-input-config"
              value={newMaterial["name"]}
              onChange={(e) => handleChange(e, "name", false)}
            />
            <label htmlFor="colorPicker">Couleur </label>
            <input
              id="colorPicker"
              type="color"
              value={newMaterial["value"]}
              onChange={(e) => handleChange(e, "value", false)}
            />

            <button
              className={`account-btn ${
                newMaterial.name && newMaterial.value ? "validate-btn" : ""
              }`}
              disabled={newMaterial.name === ""}
              onClick={() => handleAddMaterial(newMaterial)}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materials;
