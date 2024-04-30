import { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { generateFilePath } from "../../../../helpers/utils/generateFilePath";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../../../../features/accountClient/customerSlice";

const useProfilClientImage = ({ initAvatar, setIsModified, setIsEditing }) => {
  console.log("initAvatar:", initAvatar);
  const [mainImage, setMainImage] = useState(initAvatar);
  console.log("mainImage:", mainImage);
  const [loading, setLoading] = useState(false);
  const [addAvatarToStorage, setAddAvatarToStorage] = useState(null);
  console.log("addAvatarToStorage:", addAvatarToStorage);
  const [removeAvatarToStorage, setRemoveAvatarToStorage] = useState(null);
  console.log("removeAvatarToStorage:", removeAvatarToStorage);
  const dispatch = useDispatch();
  const handleMainImageChange = async (e) => {
    setIsModified(true);
    setIsEditing(true);
    if (mainImage && !mainImage?.name) {
      setRemoveAvatarToStorage(mainImage);
    }
    const file = e.target.files[0];
    setMainImage(file);
    const path = generateFilePath(file, "avatars/");
    setAddAvatarToStorage({ file, path });
    dispatch(updateAvatar(path));
  };
  const handleDeleteImage = () => {
    setIsModified(true);
    setIsEditing(true);
    if (mainImage && !mainImage?.name) {
      setRemoveAvatarToStorage(mainImage);
    }
    setMainImage(null);
    setAddAvatarToStorage(null);
    dispatch(updateAvatar(""));
  };
  useEffect(() => {
    if (initAvatar && initAvatar.startsWith("avatars")) {
      const fetchImagesFromStorage = async () => {
        try {
          setLoading(true);
          const url = await getDownloadURL(ref(storage, initAvatar));
          setMainImage(url);
          setLoading(false);
          dispatch(updateAvatar(initAvatar))
        } catch (error) {
          console.error(
            "Erreur lors du chargement de l'image principale depuis Firebase Storage :",
            error 
          );
          setLoading(false);
        }
      };

      fetchImagesFromStorage();
    }
  }, [initAvatar,dispatch]);

  return {
    mainImage,
    handleMainImageChange,
    handleDeleteImage,
    loading,
    addAvatarToStorage,
    setAddAvatarToStorage,
    removeAvatarToStorage,
    setRemoveAvatarToStorage,
  };
};
export default useProfilClientImage;