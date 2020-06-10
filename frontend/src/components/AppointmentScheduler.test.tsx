import React from "react";
import { render, act } from "@testing-library/react";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";
import { AppointmentScheduler } from "./AppointmentScheduler";
import fetchMock from "fetch-mock";
import { renderAsync } from "../testUtils";


beforeEach(() => {
  advanceTo(new Date(2020, 5, 1));
  fetchMock
    .get('path:/apis/hospitals/1/appointmentSlots', [
      { start: '2020-06-06T13:00:00Z', end: '2020-06-06T14:00:00Z' },
      { start: '2020-06-06T15:30:00Z', end: '2020-06-06T15:45:00Z' },
      { start: '2020-06-07T17:00:00Z', end: '2020-06-07T17:30:00Z' },
    ])
    .get('path:/apis/hospitals/2/appointmentSlots', {
      body: [
        { start: '2020-06-09T10:00:00Z', end: '2020-06-09T11:00:00Z' },
      ]
    })
    .post('/apis/hospital/1/schedule-appointment', 200)
    .post('/apis/hospital/2/schedule-appointment', 200);
});

afterEach(() => fetchMock.reset());

test.each`
  hospitalId | dateLabel         | dateText            | timeSlotText       | timeSlotStart
  ${'1'}     | ${'June 6, 2020'} | ${'June 6th, 2020'} | ${'15:30 – 15:45'} | ${'2020-06-06T15:30:00Z'}
  ${'2'}     | ${'June 9, 2020'} | ${'June 9th, 2020'} | ${'10:00 – 11:00'} | ${'2020-06-09T10:00:00Z'}
`('should schedule an appointment at hospital $hospitalId',
  async ({ hospitalId, dateLabel, dateText, timeSlotText, timeSlotStart }) => {
    const { getByText, getByLabelText } =
      await renderAsync(<AppointmentScheduler hospitalId={hospitalId} />);
    expect(getByText(/please select a date/i)).toBeInTheDocument();

    await act(async () => userEvent.click(getByLabelText(dateLabel)));
    expect(getByText(/please select a time/i)).toBeInTheDocument();
    expect(getByText(`You’ve selected ${dateText}`)).toBeInTheDocument();
    const doneButton = getByText('Done');
    expect(doneButton).toBeDisabled();

    await act(async () => userEvent.click(getByLabelText(timeSlotText)));
    expect(doneButton).toBeDisabled();

    await act(async() => userEvent.type(
      getByLabelText(/what’s your email address?/i), 'foo@example.com'));
    expect(doneButton).toBeEnabled();

    await act(async() => userEvent.click(doneButton));
    expect(fetchMock.called('/apis/hospital/1/schedule-appointment', {
      body: {
        hospitalId,
        start: timeSlotStart,
        email: 'foo@example.com',
      },
      headers: { 'Content-Type': 'application/json' },
    })).toBe(true);
    expect(getByText(/you’ve booked your appointment/i)).toBeInTheDocument();
  });

test('should not allow unavailable dates', async () => {
  const { getByLabelText, queryByText, findByText } =
    render(<AppointmentScheduler hospitalId="1" />);
  await findByText(/please select a date/i);

  userEvent.click(getByLabelText('June 2, 2020'));
  expect(queryByText(/please select a time/i)).not.toBeInTheDocument();
});

test('should not display times from other days', async () => {
  const { getByLabelText, queryByText, findByText, queryByLabelText } =
    render(<AppointmentScheduler hospitalId="1" />);
  await findByText(/please select a date/i);

  userEvent.click(getByLabelText('June 7, 2020'));
  expect(queryByText(/please select a time/i)).toBeInTheDocument();
  expect(queryByLabelText('15:30 – 15:45')).not.toBeInTheDocument();
});