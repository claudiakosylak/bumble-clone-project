import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  getMadeDateReportsThunk,
  makeGhostReportThunk,
} from "../../store/date_report";
import { getMatchesThunk, getOneMatchThunk } from "../../store/match";
import styles from "./ReportGhostModal.module.sass";
import globalStyles from "../../global.module.sass";

function ReportGhostModal({ match }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  // helper function to create the date report for ghosting and update the store with user's created reports
  const handleSubmit = async (e) => {
    await dispatch(makeGhostReportThunk(match.id));
    await dispatch(getMadeDateReportsThunk());
    // update current match to display new score
    await dispatch(getMatchesThunk());
    await dispatch(getOneMatchThunk(match.matchId));
    // close modal
    closeModal();
  };

  return (
    <div className={styles.wrapper}>
      <h3>Report {match.first_name} as a ghoster</h3>
      <p>Are you sure? <br></br><br></br>This action can't be undone.</p>
      <div className={styles.buttons}>
        <button onClick={handleSubmit} className={`${globalStyles.button} ${globalStyles.purple_button}`}>Yes, report ghosting - Boo!</button>
        <p onClick={closeModal} className={styles.cancel}>
          Cancel
        </p>
      </div>
    </div>
  );
}

export default ReportGhostModal;
