import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          {isLogin ? "Login to Nova Poshta" : "Register with Nova Poshta"}
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" required placeholder="Enter your full name" />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input type="email" required placeholder="Enter your email" />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input type="password" required placeholder="Enter your password" />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="auth-footer">
          <p>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button onClick={toggleForm} className="auth-toggle">
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
