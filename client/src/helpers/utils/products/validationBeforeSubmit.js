export const validationBeforeSubmit=(fields,materials)=>{
    const validateFields = fields?.name && fields?.collection && fields?.category;
    const validateMaterials =
      materials?.length > 0 &&
      materials?.every(
        (material) => material?.main_image && material?.pricing?.currentPrice
      );
    const confirmationEnabled = validateFields && validateMaterials;
    return confirmationEnabled
}