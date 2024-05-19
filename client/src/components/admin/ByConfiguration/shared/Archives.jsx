import React from "react";
import { useDispatch } from "react-redux";
import { updateCollection } from "../../../../features/admin/collectionSlice";
import useUnauthorizedRedirect from "../../../../services/errors/useUnauthorizedRedirect";

const Archives = ({ store, parameter }) => {
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const handleRestore = (collectionId, parameter) => {
    const formData = { isArchived: false };
    switch (parameter) {
      case "collection":
        dispatch(
          updateCollection({
            collectionId,
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
