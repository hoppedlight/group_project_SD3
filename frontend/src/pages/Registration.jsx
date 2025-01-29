import React, { useState } from "react";
import "./AuthForm.css";

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ full_name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "http://localhost:8000/login/" : "http://localhost:8000/register/";
    
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { full_name: formData.full_name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="mainContainer">
        <div className="header-line">
          <h1>{isLogin ? "Login to Nova Poshta" : "Register with Nova Poshta"}</h1>
        </div>
        <h2 className="title">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label className="label">Full Name</label>
              <input
                className="input"
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}
          <div className="form-group">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="loginButton button active">
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>
        <div className="button-group">
          <p>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button onClick={toggleForm} className="regButton button">
              {isLogin ? "Register here" : "Login here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
