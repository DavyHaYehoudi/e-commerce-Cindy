import React from "react";
import { useSelector } from "react-redux";
import Giftcard from "./Giftcard";

const Giftcards = () => {
  const giftcards = useSelector((state) => state?.customer?.data?.giftcard);
  return (
    <div className="advantages">
      <ul>
        {giftcards.map((card) => (
          <Giftcard key={card._id} card={card} />
        ))}{" "}
      </ul>
    </div>
  );
};

export default Giftcards;
