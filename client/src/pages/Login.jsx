import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword] = useState(false);

  const handleLogin = () => {
    // Logique de connexion (à implémenter)
    console.log("Login with:", email, password);
  };

  return (
    <div className="login-container">
      <h2>{forgotPassword ? "Réinitialiser le mot de passe" : "Connexion"}</h2>
      <form>
        {!forgotPassword && (
          <>
            <label>Email * :</label>
            <input
              type="email"
              value={email}
              autoFocus
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>
              <span>Mot de passe * :</span>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to="/account/forgot-password" style={{color:"blue"}} >Mot de passe oublié ?</Link>
            </label>


            <button type="button" className="btn" onClick={handleLogin}>
              Se connecter
            </button>
            <div className="link-to-register">
              Vous n'avez pas de compte ?{" "}
              <Link to="/account/register"><b><u>Inscrivez-vous</u> </b></Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Login;
