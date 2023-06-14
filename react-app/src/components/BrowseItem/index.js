import React from "react";
import "./BrowseItem.css";

const ageChanger = (dateOfBirth) => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear()
    let compareDate = new Date(dateOfBirth)
    const birthYear = compareDate.getFullYear()
    console.log("Bobbie's YEAR: ", birthYear)
    let compareAge = currentYear - birthYear;
    console.log("Bobbie's birthday: ", compareDate)
    compareDate.setFullYear(currentYear)
    if (compareDate > currentDate) {
        return compareAge - 1;
    } else {
        return compareAge;
    }
}

function BrowseItem({ browseUsers }) {
    return (
        <>
            {browseUsers.length > 0 && (
                <div className="browse-item-wrapper">
                    <div className="main-browse-picture">
                        <img src={browseUsers[0].picture_1}></img>
                    </div>
                    <div className="browse-item-right-side">
                        <p>{browseUsers[0].first_name}, {ageChanger(browseUsers[0].date_of_birth)}</p>

                    </div>
                </div>
            )}
        </>
    )
}

export default BrowseItem;
