import React from "react";
import styles from "./AppointmentTimePicker.module.css";

export default () => {
  const choices = [];
  for (let i = 0; i < 24; i++) {
    choices.push(
      <label key={i} className={styles.timeLabel}>
        <input className={styles.timeRadio} name="timeSlot" type="radio" />
        <div>{i}:00 – {i}:59</div>
      </label>
    );
  }
  return (
    <div>
      Pick time:
      <form className={styles.timePicker}>
        {choices}
      </form>
    </div>
  )
}