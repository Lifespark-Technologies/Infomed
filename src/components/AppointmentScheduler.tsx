import React, { useState, useEffect } from "react";
import AppointmentDatePicker from "./AppointmentDatePicker";
import { AppointmentSlot, fetchAppointmentSlots } from "../apis/infomed";

enum Stage { Loading, SelectDate, SelectTime };

export default () => {
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [stage, setStage] = useState(Stage.Loading);
  const [, setDatePicked] = useState(new Date());

  useEffect(() => {
    (async () => {
      const slots = await fetchAppointmentSlots('1', new Date(2020, 4, 1), new Date(2020, 6, 1));
      setAvailableSlots(slots);
      setStage(Stage.SelectDate);
    })();
  }, []);

  const pickDate = (date: Date) => {
    setDatePicked(date);
    setStage(Stage.SelectTime);
  };

  return (
    <>
      {stage === Stage.Loading &&
        <div>
          Loading
        </div>
      }
      {stage === Stage.SelectDate &&
        <div>
          Please select a date
          <AppointmentDatePicker availableSlots={availableSlots} onDatePicked={pickDate}/>
        </div>
      }
      {stage === Stage.SelectTime &&
        <div>
          Please select a time
        </div>
      }
    </>
  );
}