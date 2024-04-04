const formatMaterialProduct = (materialsData) => {
  return materialsData.map((material) => ({
    _id: material?._id,
    pricing: {
      currentPrice: parseFloat(material?.pricing.currentPrice),
      oldPrice: parseFloat(material?.pricing.oldPrice),
    },
    promotion: {
      amount: parseFloat(material?.promotion.amount),
      startDate: material?.promotion.startDate
        ? new Date(material?.promotion.startDate).toISOString()
        : null,
      endDate: material?.promotion.endDate
        ? new Date(material?.promotion.endDate).toISOString()
        : null,
    },
    main_image: material?.main_image,
    untilNew: material?.untilNew
      ? new Date(material?.untilNew).toISOString()
      : new Date().toISOString(),
    stock: parseInt(material?.stock),
  }));
};

export default formatMaterialProduct;
