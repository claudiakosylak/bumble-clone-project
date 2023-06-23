import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MatchesCarousel.css";
import { getMatchesThunk, getMatch } from "../../store/match";
import { useHistory } from "react-router-dom";

function MatchesCarousel({unMessagedMatches}) {
    const matchesObj = useSelector(state => state.match.currentMatches)
    const matchesArr = [...unMessagedMatches]
    const matchChunks = [];
    const dispatch = useDispatch()
    const history = useHistory();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    const [carouselIndex, setCarouselIndex] = useState(0);
    const matches = [...matchesArr]
    for (let i = 0; i < matches.length / 5; i++) {
        let group = [];
        for (let j = 0; j < 5; j++) {
            if (matches[i * 5 + j]) {
                group.push(matches[i * 5 + j])
            }
        }
        matchChunks.push(group)
    }

    let carouselGroup = matchChunks[carouselIndex]

    console.log("MATCH CHUNKS: ", matchChunks)
    console.log("CAROUSEL INDEX: ", carouselIndex)
    console.log("CAROUSEL GROUP: ", carouselGroup)

    const handleRight = () => {
        setCarouselIndex(carouselIndex + 1)
    }

    const handleLeft = () => {
        setCarouselIndex(carouselIndex -1)
    }

    useEffect(() => {
        dispatch(getMatchesThunk())
    }, [dispatch])

    const handlePicClick = async (match) => {
        await dispatch(getMatch(match))
        history.push("/app/connections")
    }

    return (
        <ul className="unmessaged-matches-carousel">
            {matchesArr.length > 0 ? (

                <div className={carouselGroup.length === 5 ? "inner-wrapper-left-carousel" : "last-group-carousel-wrapper"}>

            {carouselIndex > 0 && (
                <button className="left-carousel-button carousel-buttons" onClick={handleLeft}><i class="fa-solid fa-caret-left" id="left-carousel-caret"></i></button>
                )}
            {matchesArr.length > 0 && carouselGroup.map(match => (
                <li key={match.id} className="scroll-match-item" id={carouselGroup.length < 5 ? "last-match-group" : ""}><img src={match.picture_1} className="mini-match-icons" onClick={() => handlePicClick(match)}
                onError={e => { e.currentTarget.src = "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg" }}
                ></img></li>
                ))}
            {carouselIndex < matchChunks.length - 1 && (
                <button className="right-carousel-button carousel-buttons" onClick={() => handleRight()}><i class="fa-solid fa-caret-right" id="left-carousel-caret"></i></button>
                )}
                </div>
                ) : (
                    <div className="inner-wrapper-left-carousel">
                        <p>You don't have any matches yet!</p>
                    </div>
                )}
        </ul>
    )
}

export default MatchesCarousel;
