export const getProductProperties = (productId, state) => {
  const product = state?.find((product) => product.id === productId);

  if (product) {
    const {
      id,
      reference,
      category,
      releaseDate,
      name,
      image,
      description,
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
      image,
      description,
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
