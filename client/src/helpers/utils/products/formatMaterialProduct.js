const formatMaterialProduct = (materialsData) => {
  return materialsData?.map((material) => ({
    _id: material?._id,
    pricing: {
      currentPrice: parseFloat(material?.pricing?.currentPrice),
      oldPrice: parseFloat(material?.pricing?.oldPrice),
    },
    promotion: {
      amount: parseFloat(material?.promo?.amount),
      startDate: material?.promo?.startDate
        ? new Date(material?.promo?.startDate).toISOString()
        : null,
      endDate: material?.promo?.endDate
        ? new Date(material?.promo?.endDate).toISOString()
        : null,
    },
    main_image: material?.main_image,
    untilNew: material?.newDate
      ? new Date(material?.newDate).toISOString()
      : new Date().toISOString(),
    stock: parseInt(material?.stock),
  }));
};

export default formatMaterialProduct;
