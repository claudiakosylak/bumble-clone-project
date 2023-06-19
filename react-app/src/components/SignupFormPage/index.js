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
  const currentDate = new Date();
  let compareDate = currentDate
  compareDate.setFullYear(compareDate.getFullYear() - 18)
  let enteredDateConverted = new Date(dateOfBirth)
  const todayCompare = new Date(dateOfBirth)

  const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]


  useEffect(() => {
    const newErrors = {};
    const integers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    let phoneVal = false;
    for (let char of phone) {
      if (!integers.includes(char)) {
        phoneVal = true;
      }
    }

    let atCounter = 0;
    for (let char of email) {
      if (char === "@") {
        atCounter++;
      }
    }
    if (phone.length < 10 || phoneVal) newErrors.phone = "Please enter a valid 10 digit phone number with no special characters, starting with the area code."
    if (password !== confirmPassword) newErrors.password = "Confirm Password field must be the same as the Password field."
    if (password.length > 20) newErrors.password = "Please enter a password that is less than 20 characters long."
    if (!email.includes("@") || !email.includes(".") || atCounter > 1 || email.length === 0 || email.length > 50) newErrors.email = "Please enter a valid email address under 50 characters containing only one '@' and at least one '.'."
    if (!firstName) newErrors.firstName = "Please enter your first name."
    if (firstName.length > 20) newErrors.firstName = "Please enter a first name under 20 characters."
    if (!gender) newErrors.gender = "Please select a gender option."
    if (!lookingForGender) newErrors.lookingForGender = "Please select what gender(s) you are interested in."
    if (!state) newErrors.state = "Please enter your state."
    if (!city) newErrors.city = "Please enter your city."
    if (city.length > 30) newErrors.city = "Please enter a city name under 30 characters."
    if (enteredDateConverted > compareDate && todayCompare < currentDate) newErrors.dateOfBirth = "Sorry, only users over the age of 18 are allowed to use this website."
    if (todayCompare > currentDate) newErrors.dateOfBirth = "Please enter a valid birth date in the past."
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
    <p>All fields are required</p>
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
        {(hasSubmitted && errors.email) && (
          <p>{errors.email}</p>
        )}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {(hasSubmitted && errors.firstName) && (
          <p>{errors.firstName}</p>
        )}
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
        {(hasSubmitted && errors.gender) && (
          <p>{errors.gender}</p>
        )}
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
        {(hasSubmitted && errors.lookingForGender) && (
          <p>{errors.lookingForGender}</p>
        )}
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {(hasSubmitted && errors.city) && (
          <p>{errors.city}</p>
        )}
        <select value={state} onChange={(e) => setState(e.target.value)} required>
          State
          <option value ="" disabled>State</option>
            {states.map(state => (
              <option value={state} key={state}>{state}</option>
            ))}
        </select>
        {(hasSubmitted && errors.state) && (
          <p>{errors.state}</p>
        )}
        <label>
          Date of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        {(hasSubmitted && errors.dateOfBirth) && (
          <p>{errors.dateOfBirth}</p>
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
