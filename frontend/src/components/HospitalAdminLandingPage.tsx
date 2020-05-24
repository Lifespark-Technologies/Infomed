import React, { useState } from 'react'
import HospitalDetailTop from './HospitalDetailTop'
import HospitalAdminDetail from './HospitalAdminDetail'
import AppointmentSchedule from './AppointmentSchedule'

export default () => {
  const [focusedDate, setFocusedDate] = useState(new Date())
  const onSmallCalendarDateChange = (date: Date | Date[]) => {
    setFocusedDate(date instanceof Date ? date : date[0]);
  }

  return (
    <div>
      <HospitalDetailTop />
      <HospitalAdminDetail onDateChange={onSmallCalendarDateChange} />
      <AppointmentSchedule date={focusedDate} />
    </div>
  )
}