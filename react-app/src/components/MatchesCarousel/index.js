import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMatchesThunk, getMatch } from "../../store/match";
import { useHistory } from "react-router-dom";
import styles from "./MatchesCarousel.module.sass";

function MatchesCarousel({ unMessagedMatches, isSmaller }) {
  const matchChunks = [];
  const dispatch = useDispatch();
  const history = useHistory();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const matches = [...unMessagedMatches];

  for (let i = 0; i < matches.length / 5; i++) {
    let group = [];
    for (let j = 0; j < 5; j++) {
      if (matches[i * 5 + j]) {
        group.push(matches[i * 5 + j]);
      }
    }
    matchChunks.push(group);
  }

  const lastGroup = matchChunks[matchChunks.length - 1];

  if (lastGroup && lastGroup.length < 5) {
    const extra = 5 - lastGroup.length;
    for (let i = 0; i < extra; i++) {
      lastGroup.push("");
    }
  }

  let carouselGroup = matchChunks[carouselIndex];

  const handleRight = () => {
    setCarouselIndex(carouselIndex + 1);
  };

  const handleLeft = () => {
    setCarouselIndex(carouselIndex - 1);
  };

  useEffect(() => {
    dispatch(getMatchesThunk());
  }, [dispatch]);

  const handlePicClick = async (match) => {
    await dispatch(getMatch(match));
    history.push("/app/connections");
  };

  return (
    <ul className={styles.wrapper}>
      {unMessagedMatches.length > 0 ? (
        <div className={styles.group}>
          {carouselIndex > 0 && (
            <button
              className={`${styles.buttons} ${styles.left}`}
              onClick={handleLeft}
            >
              <i className={`fa-solid fa-caret-left ${styles.caret}`}></i>
            </button>
          )}
            {carouselGroup.map((match, index) => (
              <li key={index} className={match ? styles.match : styles.empty}>
                {match ? (
                  <img
                    src={match.picture_1}
                    className={styles.image}
                    onClick={() => handlePicClick(match)}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg";
                    }}
                  ></img>
                ) : (
                  <div className={styles.image}></div>
                )}
              </li>
            ))}
          {carouselIndex < matchChunks.length - 1 && (
            <button
              className={`${styles.buttons} ${styles.right}`}
              onClick={() => handleRight()}
            >
              <i className={`fa-solid fa-caret-right ${styles.caret}`}></i>
            </button>
          )}
        </div>
      ) : (
        <div className={styles.full_group}>
            <p className={styles.no_matches}>You don't have any matches yet!</p>
        </div>
      )}
    </ul>
  );
}

export default MatchesCarousel;
