import React, { useState, useEffect } from "react";
import AppointmentDatePicker from "./AppointmentDatePicker";
import { AppointmentSlot, fetchAppointmentSlots, scheduleAppointment } from "../apis/infomed";
import AppointmentTimePicker from "./AppointmentTimePicker";
import { format, isSameDay, startOfMonth, addMonths } from "date-fns";
import { useParams } from "react-router-dom";
import OTPVerification from './OTPVerification';

/** 
 * Determines the stage of user's interaction with [[`AppointmentScheduler`]].
 */
enum Stage {
  /** Loading available slots from the server. */
  Loading,
  /** User is picking available date from the calendar. */
  SelectDate,
  /** User is picking available time slot within the selected date. */
  SelectTime,
  /** All set, showing confirmation screen. */
  Confirmed,
};

interface AppointmentSchedulerParams {
  hospitalId: string;
}

/**
 * Displays a UI that allows user to schedule an appointment by providing date,
 * time slot, and email. Available time slots are fetched from the server,
 * basing on [[`AppointmentSchedulerParams.hospitalId`]].
 */
export const AppointmentScheduler = ({ hospitalId }: AppointmentSchedulerParams) => {
  // Mutable control state.
  const [monthStartDate, setMonthStartDate] = useState(startOfMonth(new Date()));
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [stage, setStage] = useState(Stage.Loading);
  const [datePicked, setDatePicked] = useState(new Date());
  const [appointmentSlot, setAppointmentSlot] = useState<AppointmentSlot | null>(null);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  // This effect is responsible for fetching available appointment slots from
  // the server.
  useEffect(() => {
    (async () => {
      const slots = await fetchAppointmentSlots(
        hospitalId, monthStartDate, addMonths(monthStartDate, 1));
      setAvailableSlots(slots);
      setStage(Stage.SelectDate);
    })();
  }, [hospitalId, monthStartDate] /* Fetch whenever hospitalId or month change. */);

  // Switch to time slot selection once user picks date.
  const pickDate = (date: Date) => {
    setDatePicked(date);
    setStage(Stage.SelectTime);
  };

  // Once user confirms, schedule an appointment.
  const schedule = async () => {
    setShowModal(true);
    if (!appointmentSlot) {
      return;
    }
    //call this after otp verifiction
    await scheduleAppointment(hospitalId, appointmentSlot.id, email);
    setStage(Stage.Confirmed);
  }

  switch (stage) {
    case Stage.Loading: return (
      <div>
        Loading
      </div>
    );

    case Stage.SelectDate: return (
      <div>
        Please select a date
        <AppointmentDatePicker
          availableSlots={availableSlots}
          startDate={monthStartDate}
          onDatePicked={pickDate}
          onStartDateChange={setMonthStartDate}
        />
      </div>
    );
    case Stage.SelectTime: return (
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
        <OTPVerification show={showModal} onHide={() => setShowModal(false)} />
      </div>
    );

    case Stage.Confirmed: return (
      <div>
        Great, you’ve booked your appointment. A confirmation email has been send to you.
      </div>
    );
  }
}

export default () => {
  const { hospitalId } = useParams();
  return (
    <AppointmentScheduler hospitalId={hospitalId} />
  );
}