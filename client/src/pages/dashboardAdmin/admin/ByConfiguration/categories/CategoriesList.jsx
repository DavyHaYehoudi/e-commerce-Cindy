import React from "react";
import CategoryItem from "./CategoryItem";

const CategoriesList = ({ categoriesStore, collectionsStore, ...props }) => {
  // Filtrer les catégories sur lesquelles appliquer la méthode map
  const filteredCategories = categoriesStore?.filter(
    (category) =>
      // Vérifier si aucune collection avec cet _id n'est archivée dans collectionsStore
    !category.parentCollection.some((collectionId) =>
      collectionsStore.some(
        (collection) =>
          collection._id === collectionId && collection.isArchived
      )
    )
  );

  return (
    <ul>
      {filteredCategories?.filter((category) => !category?.isArchived).map((category) => (
        <CategoryItem
          key={category?._id}
          category={category}
          collectionsStore={collectionsStore}
          {...props}
        />
      ))}
    </ul>
  );
};

export default CategoriesList;
