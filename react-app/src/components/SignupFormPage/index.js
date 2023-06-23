import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage() {
  const dispatch = useDispatch();
  const genderRef = useRef();
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
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [backendErrors, setBackendErrors] = useState([])
  const [showGenderMenu, setShowGenderMenu] = useState(false);
  const [showLookingMenu, setShowLookingMenu] = useState(false);
  const currentDate = new Date();
  let compareDate = currentDate
  compareDate.setFullYear(compareDate.getFullYear() - 18)
  let enteredDateConverted = new Date(dateOfBirth)
  const todayCompare = new Date(dateOfBirth)

  const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]



  const openGenderMenu = () => {
    if (showGenderMenu) return;
    setShowGenderMenu(true);
  }

  useEffect(() => {
    if (!showGenderMenu) return;

    const closeGenderMenu = (e) => {
      if (genderRef.current && !genderRef.current.contains(e.target)) {
        setShowGenderMenu(false);
      }
    };

    document.addEventListener("click", closeGenderMenu);

    return () => document.removeEventListener("click", closeGenderMenu);
  }, [showGenderMenu]);

  const genderClassName = "gender-settings-dropdown" + (showGenderMenu ? "" : " hidden");
  const closeGenderMenu = () => setShowGenderMenu(false);

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
    if (imageUrl.length > 255) newErrors.imageLength = "Please enter an image url under 255 characters."
    if ((imageUrl.slice(imageUrl.length - 4) !== ".jpg" && imageUrl.slice(imageUrl.length - 4) !== ".png" && imageUrl.slice(imageUrl.length - 5) !== ".jpeg")) newErrors.imageEnding = "Please enter an image url ending in .jpg, .png or .jpeg"
    if ((imageUrl.slice(0, 7) !== "http://" && imageUrl.slice(0, 8) !== "https://")) newErrors.imageBeginning = "Please enter an image url beginning with 'http://' or 'https://' "

    setErrors(newErrors)
  }, [firstName, phone, email, dateOfBirth, password, confirmPassword, lookingForGender, gender, state, city, imageUrl])

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
        city,
        picture_1: imageUrl
      }
      const data = await dispatch(signUp(newUser));
      if (data) {
        setBackendErrors(data)
      }

    }

  };

  return (
    <div className="signup-wrapper">
      <NavLink className="signup-logo-wrapper" to="/">
        <i class="fa-regular fa-snowflake"></i>
        <h1>noFlake</h1>
      </NavLink>
      <p className="enter-info-text">Enter your information to get started!</p><br></br>
      <p>All fields are required</p>
      <form onSubmit={handleSubmit} className="signup-form-container">
        {/* <ul>
          {backendErrors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <div className="signup-form-top">

          <div className="signup-form-left">

            <label>
              {/* Phone Number */}
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your number"
                required
              />
            </label>
            {(hasSubmitted && errors.phone) && (
              <p>{errors.phone}</p>
            )}
            <label>
              {/* Email */}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </label>
            {(hasSubmitted && errors.email) && (
              <p>{errors.email}</p>
            )}
            <label>
              {/* First Name */}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="What is your first name?"
                required
              />
            </label>
            {(hasSubmitted && errors.firstName) && (
              <p>{errors.firstName}</p>
            )}
            <label>
              <p className="dob-label">Enter date of birth</p>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Enter your date of birth"
                required
              />
            </label>
            {(hasSubmitted && errors.dateOfBirth) && (
              <p>{errors.dateOfBirth}</p>
            )}
            <label>
              {/* Password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </label>
            <label>
              {/* Confirm Password */}
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </label>
            {(hasSubmitted && errors.password) && (
              <p>{errors.password}</p>
            )}
          </div>
          <div className="signup-form-right">
            <button onClick={openGenderMenu}>{gender || "Gender"}</button>
            {/* <p>{gender}</p> */}
              <ul className={genderClassName} ref={genderRef} onClick={closeGenderMenu}>
                <li onClick={() => setGender("Woman")}>Woman</li>
                <li onClick={() => setGender("Man")}>Man</li>
                <li onClick={() => setGender("Nonbinary")}>Nonbinary</li>
                <li onClick={() => setGender("Other")}>Other</li>
              </ul>
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
              {/* City */}
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                required
              />
            </label>
            {(hasSubmitted && errors.city) && (
              <p>{errors.city}</p>
            )}
            <select value={state} onChange={(e) => setState(e.target.value)} required>
              {/* State */}
              <option value="" disabled>State</option>
              {states.map(state => (
                <option value={state} key={state}>{state}</option>
              ))}
            </select>
            {(hasSubmitted && errors.state) && (
              <p>{errors.state}</p>
            )}

            <label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Provide a profile picture url"
                required
              />
            </label>
            {(hasSubmitted && errors.imageLength) && (
              <p>{errors.imageLength}</p>
            )}
            {(hasSubmitted && errors.imageEnding) && (
              <p>{errors.imageEnding}</p>
            )}
            {(hasSubmitted && errors.imageBeginning) && (
              <p>{errors.imageBeginning}</p>
            )}

          </div>
        </div>
        <div className="signup-form-bottom">

          <button type="submit">Sign Up</button>
          <p>Already have an account? <NavLink to="/login" className="login-switch">Log in here</NavLink></p>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
