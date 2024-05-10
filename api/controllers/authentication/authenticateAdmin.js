const authenticateAdmin = async (req, res, next) => {
  const { client } = req;
  if (client?.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
  }
  next();
};

export default authenticateAdmin