import React, { useState, useEffect } from 'react'
import HospitalDetailTop from './HospitalDetailTop'
import HospitalAdminDetail from './HospitalAdminDetail'
import AppointmentSchedule from './AppointmentSchedule'
import { fetchAppointmentSlots, AppointmentSlot } from '../apis/infomed'
import { startOfWeek, endOfWeek } from 'date-fns'
import { useParams } from 'react-router-dom'

interface HospitalAdminLandingPageProps {
  hospitalId: string
}

export const HospitalAdminLandingPage = ({ hospitalId }: HospitalAdminLandingPageProps) => {
  const [focusedDate, setFocusedDate] = useState(new Date())
  const [visibleSlots, setVisibleSlots] = useState<readonly AppointmentSlot[]>([])
  const onSmallCalendarDateChange = (date: Date | Date[]) => {
    setFocusedDate(date instanceof Date ? date : date[0])
  }

  useEffect(() => {
    (async () => {
      const start = startOfWeek(focusedDate);
      const end = endOfWeek(focusedDate);
      const slots = await fetchAppointmentSlots(hospitalId, start, end)
      setVisibleSlots(slots)
    })()
  }, [focusedDate])

  return (
    <div>
      <HospitalDetailTop />
      <HospitalAdminDetail onDateChange={onSmallCalendarDateChange} />
      <AppointmentSchedule date={focusedDate} appointmentSlots={visibleSlots} />
    </div>
  )
}

export default () => {
  const { hospitalId } = useParams();
  return (
    <HospitalAdminLandingPage hospitalId={hospitalId} />
  );
}