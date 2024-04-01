// import { useState } from "react";

// const useImageManagement = (initialImageCount) => {
//   const [images, setImages] = useState(Array(initialImageCount).fill(null));

//   const handleChangeImage = (index, imageData) => {
//     setImages((prevImages) => {
//       const newImages = [...prevImages];
//       newImages[index] = imageData;
//       return newImages;
//     });
//   };

//   const handleMainImageUpload = (e, index) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     // Lit le contenu de l'image sélectionnée
//     reader.onload = (event) => {
//       const imageData = event.target.result;
//       handleChangeImage(index, imageData);
//     };

//     // Lit le fichier en tant que URL de données
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return {
//     images,
//     handleMainImageUpload,
//   };
// };

// export default useImageManagement;

import { useState, useCallback } from "react";

const useImageManagement = (initialImageCount) => {
  const [images, setImages] = useState(Array(initialImageCount).fill(null));

  // Fonction pour gérer le changement d'image
  const handleChangeImage = useCallback((index, imageData) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = imageData;
      return newImages;
    });
  }, []);

  const handleMainImageUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // Lit le contenu de l'image sélectionnée
    reader.onload = (event) => {
      const imageData = event.target.result;
      handleChangeImage(index, imageData); // Appel de la fonction handleChangeImage
    };

    // Lit le fichier en tant que URL de données
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return {
    images,
    handleMainImageUpload,
  };
};

export default useImageManagement;
