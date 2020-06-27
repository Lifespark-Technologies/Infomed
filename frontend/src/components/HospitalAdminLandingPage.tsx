import React, { useState, useEffect, ChangeEvent } from 'react'
import HospitalDetailTop from './HospitalDetailTop'
import HospitalAdminDetail from './HospitalAdminDetail'
import AppointmentSchedule from './AppointmentSchedule'
import { fetchAppointmentSlots, AppointmentSlot, createTimeslots } from '../apis/infomed'
import { startOfWeek, endOfWeek } from 'date-fns'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { AssertionError } from 'assert'
import Form from 'react-bootstrap/Form'

interface HospitalAdminLandingPageProps {
  hospitalId: string
}

export const HospitalAdminLandingPage = ({ hospitalId }: HospitalAdminLandingPageProps) => {
  const [focusedDate, setFocusedDate] = useState(new Date())
  const [visibleSlots, setVisibleSlots] = useState<readonly AppointmentSlot[]>([])
  const [timeRangeForCreatingSlots, setTimeRangeForCreatingSlots] =
    useState<{ readonly start: Date, readonly end: Date } | null>(null);
  const [timeslotLength, setTimeslotLength] = useState('15');
  const [timeslotLengthValid, setTimeslotLengthValid] = useState(true);

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

  const onSelectTimeRange = (start: Date, end: Date) => {
    setTimeRangeForCreatingSlots({ start, end });
  }

  const onCreateTimeSlotsClicked = async () => {
    if (!timeRangeForCreatingSlots) {
      throw Error('No time range selected');
    }
    const { start, end } = timeRangeForCreatingSlots;
    const newSlots = await createTimeslots(
      hospitalId, start, end, { minutes: parseInt(timeslotLength) },
    );
    setTimeRangeForCreatingSlots(null);
    setVisibleSlots([...visibleSlots, ...newSlots])
  }

  const onTimeslotLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeslotLength(e.target.value);
    setTimeslotLengthValid(e.target.checkValidity());
  }

  return (
    <Container>
      <HospitalDetailTop />
      <HospitalAdminDetail onDateChange={onSmallCalendarDateChange} />
      <AppointmentSchedule
        date={focusedDate}
        appointmentSlots={visibleSlots}
        onSelectTimeRange={onSelectTimeRange}
      />
      <Modal
        show={!!timeRangeForCreatingSlots}
        onHide={() => setTimeRangeForCreatingSlots(null)}
      >
        <Modal.Header closeButton>
          Create appointment slots
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="timeslot-length">
            <Form.Label>Timeslot length</Form.Label>
            <Form.Control
              type="number"
              min="1"
              required
              value={timeslotLength}
              onChange={onTimeslotLengthChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            aria-label="Create slots"
            onClick={onCreateTimeSlotsClicked}
            disabled={!timeslotLengthValid}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default () => {
  const { hospitalId } = useParams();
  return (
    <HospitalAdminLandingPage hospitalId={hospitalId} />
  );
}