import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './AppointmentSchedule.module.css'
import { format, parse, startOfWeek, getDay, addMinutes } from 'date-fns';
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
  onSelectTimeRange?: (start: Date, end: Date) => void
}

export default (
  { date, appointmentSlots, onSelectTimeRange }: AppointmentScheduleProps
) => {
  const altSlots = [];
  let d = new Date(2020, 5, 11, 10, 0);
  for (let i = 0; i < 240; ++i) {
    const d2 = addMinutes(d, 9);
    altSlots.push({ start: d, end: d2 });
    d = addMinutes(d2, 1);
  }

  const onSelectSlot = ({start, end}: {start: string | Date, end: string | Date}) => {
    if (typeof start === 'string' || typeof end === 'string') {
      throw Error('Date expected, got a string instead');
    }
    onSelectTimeRange?.(start, end);
  }

  return (
    <Card bg="light" className="shadow">
      <Card.Body className={styles.schedule_container}>
        <Calendar
          localizer={localizer}
          events={[...appointmentSlots]}
          // events={altSlots}
          formats={{ eventTimeRangeFormat: () => '' }}  // Don't display event times at all.
          step={10}
          timeslots={6}
          defaultView='week'
          views={['week']}
          date={date}
          toolbar={false}
          selectable
          onSelectSlot={onSelectSlot}
          showMultiDayTimes

          // This is a hacky way to force small events to display underneath
          // each other. The Calendar control is just too smart, and we may want
          // to replace it in future.
          eventPropGetter={() => ({
            style: { minHeight: 0, minWidth: '100%', position: 'initial' },
          })}
        />
      </Card.Body>
    </Card>
  )
}