import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PotentialMatchBrowse.css";
import { potentialMatchesThunk } from "../../store/match";
import BrowseItem from "../BrowseItem";


function PotentialMatchBrowse() {
    const potentialMatchesObj = useSelector(state => state.match.potentialMatches)
    const potentialMatchesArr = Object.values(potentialMatchesObj)
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);
    const [gender, setGender] = useState(user ? user.looking_for_gender : "Both")
    const [ageMin, setAgeMin] = useState(18)
    const [ageMax, setAgeMax] = useState(99)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const filterRef = useRef();

    let filteredMatches = potentialMatchesArr.filter(match => {
        if (gender === "Women") {
            return match.gender === "Woman"
        } else if (gender === "Men") {
            return match.gender === "Man"
        } else if (gender === "Both") {
            return (match.gender === "Man" || match.gender === "Woman")
        } else if (gender === "Nonbinary") {
            return match.gender === "Nonbinary"
        } else {
            return true;
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

    return (
        <div className="potential-match-browse-wrapper">
            <div className="browse-header">
                <h1>noFlake</h1>
            </div>
            <p onClick={openMenu}>Filters</p>
            <div className={ulClassName} ref={filterRef}>
                <p>I'm interested in...</p>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Both">Both</option>
                    <option value="Nonbinary">Nonbinary</option>
                    <option value="Open">Open</option>
                </select>
                <p>Age</p>
                <div className="age-inputs">
                <label>
                Min
                <input value={ageMin} onChange={(e) => setAgeMin(e.target.value)} />
                </label>
                <label>
                Max
                <input value={ageMax} onChange={(e) => setAgeMax(e.target.value)} />
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
                    <button>Apply</button>
                </div>
            </div>
            <BrowseItem browseUsers={filteredMatches} />
        </div>
    )
}

export default PotentialMatchBrowse;
