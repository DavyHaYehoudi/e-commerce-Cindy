export const getProductProperties = (productsId, state) => {
  const product = state?.find((product) => product._id === productsId);

  if (product) {
    const {
      id,
      reference,
      category,
      releaseDate,
      name,
      main_image,
      main_description,
      materials,
      promotion,
      pricing,
      stock,
      ratings,
      options,
      tags,
      isNew,
    } = product;

    return {
      id,
      reference,
      category,
      releaseDate,
      name,
      main_image,
      main_description,
      materials,
      promotion,
      pricing,
      stock,
      ratings,
      options,
      tags,
      isNew,
    };
  }

  return {};
};
