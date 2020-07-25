import React, { useMemo } from "react";
import Calendar, { CalendarTileProperties, ViewCallbackProperties } from "react-calendar";
import { AppointmentSlot } from "../apis/infomed";
import { startOfDay } from "date-fns";

interface AppointmentDatePickerProps {
  availableSlots: AppointmentSlot[];
  startDate: Date;
  onStartDateChange?: (date: Date) => void;
  onDatePicked?: (date: Date) => void;
}

export default (
  {
    startDate,
    availableSlots,
    onDatePicked,
    onStartDateChange,
  }: AppointmentDatePickerProps
) => {
  const availableDays = useMemo(
    () => new Set(availableSlots.map(slot => startOfDay(slot.start).getTime())),
    [availableSlots]
  );

  const isTileDisabled = ({ date }: CalendarTileProperties) =>
    !availableDays.has(startOfDay(date).getTime());

  const onChange = (date: Date | Date[]) => {
    if (!onDatePicked) {
      return;
    }
    // date can be an array, but we expect it not to happen, since we don't
    // allow Calendar to support selecting ranges. Still, let's play safe.
    onDatePicked(date instanceof Array ? date[0] : date);
  };

  const onActiveStartDateChange = ({ activeStartDate }: ViewCallbackProperties) => {
    onStartDateChange?.(activeStartDate);
  };

  return (
    <div>
      <Calendar
        tileDisabled={isTileDisabled}
        activeStartDate={startDate}
        onChange={onChange}
        onActiveStartDateChange={onActiveStartDateChange}
      />
    </div>
  );
}