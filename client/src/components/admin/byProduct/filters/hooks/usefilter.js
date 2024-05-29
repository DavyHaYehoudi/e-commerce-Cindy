import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formattedDataProduct } from "../../utils/filter/formattedDataProduct";
import { fetchProduct } from "../../../../../features/admin/productSlice";

const useFilter = (setSearchBarValue) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [collectionSelected, setCollectionSelected] = useState("");
  const categoriesStore = useSelector((state) => state?.category?.data);
  const collectionsStore = useSelector((state) => state?.collection?.data);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  const handleValidation = () => {
    const { collection, categories, other } =
      formattedDataProduct(
        checkedItems,
        collectionSelected,
        categoriesStore,
        collectionsStore
      ) || {};

    dispatch(
      fetchProduct({
        collection,
        categories,
        others: other.join(","),
      })
    );
    setIsFilterOpen(false);
    setSearchBarValue("");
    setCollectionSelected("");
  };

  const handleReset = () => {
    setCheckedItems({});
    setCollectionSelected("");
    dispatch(fetchProduct());
  };

  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
    setCheckedItems({});
  };

  const isValidationButtonDisabled =
    !Object.values(checkedItems).some((value) => value === true) &&
    collectionSelected === "";

  const validationButtonClass = isValidationButtonDisabled
    ? "account-btn"
    : "account-btn validate-btn";

  return {
    checkedItems,
    isFilterOpen,
    collectionSelected,
    categoriesStore,
    collectionsStore,
    handleCheckboxChange,
    handleValidation,
    handleReset,
    toggleFilter,
    setCollectionSelected,
    setIsFilterOpen,
    isValidationButtonDisabled,
    validationButtonClass,
  };
};

export default useFilter;
