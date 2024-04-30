import React from "react";
import useFetchStatsStorage from "../hooks/useFetchStatsStorage";
import calculatePercentage from "../utils/calculatePercentage";
import { formatSize } from "../utils/formatSize";
import { getColor } from "../utils/getColor";

const ProductImages = () => {
  const { statsProducts, statsAvatars } = useFetchStatsStorage(
    ["products/secondary", "products/main"],
    "avatars"
  );
  const { totalImagesProducts, totalSizeProducts } = statsProducts;
  const { totalImagesAvatars, totalSizeAvatars } = statsAvatars;

  const totalImages = totalImagesProducts + totalImagesAvatars;
  const totalSize = totalSizeProducts + totalSizeAvatars;

  const percentage = calculatePercentage(totalSize);

  const remainingSpace = 5 * 1024 * 1024 * 1024 - totalSize;
  const averageImageSize = totalImages > 0 ? totalSize / totalImages : 0;

  const estimatedRemainingImages = Math.floor(
    remainingSpace / averageImageSize
  );

  return (
    <div>
      <p>
        Nombre total d'images des produits :{" "}
        <strong>{totalImagesProducts}</strong> {` (${formatSize(totalSizeProducts)})`}
      </p>
      <p>
        Nombre total d'images des avatars :{" "}
        <strong>{totalImagesAvatars}</strong> {` (${formatSize(totalSizeAvatars)})`}
      </p>
      <p>
        Nombre total d'images : <strong>{totalImages}</strong>{` (${formatSize(totalSize)})`}
      </p>
      <p>
        Espace restant sur les 5 Go :{" "}
        <strong>{formatSize(remainingSpace)}</strong>{" "}
        {` (environ ${estimatedRemainingImages} images)`}
      </p>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            background: getColor(percentage),
            // width: `${95}%`,
            // background: getColor(95),
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProductImages;
