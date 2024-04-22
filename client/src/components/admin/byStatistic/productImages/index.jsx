import React from "react";
import useFetchStatsStorage from "../hooks/useFetchStatsStorage";
import calculatePercentage from "../utils/calculatePercentage";
import { formatSize } from "../utils/formatSize";
import { getColor } from "../utils/getColor";

const paths = ["products/secondary", "products/main"];
const ProductImages = () => {
  const { totalImages, totalSize } = useFetchStatsStorage(paths);
  const percentage = calculatePercentage(totalSize);

  return (
    <div>
      <p>
        Nombre total d'images : <strong>{totalImages}</strong>{" "}
      </p>
      <p>
        Taille totale des images : {formatSize(totalSize)} soit{" "}
        <strong className="in" style={{ color: getColor(percentage) }}>
          {percentage}%
        </strong>{" "}
        de l'espace de stockage disponible (5 GB).{" "}
      </p>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            background: getColor(percentage),
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProductImages;
