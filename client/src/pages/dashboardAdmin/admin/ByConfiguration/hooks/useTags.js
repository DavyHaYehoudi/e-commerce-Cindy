import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTag,
  deleteTag,
  tagIdToRemove,
  updateTag,
} from "../../../../../features/admin/tagSlice";
import useUnauthorizedRedirect from "../../../../../services/errors/useUnauthorizedRedirect";
import { toast } from "react-toastify";

const useTags = () => {
  const [editTagId, setEditTagId] = useState(null);
  const [editedTagName, setEditedTagName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const tags = useSelector((state) => state?.tag?.data);

  const tagId = useSelector((state) => state?.tag?.tagId);

  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (newTagName.trim() === "") {
      return toast.error("Le nom ne peut pas être vide");
    }
    if (newTagName.length > 50) {
      return toast.error("Le nom ne peut pas dépasser 50 caractères.");
    }
    if (newTagName.trim() !== "" && newTagName.length <= 50) {
      const formatData = {
        name: newTagName,
      };
      dispatch(addTag({ formatData, handleUnauthorized }));
      setNewTagName("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTag();
    }
  };
  const handleDeleteTag = (tagId) => {
    dispatch(tagIdToRemove(tagId));
    setOpenModal(true);
  };
  const handleConfirm = () => {
    dispatch(deleteTag({ tagId, handleUnauthorized }));
    dispatch(tagIdToRemove(""));
    setOpenModal(false);
  };
  const handleCancel = () => {
    dispatch(tagIdToRemove(""));
    setOpenModal(false);
  };
  const handleEditTag = (tagId, name) => {
    if (editedTagName.trim() === "") {
      return toast.error("Le nom ne peut pas être vide");
    }
    if (editedTagName.length > 50) {
      return toast.error("Le nom ne peut pas dépasser 50 caractères.");
    }
    dispatch(updateTag({ tagId, name, handleUnauthorized }));
  };
  const handleKeyPressEdit = (event) => {
    if (event.key === "Enter") {
      handleSaveClick();
    }
  };
  const handleEditClick = (tagId, tagName) => {
    setEditTagId(tagId);
    setEditedTagName(tagName);
  };

  const handleSaveClick = () => {
    if (editedTagName.trim() !== "") {
      handleEditTag(editTagId, editedTagName);
      setEditTagId(null);
      setEditedTagName("");
    }
  };

  return {
    editTagId,
    editedTagName,
    newTagName,
    isContentVisible,
    tags,
    openModal,
    setEditTagId,
    setEditedTagName,
    setNewTagName,
    setIsContentVisible,
    handleAddTag,
    handleKeyPress,
    handleKeyPressEdit,
    handleDeleteTag,
    handleEditTag,
    handleEditClick,
    handleSaveClick,
    handleConfirm,
    handleCancel,
  };
};

export default useTags;
