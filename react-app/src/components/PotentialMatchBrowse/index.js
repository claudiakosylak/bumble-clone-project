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

function PotentialMatchBrowse() {
  const potentialMatchesObj = useSelector(
    (state) => state.match.potentialMatches
  );
  const potentialMatchesArr = Object.values(potentialMatchesObj);
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [gender, setGender] = useState(user ? user.looking_for_gender : "Both");
  const [ageMin, setAgeMin] = useState(user ? user.age_min : 18);
  const [genderApplied, setGenderApplied] = useState(
    user ? user.looking_for_gender : "Both"
  );
  const [ageMinApplied, setAgeMinApplied] = useState(user ? user.age_min : 18);
  const [ageMaxApplied, setAgeMaxApplied] = useState(user ? user.age_max : 99);
  const [ageMax, setAgeMax] = useState(user ? user.age_max : 99);
  const [errors, setErrors] = useState({});
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  const dispatch = useDispatch();
  const filterRef = useRef();
  const min = 18;
  const max = 99;

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(ageMin);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [ageMin, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(ageMax);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [ageMax, getPercent]);

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

  useEffect(() => {
    const newErrors = {};
    if (ageMin < 18) newErrors.ageMin = "Minimum age is 18.";
    if (ageMin >= ageMax)
      newErrors.ageMax = "Minimum age must be lower than maximum age.";
    if (ageMax > 99) newErrors.ageMax = "Maximum age is 99.";
    if (ageMax <= ageMin)
      newErrors.ageMax = "Maximum age must be higher than minimum age.";
    setErrors(newErrors);
  }, [ageMin, ageMax]);

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
        <div className="multi-range-slider-container">
          <input
            type="range"
            min={min}
            max={max}
            value={ageMin}
            ref={minValRef}
            onChange={(event) => {
              const value = Math.min(+event.target.value, ageMax - 1);
              setAgeMin(value);
              event.target.value = value.toString();
            }}
            className={classnames("thumb thumb--zindex-3", {
              "thumb--zindex-5": ageMin > max - 100,
            })}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={ageMax}
            ref={maxValRef}
            onChange={(event) => {
              const value = Math.max(+event.target.value, ageMin + 1);
              setAgeMax(value);
              event.target.value = value.toString();
            }}
            className="thumb thumb--zindex-4"
          />
          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            <div className="slider__left-value">{ageMin}</div>
            <div className="slider__right-value">{ageMax}</div>
          </div>
        </div>
        {errors.ageMin && <p>{errors.ageMin}</p>}
        {errors.ageMax && <p>{errors.ageMax}</p>}
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
