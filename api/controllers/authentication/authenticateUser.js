const authenticateUser = async (req, res, next) => {
  const { client } = req;
  if(client.role==="admin"){
    return
  }
  if (client.role !== "user") {
    return res
      .status(401)
      .json({ message: "Accès refusé. Vous n'êtes pas autorisé." });
  }
  next();
};
export default authenticateUser;
