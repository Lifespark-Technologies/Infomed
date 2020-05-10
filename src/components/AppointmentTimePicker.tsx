import React, { ChangeEvent } from "react";
import styles from "./AppointmentTimePicker.module.css";
import { AppointmentSlot } from "../apis/infomed";
import { format } from "date-fns";

interface AppointmentTimePickerProps {
  timeSlots: AppointmentSlot[];
  onChange?: (slot: AppointmentSlot) => void;
}

export default ({ timeSlots, onChange }: AppointmentTimePickerProps) => {
  const choices = [];
  const keyFor = (s: AppointmentSlot) => `${s.start.getTime()}-${s.end.getTime()}`;
  const formatTime = (d: Date) => format(d, 'HH:mm');

  // Note: this is not an accurate simulation of a "scroll to select" UI
  // pattern; it's possible, but a bit difficult to achieve, so let's implement
  // it later.
  return (
    <div>
      Pick time:
      <form className={styles.timePicker}>
        {timeSlots.map(timeSlot =>
          <label key={keyFor(timeSlot)} className={styles.timeLabel}>
            <input
              className={styles.timeRadio}
              name="timeSlot"
              type="radio"
              onChange={() => onChange?.(timeSlot)}
            />
            <div>{formatTime(timeSlot.start)} – {formatTime(timeSlot.end)}</div>
          </label>
        )}
      </form>
    </div>
  );
}