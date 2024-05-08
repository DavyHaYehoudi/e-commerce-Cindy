const validateMaterialsFields = (productMaterials) => {
  const validateMaterials =
    productMaterials?.length > 0 &&
    productMaterials
      .map((material) => {
        const {
          main_image = null,
          pricing: { currentPrice = null } = {},
          stock = null,
        } = material;
        const allDefined =
          main_image !== null && currentPrice !== null && stock !== null;
        const allNull =
          main_image === null && currentPrice === null && stock === null;
        return allDefined || allNull;
      })
      .every((result) => result === true);

  return validateMaterials;
};
export default validateMaterialsFields