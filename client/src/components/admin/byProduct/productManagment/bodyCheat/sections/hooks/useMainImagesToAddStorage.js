import { useState } from "react";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { resetStore } from "../../../../../../../features/admin/productSlice";

const useMainImagesToAddStorage = (data) => {
  const [mainImagesToAddStorage, setMainImagesToAddStorage] = useState([]);
  const mainImagesToRemoveStorage = useSelector(
    (state) => state?.product?.mainImagesToRemoveStorage
  );
  const dispatch = useDispatch();

  const addMainImageToStorage = ({ materialId, file, path }) => {
    const existingMaterialIndex = mainImagesToAddStorage.findIndex(
      (material) => material._id === materialId
    );
    if (existingMaterialIndex !== -1) {
      const updatedMainImages = [...mainImagesToAddStorage];
      updatedMainImages[existingMaterialIndex] = {
        _id: materialId,
        file,
        path,
      };
      setMainImagesToAddStorage(updatedMainImages);
    } else {
      setMainImagesToAddStorage([
        ...mainImagesToAddStorage,
        { _id: materialId, file, path },
      ]);
    }
  };
  const uploadMainImagesToStorage = async () => {
    try {
      if (mainImagesToAddStorage.length > 0) {
        const uploadPromises = mainImagesToAddStorage.map(
          async ({ path, file }) => {
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file);
          }
        );
        await Promise.all(uploadPromises);
      }
    } catch (error) {
      console.log("Erreur lors de l'upload à Firebase Storage :", error);
      throw error;
    }
  };
  const deleteMainImagesFromStorage = async () => {
    try {
      if (mainImagesToRemoveStorage.length > 0) {
        const deletePromises = mainImagesToRemoveStorage.map(
          async (imageUrl) => {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          }
        );
        await Promise.all(deletePromises);
      }
    } catch (error) {
      console.log(
        "Erreur lors de la suppression depuis Firebase Storage :",
        error
      );
      throw error;
    }
  };
  const deleteAllMainImagesFromStorage = async (data) => {
    if (data && data?.materials) {
      try {
        const mainImagesURL = await Promise.all(
            data?.materials.map(async ({ main_image }) => {
                const imageRef = ref(storage,  main_image );
                return await getDownloadURL(imageRef);
            })
        );
        await Promise.all(
          mainImagesURL.map(async (imageUrl) => {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          })
        );
      } catch (error) {
        console.log("Erreur dans deleteAllMainImagesFromStorage :", error);
      }
    }
  };
  const reset = () => {
    setMainImagesToAddStorage([]);
    dispatch(resetStore());
  };

  return {
    mainImagesToAddStorage,
    addMainImageToStorage,
    uploadMainImagesToStorage,
    deleteMainImagesFromStorage,
    deleteAllMainImagesFromStorage,
    reset,
  };
};

export default useMainImagesToAddStorage;
