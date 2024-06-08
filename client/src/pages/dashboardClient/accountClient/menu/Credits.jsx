import React from "react";
import { useSelector } from "react-redux";
import Credit from "./Credit";

const Credits = () => {
  const creditsStore = useSelector((state) => state?.customer?.data?.credit);
  return (
    <div className="advantages">
      <ul>
        {creditsStore.map((credit) => (
          <Credit key={credit._id} credit={credit} />
        ))}{" "}
      </ul>
    </div>
  );
};

export default Credits;
