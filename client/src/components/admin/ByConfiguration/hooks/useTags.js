import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTag,
  deleteTag,
  updateTag,
} from "../../../../features/admin/tagSlice";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";

const useTags = () => {
  const [editTagId, setEditTagId] = useState(null);
  const [editedTagName, setEditedTagName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(false);
  const tags = useSelector((state) => state?.tag?.data);

  const handleUnauthorized = useUnauthorizedRedirect();
  const dispatch = useDispatch();

  const handleAddTag = () => {
    if (newTagName.trim() !== "") {
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
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cet tag ?"
    );
    if (confirmation) {
      dispatch(deleteTag({ tagId, handleUnauthorized }));
    }
  };
  const handleEditTag = (tagId, name) => {
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
  };
};

export default useTags;
