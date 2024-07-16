import { useSelector } from "react-redux";

const useInitDataMain = ({ action, productId, initialImageCount }) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);

  const initDataMain = () => {
    let data = {};

    if (action === "create") {
      data["name"] = "";
      data["collection"] = "";
      data["category"] = "";
      data["type"] = "";
      data["description"] = "";
      data["tags"] = [];
      data["images"] = Array(initialImageCount).fill(null);
    } else if (action === "edit") {
      const product = productsStore.find(
        (product) => product?._id === productId
      );
      const {
        name,
        _collection,
        category,
        type,
        main_description,
        tags,
        secondary_images,
        materials,
      } = product || {};

      //Concordances des tags
      const tagsMatch = tagsStore?.reduce((result, tag) => {
        if (tags?.some((tagId) => tag?._id === tagId)) {
          result.push(tag);
        }
        return result;
      }, []);
      data["name"] = name;
      data["collection"] = _collection;
      data["category"] = category;
      data["type"] = type;
      data["description"] = main_description;
      data["tags"] = tagsMatch;
      data["images"] = secondary_images;
      data["materials"] = materials;

      return data;
    }
  };
  return { initDataMain };
};

export default useInitDataMain;
