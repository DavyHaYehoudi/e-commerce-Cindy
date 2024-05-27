import React from "react";
import useAuthWrappers from "../useAuthWrappers";
import useFetchData from "../useFetchData";

const Home = () => {
  const { role: getRole } = useAuthWrappers();
  const role = getRole();
  useFetchData(role);
  return (
    <div>
      <h1>ACCUEIL</h1>
    </div>
  );
};

export default Home;
