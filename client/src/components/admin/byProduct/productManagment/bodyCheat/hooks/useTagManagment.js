import { useState } from "react";

const useTagManagement = (data) => {
  const initTags = data?.tags || [];

  const [tags, setTags] = useState(initTags);

  const addTag = (e, value) => {
    const tagExists = tags?.some((tag) => tag?._id === value?._id);
    if (!tagExists) {
      setTags([...tags, value]);
    }
    e.target.value = "";
  };

  const removeTag = (tagId) => {
    setTags((prevTags) => prevTags?.filter((tag) => tag?._id !== tagId));
  };

  return {
    tags,
    addTag,
    removeTag,
  };
};

export default useTagManagement;
