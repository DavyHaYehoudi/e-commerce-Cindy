import React from "react";
import useFetchStatsStorage from "../hooks/useFetchStatsStorage";
import calculatePercentage from "../utils/calculatePercentage";
import { formatSize } from "../utils/formatSize";
import { getColor } from "../utils/getColor";

const pathsProducts = ["products/secondary", "products/main"];
const pathAvatars = "avatars";
const pathCollections ="collections"
const pathCategories ="categories"
const ProductImages = () => {
  const { statsProducts, statsAvatars,statsCollections,statsCategories } = useFetchStatsStorage(
    pathsProducts,
    pathAvatars,
    pathCollections,
    pathCategories
  );
  const { totalImagesProducts, totalSizeProducts } = statsProducts;
  const { totalImagesAvatars, totalSizeAvatars } = statsAvatars;
  const {totalImagesCollections,totalSizeCollections}=statsCollections
  const {totalImagesCategories,totalSizeCategories}=statsCategories

  const totalImages = totalImagesProducts + totalImagesAvatars + totalImagesCollections +totalImagesCategories;
  const totalSize = totalSizeProducts + totalSizeAvatars +totalSizeCollections+totalSizeCategories;

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
        <strong>{totalImagesProducts}</strong>{" "}
        {` (${formatSize(totalSizeProducts)})`}
      </p>
      <p>
        Nombre total d'images des avatars :{" "}
        <strong>{totalImagesAvatars}</strong>{" "}
        {` (${formatSize(totalSizeAvatars)})`}
      </p>
      <p>
        Nombre total d'images des collections :{" "}
        <strong>{totalImagesCollections}</strong>{" "}
        {` (${formatSize(totalImagesCollections)})`}
      </p>
      <p>
        Nombre total d'images des catégories :{" "}
        <strong>{totalImagesCategories}</strong>{" "}
        {` (${formatSize(totalImagesCategories)})`}
      </p>
      <p>
        Nombre total d'images : <strong>{totalImages}</strong>
        {` (${formatSize(totalSize)})`}
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
