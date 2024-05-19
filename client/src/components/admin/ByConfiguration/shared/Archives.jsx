import React from "react";
import { useDispatch } from "react-redux";
import { updateCollection } from "../../../../features/admin/collectionSlice";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";
import { updateCategory } from "../../../../features/admin/categorySlice";

const Archives = ({ store, parameter }) => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const handleRestore = (id, parameter) => {
    const formData = { isArchived: false };
    switch (parameter) {
      case "collection":
        dispatch(
          updateCollection({
            collectionId:id,
            formData,
            restore: true,
            handleUnauthorized,
          })
        );
        break;
      case "catégorie":
        dispatch(
          updateCategory({
            categoryId:id,
            formData,
            restore: true,
            handleUnauthorized,
          })
        );
        break;
      default:
        console.log("Erreur dans le switch de handleRestore");
    }
  };
  return (
    <div className="archives-container">
      {store && store.length > 0 && (
        <ul>
          {store
            .filter((element) => element?.isArchived)
            .map((item) => (
              <li>
                <span>{item?.name} </span>
                <button
                  className="account-btn"
                  onClick={() => handleRestore(item?._id, parameter)}
                >
                  Restaurer
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Archives;
