import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lookingForGender, setLookingForGender] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [backendErrors, setBackendErrors] = useState([])

  useEffect(() => {
    const newErrors = {};
    const integers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    let phoneVal = false;
    for (let char of phone) {
      if (!integers.includes(char)) {
        phoneVal = true;
      }
    }
    if (phone.length < 10 || phoneVal) newErrors.phone = "Please enter a valid 10 digit phone number with no special characters, starting with the area code."
    if (password !== confirmPassword) newErrors.password = "Confirm Password field must be the same as the Password field."
    setErrors(newErrors)
  }, [firstName, phone, email, dateOfBirth, password, confirmPassword, lookingForGender, gender, state, city])

  if (sessionUser) return <Redirect to="/app" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    const errorsArr = Object.values(errors)
    if (errorsArr.length === 0) {
      const newUser = {
        first_name: firstName,
        phone,
        email,
        date_of_birth: dateOfBirth,
        password,
        looking_for_gender: lookingForGender,
        gender,
        state,
        city
      }
      const data = await dispatch(signUp(newUser));
      if (data) {
        setBackendErrors(data)
      }

    }

  };

  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form-container">
        <ul>
          {backendErrors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Phone Number
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        {(hasSubmitted && errors.phone) && (
          <p>{errors.phone}</p>
        )}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="" disabled>Gender</option>
          <option value="Woman">Woman</option>
          <option value="Man">Man</option>
          <option value="Nonbinary">Nonbinary</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={lookingForGender}
          onChange={(e) => setLookingForGender(e.target.value)}
          required
        >
          <option value="" disabled>Looking for:</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Both">Both</option>
          <option value="Nonbinary">Nonbinary</option>
          <option value="Open">Open</option>
        </select>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {(hasSubmitted && errors.password) && (
          <p>{errors.password}</p>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
