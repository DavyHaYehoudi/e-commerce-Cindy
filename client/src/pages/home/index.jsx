import React from "react";
import useAuthWrappers from "../../useAuthWrappers";
import useFetchData from "../../useFetchData";

const Home = () => {
  const { role: getRole, clientId: getClientId } = useAuthWrappers();
  const role = getRole();
  const clientId = getClientId();
  useFetchData({ role, clientId });
  return (
    <div>
      <h1>ACCUEIL</h1>
    </div>
  );
};

export default Home;
