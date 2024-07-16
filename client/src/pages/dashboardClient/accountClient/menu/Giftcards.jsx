import React from "react";
import { useSelector } from "react-redux";
import Giftcard from "./Giftcard";

const Giftcards = () => {
  const giftcards = useSelector((state) => state?.customer?.data?.giftcard);
  return (
    <div className="advantages">
      <ul>
        {giftcards && giftcards.length > 0 ? (
          giftcards.map((card) => <Giftcard key={card._id} card={card} />)
        ) : (
          <p style={{ textAlign: "center" }}>Aucune carte cadeau</p>
        )}{" "}
      </ul>
    </div>
  );
};

export default Giftcards;
