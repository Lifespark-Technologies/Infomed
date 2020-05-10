import React, { useState, useEffect } from "react";
import AppointmentDatePicker from "./AppointmentDatePicker";
import { AppointmentSlot, fetchAppointmentSlots, scheduleAppointment } from "../apis/infomed";
import AppointmentTimePicker from "./AppointmentTimePicker";
import { format, isSameDay } from "date-fns";
import { useParams } from "react-router-dom";

enum Stage { Loading, SelectDate, SelectTime, Confirmed };

interface AppointmentSchedulerParams {
  hospitalId: string;
}

export const AppointmentScheduler = ({ hospitalId }: AppointmentSchedulerParams) => {
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [stage, setStage] = useState(Stage.Loading);
  const [datePicked, setDatePicked] = useState(new Date());
  const [appointmentSlot, setAppointmentSlot] = useState<AppointmentSlot | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      // Fetch appointment slots from the server.
      // TODO(@bl-nero): Change dates along when user changes month in the calendar.
      const slots = await fetchAppointmentSlots(
        hospitalId, new Date(2020, 4, 1), new Date(2020, 6, 1));
      setAvailableSlots(slots);
      setStage(Stage.SelectDate);
    })();
  }, [hospitalId]);

  const pickDate = (date: Date) => {
    setDatePicked(date);
    setStage(Stage.SelectTime);
  };

  const schedule = async () => {
    if (!appointmentSlot) {
      return;
    }
    await scheduleAppointment(hospitalId, appointmentSlot.start, email);
    setStage(Stage.Confirmed);
  }

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
          <AppointmentDatePicker availableSlots={availableSlots} onDatePicked={pickDate} />
        </div>
      }

      {stage === Stage.SelectTime &&
        <div>
          <p>You’ve selected {format(datePicked, 'PPP')}</p>
          <p>Please select a time for your appointment</p>
          <AppointmentTimePicker
            timeSlots={availableSlots.filter(slot => isSameDay(datePicked, slot.start))}
            onChange={setAppointmentSlot}
          />
          <label>
            What’s your email address?
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <button disabled={!appointmentSlot || !email} onClick={schedule}>
            Done
          </button>
        </div>
      }

      {stage === Stage.Confirmed &&
        <div>
          Great, you’ve booked your appointment. A confirmation email has been send to you.
        </div>
      }
    </>
  );
}

export default () => {
  const { hospitalId } = useParams();
  return (
    <AppointmentScheduler hospitalId={hospitalId} />
  );
}