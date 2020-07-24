import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import styles from './AppointmentSchedule.module.css'
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { AppointmentSlot } from '../apis/infomed';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
  onDeleteAppointmentSlot?: (slot: AppointmentSlot) => void
}

export default (
  {
    date,
    appointmentSlots,
    onSelectTimeRange,
    onDeleteAppointmentSlot,
  }: AppointmentScheduleProps
) => {
  const onSelectSlot = ({ start, end }: { start: string | Date, end: string | Date }) => {
    if (typeof start === 'string' || typeof end === 'string') {
      throw Error('Date expected, got a string instead');
    }
    onSelectTimeRange?.(start, end);
  }

  const getTitle = (slot: AppointmentSlot) => {
    const onDeleteClick = () => {
      onDeleteAppointmentSlot?.(slot);
    };

    const startDateStr = format(slot.start, 'PPPp');
    return (
      <div className={styles.appointmentContainer}>
        <Button
          className={styles.deleteButton}
          aria-label={`Remove timeslot starting at ${startDateStr}`}
          onClick={onDeleteClick}
        >
          ✕
      </Button>
      </div>
    ) as unknown as string;
  };

  const getEventProps = (event: AppointmentSlot) => {
    const statusStyle = event.status === 'unavailable' ?
      { backgroundColor: 'red' } : {};
    return {
      style: {
        overflow: 'visible',
        ...statusStyle,
      },
    };
  };

  return (
    <Card bg="light" className="shadow">
      <Card.Body className={styles.scheduleContainer}>
        <Calendar
          localizer={localizer}
          events={[...appointmentSlots]}
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
          dayLayoutAlgorithm="no-overlap"
          titleAccessor={getTitle}
          eventPropGetter={getEventProps}
        />
      </Card.Body>
    </Card>
  )
}