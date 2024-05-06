import jwt from 'jsonwebtoken';
import Client from '../../models/client.model.js';

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] === "null") {
      return res.status(401).json({ message: "Token d'authentification manquant ou invalide." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.client = await Client.findById(decoded.clientId);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token d'authentification invalide." });
  }
};

export default authenticateJWT;
 