import React from "react";
import useRestoreItem from "./hooks/useRestoreItem";

const Archives = ({ store, parameter }) => {
  const handleRestore = useRestoreItem();

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
