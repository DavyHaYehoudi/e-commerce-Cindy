import React from "react";
import SummaryDetails from "./SummaryDetails";

const Summary = ({ categoriesLinkedToCollection, collectionId }) => {
  return (
    <div className="summary">
      {categoriesLinkedToCollection &&
        categoriesLinkedToCollection.length > 0 &&
        categoriesLinkedToCollection.map((category) => (
          <SummaryDetails
            key={category?._id}
            category={category}
            collectionId={collectionId}
          />
        ))}
    </div>
  );
};

export default Summary;
