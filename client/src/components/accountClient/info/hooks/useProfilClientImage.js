import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useProfilClientImage = (initAvatar) => {
  const [initImage, setInitImage] = useState(initAvatar);
  const [mainImage, setMainImage] = useState(initAvatar);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleMainImageChange = async (e) => {
    // if (mainImage && !mainImage?.name) {
    //   dispatch(mainImagesToRemoveStorage(mainImage));
    // }
    const file = e.target.files[0];
    setMainImage(file);
    // const path = generateFilePath(file, "avatars/");
    // dispatch(updateProductMaterials({ _id: material?._id, main_image: path }));
    // addMainImageToStorage({
    //   materialId: material?._id,
    //   file,
    //   path,
    // });
  };
  const handleDeleteImage = () => {
    // if (mainImage && !mainImage?.name) {
    //   dispatch(mainImagesToRemoveStorage(mainImage));
    // }
    setMainImage(null);
    // dispatch(updateProductMaterials({ _id: material?._id, main_image: null }));
  };
  useEffect(() => {
    if (initImage) {
      const fetchImagesFromStorage = async () => {
        try {
          if (initImage.startsWith("avatars")) {
            setLoading(true);
            const url = await getDownloadURL(ref(storage, initImage));
            setMainImage(url);
            setLoading(false);
          }
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
  }, [initImage]);
  return { mainImage, handleMainImageChange, handleDeleteImage, loading };
};
export default useProfilClientImage;
