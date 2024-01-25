import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../components/search/ProductList";

const Tab = () => {
  const { tab } = useParams();
  const [list, setList] = useState([]);
  const getList = async () => {
    const listData = await axios.get(
      `https://fakestoreapiserver.reactbd.com/products/`
      // `https://fakestoreapiserver.reactbd.com/productsByOrder/${tab}`
    );
    setList(listData.data);
    console.log("ici la data :",listData.data);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div id="tabPage">
      <h1>{tab} </h1>
      <div className="collectionList">
        {list.map((item) => (
          <ProductList item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Tab;
