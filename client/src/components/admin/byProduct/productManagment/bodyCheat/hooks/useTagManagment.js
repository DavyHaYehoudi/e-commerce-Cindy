import { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyProductCheet } from "../../../../../../features/admin/productSlice";

const useTagManagement = (data) => {
  const dispatch = useDispatch();
  const initTags = data?.tags || [];

  const [tags, setTags] = useState(initTags);

  const addTag = (e, value) => {
    const tagExists = tags?.some((tag) => tag?._id === value?._id);
    if (!tagExists) {
      setTags([...tags, value]);
    }
    e.target.value = "";
    dispatch(modifyProductCheet(true));
  };

  const removeTag = (tagId) => {
    setTags((prevTags) => prevTags?.filter((tag) => tag?._id !== tagId));
    dispatch(modifyProductCheet(true));
  };

  return {
    tags,
    addTag,
    removeTag,
  };
};

export default useTagManagement;
