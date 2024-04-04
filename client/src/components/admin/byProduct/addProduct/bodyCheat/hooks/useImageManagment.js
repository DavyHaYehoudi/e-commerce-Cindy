import { useState, useCallback } from "react";
import { storage } from "../../../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const useImageManagement = (initialImageCount) => {
  const [images, setImages] = useState(Array(initialImageCount).fill(null));
  const [loading, setLoading] = useState(false);

  // Fonction pour gérer le changement d'image
  const handleChangeImage = useCallback((index, filePath) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = filePath;
      return newImages;
    });
  }, []);

  // Fonction pour supprimer une image du state
  const handleDeleteImage = useCallback((index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null;
      return newImages;
    });
  }, []);

  const handleImageUpload = async (e, index) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();

    // Lit le contenu de l'image sélectionnée
    reader.onload = async (event) => {
      await uploadImageToFirebaseStorage(file, index);
      setLoading(false);
    };

    // Lit le fichier en tant que URL de données
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirebaseStorage = async (file, index) => {
    const uniqueId = uuidv4();
    const fileExtension = file.name.split(".").pop();
    const filePath = `products/secondary/${uniqueId}.${fileExtension}`;

    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, file);

    // Une fois l'image téléchargée, mettez à jour le state avec le chemin du fichier
    handleChangeImage(index, filePath);
  };

  const resetImages = () => {
    setImages(Array(initialImageCount).fill(null));
  };
  
  return {
    images,
    handleImageUpload,
    loading,
    handleDeleteImage,
    resetImages
  };
};

export default useImageManagement;
