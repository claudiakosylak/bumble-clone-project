import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import globalStyles from "../../global.module.sass";
import styles from "./SignupFormPage.module.sass";

function SignupFormPage() {
  const dispatch = useDispatch();
  const genderRef = useRef();
  const lookingRef = useRef();
  const stateRef = useRef();
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
  const [showGenderMenu, setShowGenderMenu] = useState(false);
  const [showLookingMenu, setShowLookingMenu] = useState(false);
  const [showStateMenu, setShowStateMenu] = useState(false);
  const currentDate = new Date();
  let compareDate = currentDate;
  compareDate.setFullYear(compareDate.getFullYear() - 18);
  let enteredDateConverted = new Date(dateOfBirth);

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // helper functions to open custom dropdown menus
  const openGenderMenu = () => {
    if (showGenderMenu) return;
    setShowGenderMenu(true);
  };

  const openLookingMenu = () => {
    if (showLookingMenu) return;
    setShowLookingMenu(true);
  };

  const openStateMenu = () => {
    if (showStateMenu) return;
    setShowStateMenu(true);
  };

  // use effects to control click on dropdown refs

  useEffect(() => {
    if (!showStateMenu) return;

    const closeStateMenu = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setShowStateMenu(false);
      }
    };

    document.addEventListener("click", closeStateMenu);

    return () => document.removeEventListener("click", closeStateMenu);
  }, [showStateMenu]);

  const stateClassName =
    `${styles.dropdown_list} ${styles.state_dropdown}` +
    (showStateMenu ? "" : " hidden");
  const closeStateMenu = () => setShowStateMenu(false);

  useEffect(() => {
    if (!showLookingMenu) return;

    const closeLookingMenu = (e) => {
      if (lookingRef.current && !lookingRef.current.contains(e.target)) {
        setShowLookingMenu(false);
      }
    };

    document.addEventListener("click", closeLookingMenu);

    return () => document.removeEventListener("click", closeLookingMenu);
  }, [showLookingMenu]);

  const lookingClassName =
    styles.dropdown_list + (showLookingMenu ? "" : " hidden");
  const closeLookingMenu = () => setShowLookingMenu(false);

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

  const genderClassName =
    styles.dropdown_list + (showGenderMenu ? "" : " hidden");
  const closeGenderMenu = () => setShowGenderMenu(false);

  useEffect(() => {
    const newErrors = {};
    const integers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
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
    if (phone.length < 10 || phoneVal)
      newErrors.phone =
        "Please enter a valid 10 digit phone number with no special characters, starting with the area code.";
    if (password !== confirmPassword)
      newErrors.password =
        "Confirm Password field must be the same as the Password field.";
    if (password.length > 20)
      newErrors.password =
        "Please enter a password that is less than 20 characters long.";
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      atCounter > 1 ||
      email.length === 0 ||
      email.length > 50
    )
      newErrors.email =
        "Please enter a valid email address under 50 characters containing only one '@' and at least one '.'.";
    if (!firstName) newErrors.firstName = "Please enter your first name.";
    if (firstName.length > 20)
      newErrors.firstName = "Please enter a first name under 20 characters.";
    if (!gender) newErrors.gender = "Please select a gender option.";
    if (!lookingForGender)
      newErrors.lookingForGender =
        "Please select what gender(s) you are interested in.";
    if (!state) newErrors.state = "Please enter your state.";
    if (!city) newErrors.city = "Please enter your city.";
    if (city.length > 30)
      newErrors.city = "Please enter a city name under 30 characters.";
    if (enteredDateConverted > compareDate)
      newErrors.dateOfBirth =
        "Sorry, only users over the age of 18 are allowed to use this website.";

    setErrors(newErrors);
  }, [
    firstName,
    phone,
    email,
    dateOfBirth,
    password,
    confirmPassword,
    lookingForGender,
    gender,
    state,
    city,
  ]);

  if (sessionUser) return <Redirect to="/app" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const errorsArr = Object.values(errors);
    if (errorsArr.length === 0) {
      const formData = new FormData();
      formData.append("picture_1", imageUrl);
      formData.append("first_name", firstName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("date_of_birth", dateOfBirth);
      formData.append("password", password);
      formData.append("looking_for_gender", lookingForGender);
      formData.append("gender", gender);
      formData.append("state", state);
      formData.append("city", city);

      const data = await dispatch(signUp(formData));
    }
  };

  return (
    <div
      className={
        window.innerWidth > 639 ? globalStyles.login_wrapper : styles.wrapper
      }
    >
      <NavLink className={globalStyles.login_logo} to="/">
        <i className="fa-regular fa-snowflake"></i>
        <h1>noFlake</h1>
      </NavLink>
      <p className={globalStyles.login_subtext}>
        Enter your information to get started!
        <br></br>
        <br></br>
        All fields are required
      </p>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        enctype="multipart/form-data"
      >
        <div className={styles.form_top}>
          <div className={styles.form_half}>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your number"
              required
              className={styles.input}
            />
            {hasSubmitted && errors.phone && (
              <p className="errors">{errors.phone}</p>
            )}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className={styles.input}
            />
            {hasSubmitted && errors.email && (
              <p className="errors">{errors.email}</p>
            )}
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="What is your first name?"
              required
              className={styles.input}
            />
            {hasSubmitted && errors.firstName && (
              <p className="errors">{errors.firstName}</p>
            )}
            <div className={styles.dob}>
              {!dateOfBirth && (
                <p className={styles.dob_label}>Enter date of birth</p>
              )}
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Enter your date of birth"
                required
                className={styles.input}
              />
            </div>
            {hasSubmitted && errors.dateOfBirth && (
              <p className="errors">{errors.dateOfBirth}</p>
            )}
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className={styles.input}
              />
            </label>
            <label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                className={styles.input}
              />
            </label>
            {hasSubmitted && errors.password && (
              <p className="errors">{errors.password}</p>
            )}
          </div>
          <div className={styles.form_half}>
            <div className={styles.dropdown_wrapper}>
              <div className={styles.dropdown_button} onClick={openGenderMenu}>
                <div>{gender || "Gender"}</div>
                {!showGenderMenu ? (
                  <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
                ) : (
                  <i className={`fa-solid fa-caret-up ${styles.caret}`}></i>
                )}
              </div>
              <ul
                className={genderClassName}
                ref={genderRef}
                onClick={closeGenderMenu}
              >
                <li onClick={() => setGender("Woman")}>Woman</li>
                <li onClick={() => setGender("Man")}>Man</li>
                <li onClick={() => setGender("Nonbinary")}>Nonbinary</li>
                <li onClick={() => setGender("Other")}>Other</li>
              </ul>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="hidden"
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="Woman">Woman</option>
                <option value="Man">Man</option>
                <option value="Nonbinary">Nonbinary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {hasSubmitted && errors.gender && (
              <p className="errors">{errors.gender}</p>
            )}
            <div className={styles.dropdown_wrapper}>
              <div className={styles.dropdown_button} onClick={openLookingMenu}>
                <p>{lookingForGender || "Looking for"}</p>
                {!showLookingMenu ? (
                  <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
                ) : (
                  <i className={`fa-solid fa-caret-up ${styles.caret}`}></i>
                )}
              </div>
              <ul
                className={lookingClassName}
                ref={lookingRef}
                onClick={closeLookingMenu}
              >
                <li onClick={() => setLookingForGender("Women")}>Women</li>
                <li onClick={() => setLookingForGender("Men")}>Men</li>
                <li onClick={() => setLookingForGender("Both")}>Both</li>
                <li onClick={() => setLookingForGender("Nonbinary")}>
                  Nonbinary
                </li>
                <li onClick={() => setLookingForGender("Open")}>Open</li>
              </ul>
              <select
                value={lookingForGender}
                className="hidden"
                onChange={(e) => setLookingForGender(e.target.value)}
              >
                <option value="" disabled>
                  Looking for:
                </option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Both">Both</option>
                <option value="Nonbinary">Nonbinary</option>
                <option value="Open">Open</option>
              </select>
            </div>
            {hasSubmitted && errors.lookingForGender && (
              <p className="errors">{errors.lookingForGender}</p>
            )}
            <label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                required
                className={styles.input}
              />
            </label>
            {hasSubmitted && errors.city && (
              <p className="errors">{errors.city}</p>
            )}
            <div className={styles.dropdown_wrapper}>
              <div className={styles.dropdown_button} onClick={openStateMenu}>
                <p>{state || "State"}</p>
                {!showStateMenu ? (
                  <i className={`fa-solid fa-caret-down ${styles.caret}`}></i>
                ) : (
                  <i className={`fa-solid fa-caret-up ${styles.caret}`}></i>
                )}
              </div>
              <ul
                className={stateClassName}
                ref={stateRef}
                onClick={closeStateMenu}
              >
                {states.map((state) => (
                  <li key={state} onClick={() => setState(state)}>
                    {state}
                  </li>
                ))}
              </ul>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="hidden"
              >
                <option value="" disabled>
                  State
                </option>
                {states.map((state) => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            {hasSubmitted && errors.state && (
              <p className="errors">{errors.state}</p>
            )}

            <label>
              Please upload a profile picture:
              <div className={styles.picture_upload_wrapper}>
                <input
                  type="file"
                  className={styles.picture_upload_field}
                  accept="image/*"
                  onChange={(e) => setImageUrl(e.target.files[0])}
                  required
                />
              </div>
            </label>
          </div>
        </div>
        <div className={styles.form_bottom}>
          <button
            type="submit"
            className={`${globalStyles.button} ${globalStyles.purple_button}`}
          >
            Sign Up
          </button>
          <div className={globalStyles.login_switch}>
            Already have an account?{" "}
            <NavLink to="/login" className={globalStyles.login_switch_link}>
              Log in here
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
