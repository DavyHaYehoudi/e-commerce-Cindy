// import React from "react";

// const ProductsCard = ({ product }) => {
//   return (
//     <div className="card">
//       <div className="card-wrapper">
//         <img
//           src={product?.materials[0]?.main_image}
//           alt={product.name}
//         />
//         <p>{product?.name}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductsCard;


// import React, { useEffect, useState } from "react";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";

// const ProductsCard = ({ product }) => {
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     // Fonction pour récupérer l'URL de téléchargement de l'image depuis Firebase Storage
//     const getImageUrl = async () => {
//       const storage = getStorage();
//       const imageRef = ref(storage, product.materials[0].main_image); // Remplacez "main_image" par le chemin réel de votre image dans Firebase Storage
//       const url = await getDownloadURL(imageRef);
//       setImageUrl(url);
//     };

//     getImageUrl(); // Appeler la fonction pour récupérer l'URL de téléchargement de l'image
//   }, [product.materials]);

//   return (
//     <div className="card">
//       <div className="card-wrapper">
//         {imageUrl ? (
//           <img src={imageUrl} alt={product.name} />
//         ) : (
//           <p>Chargement de l'image...</p>
//         )}
//         <p>{product.name}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductsCard;


import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProductsCard = ({ product }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer l'URL de téléchargement de l'image depuis Firebase Storage
    const getImageUrlFromStorage = async (imagePath) => {
      const storage = getStorage();
      const imageRef = ref(storage, imagePath);
      try {
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Firebase Storage error:", error);
      }
    };

    // Vérifier si l'URL commence par "products/main"
    if (product?.materials[0]?.main_image?.startsWith("products/main")) {
      // Si oui, c'est une URL Firebase Storage
      getImageUrlFromStorage(product?.materials[0]?.main_image);
    } else {
      // Si non, c'est une URL directe, utilisez-la directement
      setImageUrl(product?.materials[0]?.main_image);
    }
  }, [product?.materials]);

  return (
    <div className="card">
      <div className="card-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={product?.name} />
        ) : (
          <p>Chargement de l'image...</p>
        )}
        <p>{product?.name}</p>
      </div>
    </div>
  );
};

export default ProductsCard;
