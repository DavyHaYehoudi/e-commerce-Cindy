import React from "react";
import SummaryDetails from "./SummaryDetails";

const Summary = ({
  categoriesLinkedToCollection,
  productsLinkedToCollectionAndCategory,
}) => {
  return (
    <div className="summary">
      {categoriesLinkedToCollection &&
        categoriesLinkedToCollection.length > 0 &&
        categoriesLinkedToCollection
          .filter((category) => !category?.isArchived)
          .map((category) => (
            <SummaryDetails
              key={category?._id}
              category={category}
              productsLinkedToCollectionAndCategory={
                productsLinkedToCollectionAndCategory
              }
            />
          ))}
    </div>
  );
};

export default Summary;
