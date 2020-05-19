import React from 'react'
import {Calendar, dateFnsLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './AppointmentSchedule.module.css'
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/esm/locale';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: [enUS],
});

export default () => {

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
        view='week'
        views={['week']}
        min={new Date(2020, 4, 18, 8, 0 )}
        max={new Date(2020, 4, 18, 17, 0 )}
        date={new Date(2020, 4, 18)}
      />
    </div>
  )
}