import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductList from "../components/smarts/ProductList";

const ForTheDay = () => {
  const [list, setList] = useState([]);
  const getList = async () => {
    const listData = await axios.get(
      "https://fakestoreapiserver.reactbd.com/products/"
    );
    setList(listData.data);
    console.log('listData:', listData)
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div id="forTheDay">
      <h1>FOR THE DAY</h1>
      <div className="collectionList">
        {list.map((item) => (
          <ProductList item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default ForTheDay;
