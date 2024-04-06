import { useSelector } from "react-redux";

const useInitData = ({ action, _id, initialImageCount }) => {
  const productsStore = useSelector((state) => state?.product?.data);
  const tagsStore = useSelector((state) => state?.tag?.data);

  const initData = () => {
    let data = {};

    if (action === "create") {
      data["name"] = "";
      data["collection"] = "";
      data["category"] = "";
      data["description"] = "";
      data["tags"] = [];
      data["images"] = Array(initialImageCount).fill(null);
      //Materials properties :
      data["stock"] = 1;
      data["currentPrice"] = 0;
      data["oldPrice"] = 0;
      data["newDate"] = "";
      data["amount"] = 0;
      data["startDate"] = "";
      data["endDate"] = "";
      data["mainImage"] = null;
    } else if (action === "edit") {
      const product = productsStore.find((product) => product?._id === _id);
      const { name, _collection, category, main_description, tags, images } =
        product || {};
      //Concordances des tags
      const tagsMatch = tagsStore?.reduce((result, tag) => {
        if (tags?.some((tagId) => tag?._id === tagId)) {
          result.push(tag);
        }
        return result;
      }, []);

      //Concordances avec materials

      const {
        stock,
        currentPrice,
        oldPrice,
        newDate,
        amount,
        startDate,
        endDate,
        main_image,
      } = product?.materials || {};
      data["name"] = name;
      data["collection"] = _collection;
      data["category"] = category;
      data["description"] = main_description;
      data["tags"] = tagsMatch;
      data["images"] = images;
      //Materials properties :
      data["stock"] = stock;
      data["currentPrice"] = currentPrice;
      data["oldPrice"] = oldPrice;
      data["newDate"] = newDate;
      data["amount"] = amount;
      data["startDate"] = startDate;
      data["endDate"] = endDate;
      data["mainImage"] = main_image;
    }
    return data;
  };

  return { initData };
};

export default useInitData;
