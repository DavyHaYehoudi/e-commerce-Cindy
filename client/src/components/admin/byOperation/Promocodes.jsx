import React from "react";
import PromocodesCard from "./PromocodesCard";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const Promocodes = () => {
const promocodes = useSelector(state=>state?.promocode?.data)

  return (
    <div className="promocodes">
      <div className="addPromocode card ">
        <span>
          <IoIosAddCircleOutline />
        </span>{" "}
      </div>
      {promocodes.map((promocode) => (
        <PromocodesCard key={promocode._id} promocode={promocode} />
      ))}
    </div>
  );
};

export default Promocodes;
