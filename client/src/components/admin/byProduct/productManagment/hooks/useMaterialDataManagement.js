import { useState } from "react";

const useMaterialDataManagement = (data) => {
  const initMaterialsData = data?.materials || [];
  const [materialsData, setMaterialsData] = useState(initMaterialsData);

  const addMaterialData = (newMaterialData) => {
    setMaterialsData((prevMaterialsData) => {
      const materialIndex = prevMaterialsData.findIndex(
        (material) => material?._id === newMaterialData._id
      );

      if (materialIndex !== -1) {
        const updatedMaterialsData = [...prevMaterialsData];
        updatedMaterialsData[materialIndex] = {
          ...updatedMaterialsData[materialIndex],
          ...newMaterialData,
        };
        return updatedMaterialsData;
      }
      return [...prevMaterialsData, newMaterialData];
    });
  };

  return { materialsData, addMaterialData, setMaterialsData };
};

export default useMaterialDataManagement;
