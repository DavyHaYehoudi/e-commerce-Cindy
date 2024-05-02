import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { token } = useParams();

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const url = `${baseUrl}/${"auth/reset-password"}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, token }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
            } else {
                setError(data.message || "Une erreur s'est produite lors de la réinitialisation du mot de passe");
            }
        } catch (error) {
            setError("Une erreur s'est produite lors de la réinitialisation du mot de passe");
        }
    };

    if (success) {
        return <div>Mot de passe réinitialisé avec succès.</div>;
    }

    return (
        <div className='reset-password-container'>
            <h2>Réinitialisation du mot de passe</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder='Nouveau mot de passe'
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
                  placeholder='Confirmer le mot de passe'
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
            <button className="btn"  onClick={handleResetPassword}>Réinitialiser le mot de passe</button>
        </div>
    );
};

export default ResetPassword;
