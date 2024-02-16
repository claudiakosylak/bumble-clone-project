import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createDateRequestThunk, getDateRequestsThunk } from "../../store/date";
import styles from "./RequestDateModal.module.sass";
import globalStyles from "../../global.module.sass";

function RequestDateModal({ match }) {
  const { closeModal } = useModal();
  const [scheduleDay, setScheduleDay] = useState("");
  const [errors, setErrors] = useState({});
  const errorsArr = Object.values(errors);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const scheduleDate = new Date(scheduleDay);

  useEffect(() => {
    const newErrors = {};
    if (scheduleDate < currentDate)
      newErrors.past = "Please select a date in the future.";
    setErrors(newErrors);
  }, [scheduleDay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createDateRequestThunk(match.matchId, scheduleDay));
    dispatch(getDateRequestsThunk());
    closeModal();
  };

  return (
    <div className={styles.wrapper}>
      <h3>
        Request a date with {match.first_name}! We'll add it to your calendar
        once they confirm.
      </h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Select a date:
          <input
            type="datetime-local"
            value={scheduleDay}
            onChange={(e) => setScheduleDay(e.target.value)}
            required
          />
        </label>
        {errors.past && <p className="errors">{errors.past}</p>}
        <div className={styles.buttons}>
          <p onClick={closeModal} className={styles.cancel}>
            Cancel
          </p>
          <button
            type="submit"
            disabled={errorsArr.length > 0 || !scheduleDay}
            className={`${globalStyles.button} ${globalStyles.purple_button} ${(errorsArr.length > 0 || !scheduleDay) ? styles.disabled : ""}`}
          >
            Request Date
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestDateModal;
