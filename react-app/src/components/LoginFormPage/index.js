import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import styles from "./LoginFormPage.module.sass";
import globalStyles from "../../global.module.sass";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  if (sessionUser) return <Redirect to="/app" />;

  const demoLogin = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <div className={globalStyles.login_wrapper}>
      <NavLink className={globalStyles.login_logo} to="/">
        <i className="fa-regular fa-snowflake"></i>
        <h1>noFlake</h1>
      </NavLink>
      <p className={globalStyles.login_subtext}>
        Welcome back! Please enter your credentials below.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          maxLength={50}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          maxLength={20}
        />
        {Object.values(errors).length > 0 && (
          <p className="errors">Invalid credentials</p>
        )}
        <button
          type="submit"
          className={`${globalStyles.button} ${globalStyles.purple_button}`}
        >
          Log In
        </button>
        <button
          onClick={demoLogin}
          className={`${globalStyles.button} ${styles.demo}`}
        >
          Demo User Login
        </button>
        <div className={globalStyles.login_switch}>
          Don't have an account?{" "}
          <NavLink to="/signup" className={globalStyles.login_switch_link}>
            Register here
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
