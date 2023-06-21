import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const newErrors = {}
    if (password.length > 20) newErrors.password = "Password must be less than 20 characters"
    if (email.length > 50) newErrors.password = "Email must be less than 50 characters long"
    setErrors(newErrors)
  }, [password, email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    console.log("DATA: ", data)
    if (data) {
      const newErrors = {}
      if (data.email[0]) {
        newErrors.email = data.email[0]
      }
      if (data.password[0]) {
        newErrors.password = data.password[0]
      }
      setErrors(newErrors);
    }
  };

  if (sessionUser) return <Redirect to="/app" />;

  const demoLogin = async () => {
    await dispatch(login("demo@aa.io", "password"))
  }

  return (
    <div className="login-form-wrapper">
      <NavLink className="signup-logo-wrapper" to="/">
        <i class="fa-regular fa-snowflake"></i>
        <h1>noFlake</h1>
      </NavLink>
      <p>Welcome back! Please enter your credentials below.</p>
      <form onSubmit={handleSubmit} className="login-form">

        {/* Email */}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />

        {errors.email && (
          <p>{errors.email}</p>
        )}


        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {errors.password && (
          <p>{errors.password}</p>
        )}
        <button type="submit" className="login-submit">Log In</button>
        <button onClick={demoLogin} className="demo-login">Demo User Login</button>
        <p>Don't have an account? <NavLink to="/signup" className="register-here">Register here</NavLink></p>
      </form>
    </div>
  );
}

export default LoginFormPage;
