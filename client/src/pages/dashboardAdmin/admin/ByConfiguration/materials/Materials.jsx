import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import useMaterials from "../hooks/useMaterials";
import Modal from "../shared/Modal";
import ToggleButton from "../../../../../shared/ToggleButton";
import Archives from "../shared/Archives";

const Materials = () => {
  const {
    editMaterialId,
    editedMaterial,
    newMaterial,
    isContentVisible,
    materialsStore,
    productsLinkedToMaterialId,
    openModal,
    productSolded,
    nameModal,
    setEditMaterialId,
    setIsContentVisible,
    handleChange,
    handleAddMaterial,
    handleDeleteMaterial,
    handleEditMaterial,
    handleEditClick,
    handleKeyPress,
    handleKeyPressEdit,
    handleCancel,
    handleConfirm,
  } = useMaterials();

  return (
    <div className="admin-materials configuration">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>Materials</h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <div className="archives">
            <ToggleButton
              initialText="Afficher les matériaux archivés"
              hiddenText="Fermer les archives"
              buttonClass="account-btn toggle"
              content={
                <Archives store={materialsStore} parameter={"material"} />
              }
            />
          </div>
          <ul>
            {materialsStore?.filter((material) => !material?.isArchived).map((material) => (
              <li key={material?._id} className="content-block-wrapper">
                {editMaterialId === material?._id ? (
                  <div className="content-block">
                    <div className="content-block-left">
                      <input
                        type="search"
                        className="account-input-config"
                        autoFocus
                        value={editedMaterial.name}
                        onChange={(e) => handleChange(e, "name", true)}
                        onKeyDown={(e) => handleKeyPressEdit(e, material._id)}
                      />
                      <span>{editedMaterial.value}</span>
                      <input
                        type="color"
                        placeholder="Choisir une couleur"
                        value={editedMaterial.value}
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
                      <span>{material?.name}</span>
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          backgroundColor: material?.value,
                        }}
                      ></span>
                      <span>{material?.value}</span>
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
              type="search"
              placeholder="Nouveau matériau"
              className="account-input-config"
              autoFocus
              value={newMaterial.name}
              onChange={(e) => handleChange(e, "name", false)}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor="colorPicker">Couleur</label>
            <input
              id="colorPicker"
              type="color"
              value={newMaterial.value || "#cc0000"}
              onChange={(e) => handleChange(e, "value", false)}
              onKeyDown={handleKeyPress}
            />
            <button
              className={`account-btn ${
                newMaterial.name && newMaterial.value ? "validate-btn" : ""
              }`}
              disabled={newMaterial.name === "" || newMaterial.value === ""}
              onClick={handleAddMaterial}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
      {openModal && (
        <Modal
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          productsLinkedToMaterialId={productsLinkedToMaterialId}
          productSolded={productSolded}
          name={nameModal}
        />
      )}
    </div>
  );
};

export default Materials;
