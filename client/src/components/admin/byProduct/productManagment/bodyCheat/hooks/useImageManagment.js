import { useState, useEffect } from "react";
import { storage } from "../../../../../../firebase";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const useImageManagement = ({ data, currentAction, initialImageCount }) => {
  const totalInputs =
    currentAction === "create"
      ? initialImageCount
      : Math.max(initialImageCount, data?.images?.length || 0);
  // State pour stocker les images originales en mode "edit"
  const [originalImages, setOriginalImages] = useState([]);
  console.log("originalImages:", originalImages);
  // State pour stocker les images locales
  const [localImages, setLocalImages] = useState(
    Array.from({ length: initialImageCount }, () => null)
  );
  console.log("localImages:", localImages);

  const [loading, setLoading] = useState(false);

  // **************************** DELETE **************************** //
  const handleDeleteImage = (index) => {
    const updatedImages = [...localImages];
    updatedImages[index] = null;
    setLocalImages(updatedImages);
  };
  // Supprimer les images du stockage et de la base de données
  const deleteImagesFromStorage = async () => {
    try {
      setLoading(true);
  
      // Repérer les images originales qui ne sont pas présentes dans les nouvelles images locales
      const deletedImages = originalImages.filter(
        (imagePath) => !localImages.includes(imagePath)
      );
  
      // Supprimer chaque image du stockage Firebase
      await Promise.all(
        deletedImages.map(async (imagePath) => {
          const imageRef = ref(storage, imagePath);
          // Obtenir l'URL de téléchargement avant de supprimer l'image
          const downloadURL = await getDownloadURL(imageRef);
          await deleteObject(imageRef);
          console.log("Image supprimée avec succès :", downloadURL);
        })
      );
  
      setLoading(false);
      return deletedImages;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des images depuis Firebase Storage :",
        error
      );
      setLoading(false);
      return [];
    }
  };
  // **************************** UPLOAD **************************** //
  const handleChangeImage = (e, index) => {
    const updatedImages = [...localImages];
    updatedImages[index] = e.target.files[0];
    setLocalImages(updatedImages);
  };
  // Ajouter les nouvelles images à Firebase Storage et mettre à jour la base de données
  const addImagesToFirebaseStorage = async () => {
    try {
      setLoading(true);
      // Filtrer les nouvelles images
      const newImages = localImages.filter(
        (image) => !originalImages.includes(image)
      );
      console.log("newImages:", newImages);
      const uploadedImagePaths = await Promise.all(
        newImages.map(async (image) => {
          if (image?.name) {
            const uniqueId = uuidv4();
            const fileExtension = image.name.split(".").pop();
            const filePath = `products/secondary/${uniqueId}.${fileExtension}`;
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, image);
            return filePath;
          }
          return null;
        }) 
      );
      setLoading(false);
      // Filtrer les chemins d'accès uniques des images persistantes
      const uniqueOriginalImagePaths = originalImages.filter(
        (image) => typeof image === "string"
      );
      setLoading(false);
      return [...uniqueOriginalImagePaths, ...uploadedImagePaths]; 
    } catch (error) {
      console.error(
        "Erreur lors du chargement des images vers Firebase Storage :",
        error
      );
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    if (currentAction === "edit" && data?.images) {
      setOriginalImages(data.images);
      const fetchImagesFromStorage = async () => {
        try {
          setLoading(true);
          const imageURLs = await Promise.all(
            data.images.map(async (imagePath) => {
              if (!imagePath) return null;
              const url = await getDownloadURL(ref(storage, imagePath));
              return url;
            })
          );
          // Mettre à jour localImages en gardant le nombre total d'inputs
          const updatedImages = [...imageURLs];
          while (updatedImages.length < totalInputs) {
            updatedImages.push(null);
          }
          setLocalImages(updatedImages);
          setLoading(false);
        } catch (error) {
          console.error(
            "Erreur lors du chargement des images depuis Firebase Storage :",
            error
          );
          setLoading(false);
        }
      };

      fetchImagesFromStorage();
    }
  }, [currentAction, data?.images, totalInputs]);

  return {
    localImages,
    loading,
    handleChangeImage,
    handleDeleteImage,
    addImagesToFirebaseStorage,
    deleteImagesFromStorage,
  };
};

export default useImageManagement;
