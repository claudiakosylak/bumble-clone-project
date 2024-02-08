import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PotentialMatchBrowse.module.sass";
import globalStyles from "../../global.module.sass";
import { potentialMatchesThunk } from "../../store/match";
import { updateFiltersThunk } from "../../store/session";
import BrowseItem from "../BrowseItem";
import { ageChanger } from "../BrowseItem";
import { CircleSpinner } from "react-spinners-kit";
import classnames from "classnames";
import MultiRangeSlider from "../MultiRangeSlider";

function PotentialMatchBrowse() {
  const potentialMatchesObj = useSelector(
    (state) => state.match.potentialMatches
  );
  const potentialMatchesArr = Object.values(potentialMatchesObj);
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [gender, setGender] = useState(user ? user.looking_for_gender : "Both");
  const [genderApplied, setGenderApplied] = useState(
    user ? user.looking_for_gender : "Both"
  );
  const [ageMin, setAgeMin] = useState(user ? user.age_min : 18);
  const [ageMinApplied, setAgeMinApplied] = useState(user ? user.age_min : 18);
  const [ageMaxApplied, setAgeMaxApplied] = useState(user ? user.age_max : 99);
  const [ageMax, setAgeMax] = useState(user ? user.age_max : 99);
  const dispatch = useDispatch();
  const filterRef = useRef();

  let filteredMatches = potentialMatchesArr.filter((match) => {
    const age = ageChanger(match.date_of_birth);
    if (genderApplied === "Women") {
      return (
        match.gender === "Woman" && age >= ageMinApplied && age <= ageMaxApplied
      );
    } else if (genderApplied === "Men") {
      return (
        match.gender === "Man" && age >= ageMinApplied && age <= ageMaxApplied
      );
    } else if (genderApplied === "Both") {
      return (
        (match.gender === "Man" || match.gender === "Woman") &&
        age >= ageMinApplied &&
        age <= ageMaxApplied
      );
    } else if (genderApplied === "Nonbinary") {
      return (
        match.gender === "Nonbinary" &&
        age >= ageMinApplied &&
        age <= ageMaxApplied
      );
    } else {
      return age >= ageMinApplied && age <= ageMaxApplied;
    }
  });

  useEffect(() => {
    dispatch(potentialMatchesThunk());
  }, [dispatch]);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = styles.filter_dropdown + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const applyFilters = () => {
    dispatch(updateFiltersThunk(gender, ageMin, ageMax));
    setGenderApplied(gender);
    setAgeMinApplied(ageMin);
    setAgeMaxApplied(ageMax);
    closeMenu();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div onClick={openMenu} className={styles.filter_button}>
          <i className={`fa-solid fa-sliders ${styles.slider}`}></i>Filters
        </div>
        <h2 className={styles.logo}>noFlake</h2>
      </div>
      <div className={ulClassName} ref={filterRef}>
        <p>I'm interested in...</p>
        <div className={styles.gender_wrapper}>
          <div className={styles.white_back}></div>
          <button
            className={`${styles.gender_button} ${
              gender === "Women" ? styles.gender_active : ""
            }`}
            onClick={() => setGender("Women")}
          >
            Women
          </button>
          <button
            className={`${styles.gender_button} ${
              gender === "Men" ? styles.gender_active : ""
            }`}
            onClick={() => setGender("Men")}
          >
            Men
          </button>
          <button
            className={`${styles.gender_button} ${
              gender === "Both" ? styles.gender_active : ""
            }`}
            onClick={() => setGender("Both")}
          >
            Both
          </button>
          <button
            className={`${styles.gender_button} ${
              gender === "Nonbinary" ? styles.gender_active : ""
            }`}
            onClick={() => setGender("Nonbinary")}
          >
            Nonbinary
          </button>
          <button
            className={`${styles.gender_button} ${
              gender === "Open" ? styles.gender_active : ""
            }`}
            onClick={() => setGender("Open")}
          >
            Open
          </button>
        </div>
        <p>Age</p>
        <MultiRangeSlider
          minVal={ageMin}
          maxVal={ageMax}
          setMinVal={setAgeMin}
          setMaxVal={setAgeMax}
        />
        <div className={styles.filter_buttons}>
          <div onClick={closeMenu}>Cancel</div>
          <button
            onClick={applyFilters}
            className={`${globalStyles.button} ${globalStyles.purple_button}`}
          >
            Apply
          </button>
        </div>
      </div>
      {potentialMatchesArr.length === 0 ? (
        <div className={styles.spinner}>
          <CircleSpinner
            size={30}
            color="#80F"
            loading={potentialMatchesArr.length === 0}
          />
        </div>
      ) : (
        <BrowseItem browseUsers={filteredMatches} />
      )}
    </div>
  );
}

export default PotentialMatchBrowse;
