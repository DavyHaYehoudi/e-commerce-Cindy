import { materials } from "../../constants/materials";

export const getMaterialProperty = (materialId) => {
  const material = materials.find((material) => material.id === materialId);
  return material ;
};
