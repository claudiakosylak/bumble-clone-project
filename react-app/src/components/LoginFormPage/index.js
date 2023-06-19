import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && (
          <p>{errors.email}</p>
        )}
        <label>

          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p>{errors.password}</p>
        )}
        <button type="submit">Log In</button>
        <button onClick={demoLogin}>Demo User Login</button>
      </form>
    </>
  );
}

export default LoginFormPage;
