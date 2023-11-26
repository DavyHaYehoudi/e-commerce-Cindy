import React from "react";
import TrackingField from "../../../../../../shared/TrackingField";
import TrackingFieldAdmin from "./TrackingFieldAdmin";
import TrackingFieldClient from "./TrackingFieldClient";

const TrackingFieldMain = ({
  trackingNumberList,
  products,
  clientId,
  orderId,
  trackingNumberAdmin,
  handleTrackingNumberAdminChange,
  sendTrackingNumberDate,
}) => {
  return (
    <div className="trackingFieldMain-Container">
      <p>Ajouter un numéro de suivi</p>
      <TrackingField
        trackingNumber={trackingNumberAdmin}
        handleTrackingNumberChange={handleTrackingNumberAdminChange}
        sendTrackingNumberDate={sendTrackingNumberDate}
        isAdmin={true}
      />
      {(trackingNumberList ?? []).length > 0 &&
        trackingNumberList.map((item) =>
          item.isAdmin ? (
            <TrackingFieldAdmin
              key={item.id}
              trackingNumberListItem={item}
              products={products}
              clientId={clientId}
              orderId={orderId}
              trackingNumber={trackingNumberAdmin}
              handleTrackingNumberChange={handleTrackingNumberAdminChange}
              sendTrackingNumberDate={sendTrackingNumberDate}
              isAdmin={true}
            />
          ) : (
            <TrackingFieldClient trackingNumberListItem={item} />
          )
        )}
      <div></div>
    </div>
  );
};

export default TrackingFieldMain;
