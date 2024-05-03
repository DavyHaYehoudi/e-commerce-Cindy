import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegistration from "./hooks/useRegistration";
import MoonLoader from "react-spinners/MoonLoader";

const Register = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    handleRegister,
    handleKeyPress,
    loading,
    messageResponse,
  } = useRegistration();
  return (
    <div className="authentication register-container">
      {loading ? (
        <div className="loader">
          <MoonLoader color="var(--dark)" />
          <p>Veuillez patienter...</p>
        </div>
      ) : (
        <>
          {" "}
          <h2>Inscription</h2>
          <form>
            {error && <p className="error-message">{error}</p>}
            <label>Prénom * :</label>
            <input
              type="text"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <label>Nom * :</label>
            <input
              type="text"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <label>Email * :</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            <label>
              <span>Mot de passe * :</span>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div
                  className="password-icon-container"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="password-icon" />
                  ) : (
                    <AiOutlineEye className="password-icon" />
                  )}
                </div>
              </div>
            </label>

            <label>
              <span>Confirmer le mot de passe * :</span>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <div
                  className="password-icon-container"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="password-icon" />
                  ) : (
                    <AiOutlineEye className="password-icon" />
                  )}
                </div>
              </div>
            </label>

            <button className="btn" type="button" onClick={handleRegister}>
              S'inscrire
            </button>

            <p>
              Vous avez déjà un compte ?{" "}
              <Link to="/account/login">
                <b>
                  <span className="underline">Connectez-vous ici</span>
                </b>{" "}
              </Link>
            </p>
          </form>
        </>
      )}
      {messageResponse && (
        <div className="modal">
          <div className="modal-content">
            <p>{messageResponse}</p>
            <p>Vous pouvez fermer cette page 👋</p>
          </div>
        </div>
      )}
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default Register;
