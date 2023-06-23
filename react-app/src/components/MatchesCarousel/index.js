import React from "react";

function MatchesCarousel() {
    const matchChunks = [];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

    const matches = [...numbers]
    for (let i = 0; i < matches.length / 5; i+= 5) {
        let group = [];
        for (let j = 0; j < 5; j++) {
            if (matches[i * 5 + j]) {
                group.push(matches[i * 5 + j])
            }
        }
        matchChunks.push(group)
    }

    console.log("MATCH CHUNKS: ", matchChunks)

    return (
        <ul className="unmessaged-matches-wrapper">

        </ul>
    )
}

export default MatchesCarousel;
