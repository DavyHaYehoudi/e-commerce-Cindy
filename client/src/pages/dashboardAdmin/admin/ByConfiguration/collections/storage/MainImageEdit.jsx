import React, { useEffect } from "react";
import useIllustrationEdit from "../hooks/useIllustrationEdit";
import MoonLoader from "react-spinners/MoonLoader";
import { useDispatch } from "react-redux";
import { updateCollectionIdEdit } from "../../../../../../features/admin/collectionSlice";

const MainImageEdit = ({
  required,
  editable,
  collectionId,
  legend,
  setAddIllustrationToStorage,
  setRemoveIllustrationToStorage,
}) => {
  const { mainImageEdit, handleIllustrationEditChange, loading } =
    useIllustrationEdit({
      collectionId,
      setAddIllustrationToStorage,
      setRemoveIllustrationToStorage,
    });
  const dispatch = useDispatch();
  useEffect(() => {
    if (collectionId) {
      dispatch(updateCollectionIdEdit(collectionId));
    }
  }, [dispatch, collectionId]);
  return (
    <div className="main-image">
      <figure>
        <figcaption>
          {legend}
          {required ? <span className="asterix">*</span> : ""}
        </figcaption>
        <div className="images-wrapper">
          <label>
            <div className="image-container main_image">
              {loading ? (
                <div className="loader">
                  <MoonLoader color="var(--dark)" />
                </div>
              ) : mainImageEdit ? (
                typeof mainImageEdit === "string" ? (
                  <img src={mainImageEdit} alt="Chargement1..." />
                ) : (
                  <>
                    <img
                      src={URL.createObjectURL(mainImageEdit)}
                      alt="Chargement2..."
                    />
                  </>
                )
              ) : (
                <span>+</span>
              )}
              {editable && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleIllustrationEditChange(e)}
                />
              )}
            </div>
          </label>
        </div>
      </figure>
    </div>
  );
};

export default MainImageEdit;
