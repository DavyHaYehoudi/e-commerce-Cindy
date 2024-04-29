import React from "react";
import MainImage from "../../../../../../../shared/MainImage";
import { formatDate } from "../../../../../../../helpers/utils/formatDate";
import useLabelsDetails from "./hooks/useLabelsDetails";

const LabelsDetails = ({
  data,
  isNewChecked,
  newDate,
  handleNewDateChange,
  isPromoChecked,
  material,
  handleNewCheckboxChange,
  handlePromoChange,
  promo,
  handlePromoCheckboxChange,
  mainImage,
  handleMainImageChange,
  fileInputId,
  errorMessage,
  loading,
  handleDeleteImage,
  currentProductId,
}) => {
  const { promotion, untilNew, expiredDate } = useLabelsDetails(
    currentProductId,
    material?._id,
    data
  );
  return (
    <div className="labels-details">
      <div className="block1">
        <div className="main_image">
          <MainImage
            material={material}
            mainImage={mainImage}
            handleMainImageChange={handleMainImageChange}
            fileInputId={fileInputId}
            loading={loading}
            handleDeleteImage={handleDeleteImage}
            required={true}
            legend="Image principale"
          />
        </div>
        <div className="labels-details-wrapper">
          <div className="block">
            <input
              type="checkbox"
              id={`new-checkbox-${material?._id}`}
              checked={isNewChecked}
              onChange={handleNewCheckboxChange}
            />
            <label htmlFor={`new-checkbox-${material?._id}`}>Nouveau</label>
            {isNewChecked && (
              <div>
                <label htmlFor={`new-date-${material?._id}`}>
                  Nouveau jusqu'au :{" "}
                </label>
                <input
                  type="date"
                  className="account-input"
                  id={`new-date-${material?._id}`}
                  value={newDate || ""}
                  onChange={handleNewDateChange}
                />
              </div>
            )}
          </div>
          <div className="block">
            <input
              type="checkbox"
              id={`promo-checkbox-${material?._id}`}
              checked={isPromoChecked}
              onChange={handlePromoCheckboxChange}
            />
            <label htmlFor={`promo-checkbox-${material?._id}`}>Promotion</label>
            {isPromoChecked && (
              <div className="promotion">
                <div className="block">
                  <label htmlFor={`promo-start-date-${material?._id}`}>
                    Promotion du :{" "}
                  </label>
                  <input
                    type="date"
                    className="account-input"
                    id={`promo-start-date-${material?._id}`}
                    value={promo?.startDate || ""}
                    onChange={(e) => handlePromoChange(e, "startDate")}
                  />
                </div>
                <div className="block">
                  <label htmlFor={`promo-end-date-${material?._id}`}>
                    jusqu'au :{" "}
                  </label>
                  <input
                    type="date"
                    className="account-input"
                    id={`promo-end-date-${material?._id}`}
                    value={promo?.endDate || ""}
                    onChange={(e) => handlePromoChange(e, "endDate")}
                  />
                </div>
                <div className="block block2">
                  <label htmlFor={`promo-discount-${material?._id}`}>
                    Remise (%) :{" "}
                  </label>
                  <input
                    type="number"
                    className="account-input"
                    id={`promo-discount-${material?._id}`}
                    value={promo?.amount || ""}
                    onChange={(e) => handlePromoChange(e, "amount")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage} </p>}
      </div>
      <div className="block2">
        {untilNew && !expiredDate(untilNew) && (
          <p>
            <small>
              {" "}
              Actuellement, produit en nouveauté jusqu'au :{" "}
              <span>{formatDate(untilNew)}</span>{" "}
            </small>
          </p>
        )}
        {promotion && !expiredDate(promotion) && (
          <p>
            <small>
              {" "}
              Actuellement, produit en promotion jusqu'au :{" "}
              <span>{formatDate(promotion)}</span>{" "}
            </small>
          </p>
        )}
      </div>
    </div>
  );
};

export default LabelsDetails;
