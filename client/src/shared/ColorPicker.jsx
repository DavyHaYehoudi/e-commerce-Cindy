import React from "react";

const ColorPicker = ({
  materialsStore,
  handleMaterialSelected,
  materialsProductId,
  materialName,
}) => {
  const handleColorClick = ({ materialId }) => {
    const materialSelectedIndex = materialsProductId.findIndex(
      (material) => material?._id === materialId
    );
    handleMaterialSelected({
      id: materialId,
      index: materialSelectedIndex,
      currentImage: materialsProductId[materialSelectedIndex]?.main_image,
    });
  };

  return (
    <div className="color-picker">
      {materialsProductId &&
        materialsStore
          .filter((ms) => materialsProductId.some((mp) => mp?._id === ms?._id))
          .map((material) => (
            <div
              key={material?._id}
              className={`color-option ${
                material?.name === materialName ? "selected" : ""
              }`}
              style={{ backgroundColor: material?.value }}
              onClick={() =>
                handleColorClick({
                  color: material?.name,
                  materialId: material?._id,
                })
              }
            ></div>
          ))}
    </div>
  );
};

export default ColorPicker;
