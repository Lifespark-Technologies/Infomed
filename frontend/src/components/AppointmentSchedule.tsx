import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './AppointmentSchedule.module.css'
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { AppointmentSlot } from '../apis/infomed';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: [enGB],
});

interface AppointmentScheduleProps {
  date: Date
  appointmentSlots: readonly AppointmentSlot[]
}

export default ({ date, appointmentSlots }: AppointmentScheduleProps) => {

  return (
    <Card bg="light" className="shadow">
      <Card.Body className={styles.schedule_container}>
        <Calendar
          localizer={localizer}
          events={[...appointmentSlots]}
          formats={{ eventTimeRangeFormat: () => '' }}  // Don't display event times at all.
          step={60}
          defaultView='week'
          views={['week']}
          date={date}
        />
      </Card.Body>
    </Card>
  )
}