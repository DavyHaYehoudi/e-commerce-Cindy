export const getMaterialProperty = (materialId, state) => {
  const material = state?.find((material) => material._id === materialId);

  return material;
};
 