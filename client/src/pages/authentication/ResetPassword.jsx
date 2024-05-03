import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import useResetPassword from "./hooks/useResetPassword";

const ResetPassword = () => {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleResetPassword,
    navigate,
  } = useResetPassword();

  if (success) {
    return (
      <div className="authentication">
        <div className="modal">
          <div className="modal-content">
            <p>
              ✅ Votre mot de passe a été réinitialisé avec succès 😃 !<br />
            </p>
            <button className="login-button" onClick={() => navigate("/account/login")}>
              SE CONNECTER
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2>Réinitialisation du mot de passe</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Nouveau mot de passe"
          required
          onChange={(e) => setPassword(e.target.value)}
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
      <div className="password-input">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          placeholder="Confirmer le mot de passe"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
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
      <button className="btn" onClick={handleResetPassword}>
        Réinitialiser le mot de passe
      </button>
    </div>
  );
};

export default ResetPassword;
