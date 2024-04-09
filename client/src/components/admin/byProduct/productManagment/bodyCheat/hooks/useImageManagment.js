import { useState, useCallback } from "react";
import { storage } from "../../../../../../firebase";
import { ref, uploadBytes, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const useImageManagement = ({ data, currentAction, initialImageCount }) => {
  const defaultImages = Array(initialImageCount).fill(null);
  const initImages = data?.images ? 
  [...data.images, ...Array(initialImageCount - data.images.length).fill(null)] :
  defaultImages;
  const [images, setImages] = useState(initImages);
  console.log("images:", images);
  const [loading, setLoading] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  console.log("deletedImages:", deletedImages);
  const [editedImages, setEditedImages] = useState(images);
  console.log("editedImages:", editedImages);
  // **************************** DELETE **************************** //

  const handleDeleteImage = useCallback(
    (index) => {
      // En mode "create", supprimer localement l'image du state
      if (currentAction === "create") {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = null;
          return newImages;
        });
      } else if (currentAction === "edit") {
        setDeletedImages((prevDeletedImages) => [...prevDeletedImages, index]);
        setEditedImages((prev) => prev.filter((image, i) => i !== index));
      }
    },
    [currentAction]
  );

  // Supprimer les images de Firebase Storage lorsque les changements sont enregistrés
  const deleteImagesFromStorage = async () => {
    try {
      await Promise.all(
        deletedImages.map(async (index) => {
          const filePath = images[index];
          if (filePath) {
            const storageRef = ref(storage, filePath);
            await deleteObject(storageRef);
          }
        })
      );
      setImages([]);
      setDeletedImages([]);
    } catch (error) {
      console.error("Erreur lors de la suppression des images :", error);
    }
  };

  // **************************** UPLOAD **************************** //

  const handleImageUpload = async (e, index) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    // Lit le contenu de l'image sélectionnée
    reader.onload = async (event) => {
      handleChangeImage(index, file);
      setLoading(false);
    };
    // Lit le fichier en tant que URL de données
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = useCallback((index, filePath) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = filePath;
      return newImages;
    });
  }, []);

  // Fonction pour ajouter les images à Firebase Storage uniquement lorsque les changements sont enregistrés
  const addImagesToFirebaseStorage = async () => {
    try {
      setLoading(true);
      const uploadedImagePaths = await Promise.all(
        images
          ?.map(async (image) => {
            if (image) {
              const uniqueId = uuidv4();
              const fileExtension = image.name.split(".").pop();
              const filePath = `products/secondary/${uniqueId}.${fileExtension}`;
              const storageRef = ref(storage, filePath);
              await uploadBytes(storageRef, image);
              return filePath;
            }
            return null;
          })
          .map((promise) => promise.catch(() => null)) // Gérer les erreurs pour chaque promesse
      );
      setLoading(false);
      return uploadedImagePaths.filter((path) => path !== null);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des images vers Firebase Storage :",
        error
      );
      setLoading(false);
    }
  };

  return {
    images,
    editedImages,
    loading,
    handleImageUpload,
    handleDeleteImage,
    addImagesToFirebaseStorage,
    deleteImagesFromStorage,
  };
};

export default useImageManagement;
