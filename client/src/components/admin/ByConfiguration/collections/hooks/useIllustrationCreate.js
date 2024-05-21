import { useState } from "react";

const useIllustrationCreate = () => {
  const [mainImageCreate, setMainImageCreate] = useState();

  const handleIllustrationCreateChange = async (e) => {
    const file = e.target.files[0];
    setMainImageCreate(file);
  };
  const handleDeleteImage = () => {
    setMainImageCreate(null);
  };

  return {
    handleIllustrationCreateChange,
    handleDeleteImage,
    mainImageCreate,
    setMainImageCreate,
  };
};
export default useIllustrationCreate;
