import { useState, useEffect } from "react";
import { storage } from "../../../../../../firebase";
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import {getPathFromStorageUrl} from "../utils/getPathsStorage"
import { generateFilePath } from "../utils/generateFilePath";

const useImageManagement = ({ data, currentAction, initialImageCount }) => {
  const totalInputs =
    currentAction === "create"
      ? initialImageCount
      : Math.max(initialImageCount, data?.images?.length || 0);
  // State pour stocker les images originales en mode "edit"
  const [originalImages, setOriginalImages] = useState([]);
  // State pour stocker les images locales
  const [localImages, setLocalImages] = useState(
    Array.from({ length: initialImageCount }, () => null)
  );
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
      // Convertir les chemins originaux en URLs Firebase Storage
      const originalImagesUrls = await Promise.all(
        originalImages.map(async (imagePath) => {
          const imageRef = ref(storage, imagePath);
          return await getDownloadURL(imageRef);
        })
      );
      // Repérer les URLs des images originales qui ne sont pas présentes dans les nouvelles images locales
      const deletedImagesUrls = originalImagesUrls.filter(
        (imageUrl) => !localImages.includes(imageUrl)
      );

      // Supprimer chaque image du stockage Firebase
      await Promise.all(
        deletedImagesUrls.map(async (imageUrl) => {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        })
      );

      setLoading(false);
      // Fonction pour retrouver le chemin du stockage à partir d'une URL
      // function getPathFromStorageUrl(url) {
      //   const pathPart = url.split(
      //     "firebasestorage.googleapis.com/v0/b/noralyapreprod.appspot.com/o/"
      //   )[1];
      //   const path = pathPart.split("?")[0];
      //   const decodedPath = decodeURIComponent(path.replace(/\+/g, " "));
      //   return decodedPath;
      // }
      // Fonction pour retrouver les chemins du stockage à partir d'un tableau d'URLs
      function getPathsFromStorageUrls(urls) {
        return urls.map(getPathFromStorageUrl);
      }
      const storagePaths = getPathsFromStorageUrls(deletedImagesUrls);
      console.log("storagePaths:", storagePaths);
      return storagePaths;
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des images depuis Firebase Storage :",
        error
      );
      setLoading(false);
      return [];
    }
  };
  const deleteAllImagesFromStorage=async()=>{
    try {
      await Promise.all(
        originalImages.map(async (imageUrl) => {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        })
      );
    } catch (error) {
      console.log('Erreur dans deleteAllImagesFromStorage :',error);
    }
  }
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
      const uploadedImagePaths = await Promise.all(
        newImages.map(async (image) => {
          if (image?.name) {
            // Si image type file et non url
            // const uniqueId = uuidv4();
            // const fileExtension = image.name.split(".").pop();
            // const filePath = `products/secondary/${uniqueId}.${fileExtension}`;
            const filePath = generateFilePath(image,"products/secondary/")
            const storageRef = ref(storage, filePath);
            await uploadBytes(storageRef, image);
            return filePath;
          }
        })
      );
      setLoading(false);
      //Filtrer les nouveaux paths à stocker dans la DB
      const imagePathsToDB = uploadedImagePaths.filter((image) =>
        Boolean(image)
      );
      //Récupérer les paths déjà stockés dans la DB
      const imagePathsInDB =
        data?.images.filter((image) => Boolean(image)) || [];

      setLoading(false);
      return [...imagePathsInDB, ...imagePathsToDB];
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
    deleteAllImagesFromStorage
  };
};

export default useImageManagement;
