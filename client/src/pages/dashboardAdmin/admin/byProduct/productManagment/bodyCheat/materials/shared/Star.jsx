import React from "react";
import Switch from "./Switch";

const Star = ({ isFeaturedMaterial, handleSwitchChangeMaterial }) => {
  return (
    <div className="block">
      {isFeaturedMaterial ? (
        <p className="actived">Parution vedette</p>
      ) : (
        <p>Parution classique</p>
      )}
      <Switch
        checked={isFeaturedMaterial}
        onChange={() => handleSwitchChangeMaterial(!isFeaturedMaterial)}
      />
    </div>
  );
};

export default Star;
