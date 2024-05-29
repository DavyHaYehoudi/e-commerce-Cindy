import React, { useState } from "react";
import useCollections from "./hooks/useCollections";
import Modal from "../shared/Modal";
import ToggleButton from "../../../../shared/ToggleButton";
import Archives from "../shared/Archives";
import useIllustrationCreate from "./hooks/useIllustrationCreate";
import AddingBlock from "./blocks/AddingBlock";
import DisplayBlock from "./blocks/DisplayBlock";
import EditingBlock from "./blocks/EditingBlock";

const Collections = () => {
  const [addIllustrationToStorage, setAddIllustrationToStorage] =
    useState(null);
  const [removeIllustrationToStorage, setRemoveIllustrationToStorage] =
    useState(null);

  const {
    editCollectionId,
    editedCollectionName,
    newCollectionName,
    isContentVisible,
    collectionsStore,
    openModal,
    productsLinkedToCollectionId,
    categoriesLinkedToCollectionId,
    productsLinkedToCategories,
    productSolded,
    nameModal,
    loading,
    handleCancel,
    handleConfirm,
    setEditCollectionId,
    setEditedCollectionName,
    setNewCollectionName,
    setIsContentVisible,
    handleAddCollection,
    handleDeleteCollection,
    handleEditClick,
    handleSaveClick,
    handleKeyPress,
    handleKeyPressEdit,
  } = useCollections();

  const {
    handleIllustrationCreateChange,
    handleDeleteImage,
    mainImageCreate,
    setMainImageCreate,
  } = useIllustrationCreate();

  return (
    <div className="admin-collections configuration">
      <h2 onClick={() => setIsContentVisible(!isContentVisible)}>
        Collections
      </h2>
      {isContentVisible && (
        <div className=" admin-config-tab">
          <div className="archives">
            <ToggleButton
              initialText="Afficher les collections archivées"
              hiddenText="Fermer les archives"
              buttonClass="account-btn toggle"
              content={
                <Archives store={collectionsStore} parameter={"collection"} />
              }
            />
          </div>
          <ul>
            {collectionsStore
              ?.filter((collection) => !collection?.isArchived)
              .map((collection) => (
                <li key={collection?._id} className="content-block-wrapper">
                  {editCollectionId === collection?._id ? (
                    <EditingBlock
                      editedCollectionName={editedCollectionName}
                      setEditedCollectionName={setEditedCollectionName}
                      handleKeyPressEdit={handleKeyPressEdit}
                      collection={collection}
                      loading={loading}
                      handleSaveClick={handleSaveClick}
                      setEditCollectionId={setEditCollectionId}
                      addIllustrationToStorage={addIllustrationToStorage}
                      setAddIllustrationToStorage={setAddIllustrationToStorage}
                      removeIllustrationToStorage={removeIllustrationToStorage}
                      setRemoveIllustrationToStorage={
                        setRemoveIllustrationToStorage
                      }
                    />
                  ) : (
                    <DisplayBlock
                      collection={collection}
                      collectionsStore={collectionsStore}
                      handleEditClick={handleEditClick}
                      handleDeleteCollection={handleDeleteCollection}
                    />
                  )}
                </li>
              ))}
          </ul>
          <AddingBlock
            newCollectionName={newCollectionName}
            setNewCollectionName={setNewCollectionName}
            handleKeyPress={handleKeyPress}
            mainImageCreate={mainImageCreate}
            handleIllustrationCreateChange={handleIllustrationCreateChange}
            handleDeleteImage={handleDeleteImage}
            handleAddCollection={handleAddCollection}
            setMainImageCreate={setMainImageCreate}
            loading={loading}
          />
        </div>
      )}
      {openModal && (
        <Modal
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          productsLinkedToCollectionId={productsLinkedToCollectionId}
          categoriesLinkedToCollectionId={categoriesLinkedToCollectionId}
          productsLinkedToCategories={productsLinkedToCategories}
          productSolded={productSolded}
          name={nameModal}
        />
      )}
    </div>
  );
};

export default Collections;
