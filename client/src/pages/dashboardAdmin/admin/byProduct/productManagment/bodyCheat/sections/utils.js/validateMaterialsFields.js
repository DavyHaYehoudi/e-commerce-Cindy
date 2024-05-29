const validateMaterialsFields = (productMaterials) => {
  //Pour chaque rangée, soit les propriétés obligatoires sont toutes remplies, soit toutes ne le sont pas.
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

      //Au moins une rangée doit être définie,et ce, avec les champs obligatoires valides.
  const hasDefinedMaterials = productMaterials?.some((material) => {
    const {
      main_image = null,
      pricing: { currentPrice = null } = {},
      stock = null,
    } = material;
    return main_image !== null && currentPrice !== null && stock !== null;
  });

  return validateMaterials && hasDefinedMaterials;
};
export default validateMaterialsFields;
