import React from 'react'
import HospitalDetailTop from './HospitalDetailTop'
import HospitalAdminDetail from './HospitalAdminDetail'
import AppointmentSchedule from './AppointmentSchedule'

export default () => {

  return (
    <div>
      <HospitalDetailTop />
      <HospitalAdminDetail />
      <AppointmentSchedule />
    </div>
  )
}