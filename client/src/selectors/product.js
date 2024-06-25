export const getProductProperties = (
  productsId,
  productStore,
  collectionStore,
  categoryStore,
  tagStore,
  materialId
) => {
  const product = productStore?.find((product) => product._id === productsId);

  if (product) {
    const {
      _id,
      _collection,
      category,
      tags,
      main_description,
      secondary_images,
      createdAt,
      updatedAt,
      name,
      materials,
    } = product;

    const collectionTitle = getPropertyById(
      collectionStore,
      _collection,
      "name"
    );
    const categoryName = getPropertyById(categoryStore, category, "name");
    const tagNames = getTagNamesByIds(tagStore, tags);

    const { main_image, pricing, untilNew, promotion, stock, isActive } =
      getDetailsProperty(materialId, materials) || {};

    return {
      _id,
      name,
      collection: collectionTitle,
      category: categoryName,
      tags: tagNames,
      main_description,
      materials,
      secondary_images,
      main_image,
      pricing,
      untilNew,
      promotion,
      stock,
      isActive,
      createdAt,
      updatedAt,
    };
  }

  return {};
};

function getPropertyById(objects, objectId, propertyName) {
  const object = objects.find((obj) => obj._id === objectId);
  return object ? object[propertyName] : "NC";
}
function getTagNamesByIds(tags, tagIds) {
  if (!tags) {
    return [];
  }

  return tags.filter((tag) => tagIds?.includes(tag._id)).map((tag) => tag.name);
}
function getDetailsProperty(materialId, materials) {
  const material = materials?.find((mat) => mat?._id === materialId);
  const { main_image, pricing, untilNew, promotion, stock, isActive } =
    material || {};
  return { main_image, pricing, untilNew, promotion, stock, isActive };
}
