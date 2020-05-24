import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './AppointmentSchedule.module.css'
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enGB } from 'date-fns/locale';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: [enGB],
});

interface AppointmentScheduleProps {
  date: Date
}

export default ({ date }: AppointmentScheduleProps) => {

  return (
    <div className={styles.schedule_container}>
      <Calendar
        localizer={localizer}
        events={[
          {
            'title': 'My event',
            'allDay': false,
            'start': new Date(2020, 4, 18, 8, 0),
            'end': new Date(2020, 4, 18, 14, 0)
          }
        ]}
        step={60}
        defaultView='week'
        views={['week']}
        date={date}
      />
    </div>
  )
}