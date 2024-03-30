import { useState } from "react";

const useImageManagement = (initialImageCount) => {
  const [images, setImages] = useState(Array(initialImageCount).fill(null));

  const handleChangeImage = (index, imageData) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = imageData;
      return newImages;
    });
  };

  const handleChangeImagesSecondary = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Lit le contenu de l'image sélectionnée
    reader.onload = (event) => {
      const imageData = event.target.result;
      handleChangeImage(index, imageData);
    };

    // Lit le fichier en tant que URL de données
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return {
    images,
    handleChangeImagesSecondary,
  };
};

export default useImageManagement;
