import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PotentialMatchBrowse.css";
import { potentialMatchesThunk } from "../../store/match";
import { updateFiltersThunk } from "../../store/session";
import BrowseItem from "../BrowseItem";
import { ageChanger } from "../BrowseItem";
import { CircleSpinner } from "react-spinners-kit";


function PotentialMatchBrowse() {
    const potentialMatchesObj = useSelector(state => state.match.potentialMatches)
    const potentialMatchesArr = Object.values(potentialMatchesObj)
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);
    const [gender, setGender] = useState(user ? user.looking_for_gender : "Both")
    const [ageMin, setAgeMin] = useState(user ? user.age_min : 18)
    const [genderApplied, setGenderApplied] = useState(user ? user.looking_for_gender : "Both")
    const [ageMinApplied, setAgeMinApplied] = useState(user ? user.age_min : 18)
    const [ageMaxApplied, setAgeMaxApplied] = useState(user ? user.age_max : 99)
    const [ageMax, setAgeMax] = useState(user ? user.age_max : 99)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const filterRef = useRef();


    let filteredMatches = potentialMatchesArr.filter(match => {
        const age = ageChanger(match.date_of_birth)
        if (genderApplied === "Women") {
            return (match.gender === "Woman" && age >= ageMinApplied && age <= ageMaxApplied)
        } else if (genderApplied === "Men") {
            return (match.gender === "Man" && age >= ageMinApplied && age <= ageMaxApplied)
        } else if (genderApplied === "Both") {
            return ((match.gender === "Man" || match.gender === "Woman") && age >= ageMinApplied && age <= ageMaxApplied)
        } else if (genderApplied === "Nonbinary") {
            return (match.gender === "Nonbinary" && age >= ageMinApplied && age <= ageMaxApplied)
        } else {
            return age >= ageMinApplied && age <= ageMaxApplied;
        }
    })



    useEffect(() => {
        dispatch(potentialMatchesThunk())
    }, [dispatch])

    useEffect(() => {
        const newErrors = {}
        if (ageMin < 18) newErrors.ageMin = "Minimum age is 18."
        if (ageMin >= ageMax) newErrors.ageMax = "Minimum age must be lower than maximum age."
        if (ageMax > 99) newErrors.ageMax = "Maximum age is 99."
        if (ageMax <= ageMin) newErrors.ageMax = "Maximum age must be higher than minimum age."
        setErrors(newErrors)
    }, [ageMin, ageMax])

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

    const ulClassName = "filter-settings-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    const applyFilters = () => {
        dispatch(updateFiltersThunk(gender, ageMin, ageMax))
        setGenderApplied(gender)
        setAgeMinApplied(ageMin)
        setAgeMaxApplied(ageMax)
        closeMenu()
    }

    return (
        <div className="potential-match-browse-wrapper">
            <div className="browse-header">
                <h2 className="browse-view-logo">noFlake</h2>
            </div>
            <p onClick={openMenu} className="filter-button-open"><i class="fa-solid fa-sliders" id="fa-slider"></i>Filters</p>
            <div className={ulClassName} ref={filterRef}>
                <p>I'm interested in...</p>
                <div className="gender-button-holder">
                    <div className="white-back"></div>
                    <button className="gender-button" id={gender === "Women" ? "active-gender" : ""} onClick={() => setGender("Women")}>Women</button>
                    <button className="gender-button" id={gender === "Men" ? "active-gender" : ""} onClick={() => setGender("Men")}>Men</button>
                    <button className="gender-button" id={gender === "Both" ? "active-gender" : ""} onClick={() => setGender("Both")}>Both</button>
                    <button className="gender-button" id={gender === "Nonbinary" ? "active-gender" : ""} onClick={() => setGender("Nonbinary")}>Nonbinary</button>
                    <button className="gender-button" id={gender === "Open" ? "active-gender" : ""} onClick={() => setGender("Open")}>Open</button>
                </div>
                <p>Age</p>
                <div className="age-inputs">
                    <label>
                        Min
                        <input value={ageMin} type="number" min="18" max="98" onChange={(e) => setAgeMin(e.target.value)} />
                    </label>
                    <label>
                        Max
                        <input value={ageMax} type="number" min="19" max="99" onChange={(e) => setAgeMax(e.target.value)} />
                    </label>
                </div>
                {errors.ageMin && (
                    <p>{errors.ageMin}</p>
                )}
                {errors.ageMax && (
                    <p>{errors.ageMax}</p>
                )}
                <div className="filter-buttons">
                    <p onClick={closeMenu}>Cancel</p>
                    <button onClick={applyFilters}>Apply</button>
                </div>
            </div>
            {potentialMatchesArr.length === 0 ? (
                <div className="main-spinner-holder">

                    <CircleSpinner size={30} color="#80F" loading={potentialMatchesArr.length === 0} />
                </div>
            ) : (

                <BrowseItem browseUsers={filteredMatches} />
            )}
        </div>
    )
}

export default PotentialMatchBrowse;
