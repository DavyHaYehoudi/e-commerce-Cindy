import React, { useState } from 'react';
import bo from "../../assets/bo.png"
import bra from "../../assets/bra.png"
import bar from "../../assets/bar.png"
import col from "../../assets/col.png"

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [bo,bra,bar,col];

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  return (
    <div className="image-carousel">
      <button onClick={handlePrev} disabled={currentImage === 0}>Précédent</button>
      <img src={images[currentImage]} alt="" />
      <button onClick={handleNext} disabled={currentImage === images.length - 1}>Suivant</button>
    </div>
  );
};

export default ImageCarousel;
