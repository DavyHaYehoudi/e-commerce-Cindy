import jwt from 'jsonwebtoken';

// Fonction pour générer un token JWT
const generateJWTToken = (client,isAdmin) => {
  const payload = {
    clientId: client._id, 
    email: client.email,
    role: isAdmin ? 'admin' : 'user'
  };

  // Génération du token avec une clé secrète et une expiration
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

export { generateJWTToken };
