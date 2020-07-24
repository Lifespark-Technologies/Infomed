import React from "react";
import { render, act } from "@testing-library/react";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";
import { AppointmentScheduler } from "./AppointmentScheduler";
import fetchMock from "fetch-mock";
import { renderAsync } from "../testUtils";


beforeEach(() => {
  advanceTo(new Date(2020, 5, 3));
  fetchMock
    .get(
      {
        url: 'path:/apis/hospitals/1/appointment-slots',
        query: { since: '2020-06-01T00:00:00Z', until: '2020-07-01T00:00:00Z' },
      },
      [
        { id: '10', start: '2020-06-06T13:00:00Z', end: '2020-06-06T14:00:00Z', status: 'available' },
        { id: '11', start: '2020-06-06T15:30:00Z', end: '2020-06-06T15:45:00Z', status: 'available' },
        { id: '12', start: '2020-06-07T17:00:00Z', end: '2020-06-07T17:30:00Z', status: 'available' },
      ])
    .get(
      {
        url: 'path:/apis/hospitals/1/appointment-slots',
        query: { since: '2020-07-01T00:00:00Z', until: '2020-08-01T00:00:00Z' },
        overwriteRoutes: false,
      },
      [
        { id: '13', start: '2020-07-10T17:00:00Z', end: '2020-07-10T18:00:00Z', status: 'available' },
      ])
    .get('path:/apis/hospitals/2/appointment-slots', {
      body: [
        { id: '20', start: '2020-06-09T10:00:00Z', end: '2020-06-09T11:00:00Z', status: 'available' },
      ]
    })
    .post('/apis/hospitals/1/appointment-slots/11/schedule', 200)
    .post('/apis/hospitals/2/appointment-slots/20/schedule', 200);
});

afterEach(() => fetchMock.reset());

test.each`
  hospitalId | dateLabel         | dateText            | timeSlotText       | timeSlotId
  ${'1'}     | ${'June 6, 2020'} | ${'June 6th, 2020'} | ${'15:30 – 15:45'} | ${'11'}
  ${'2'}     | ${'June 9, 2020'} | ${'June 9th, 2020'} | ${'10:00 – 11:00'} | ${'20'}
`('should schedule an appointment at hospital $hospitalId',
  async ({ hospitalId, dateLabel, dateText, timeSlotText, timeSlotId }) => {
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

    await act(async () => userEvent.type(
      getByLabelText(/what’s your email address?/i), 'foo@example.com'));
    expect(doneButton).toBeEnabled();

    await act(async () => userEvent.click(doneButton));
    expect(fetchMock.called(
      `/apis/hospitals/${hospitalId}/appointment-slots/${timeSlotId}/schedule`,
      {
        body: {
          email: 'foo@example.com',
        },
        headers: { 'Content-Type': 'application/json' },
      }
    )).toBe(true);
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

test('should switch between months', async () => {
  const { getByText, getByLabelText, getByRole } =
    await renderAsync(<AppointmentScheduler hospitalId="1" />);

  expect(getByLabelText('June 5, 2020')).toBeDisabled();
  expect(getByLabelText('June 6, 2020')).toBeEnabled();

  // Go to next week.
  await act(async () => userEvent.click(getByRole('button', { name: '›' })));

  expect(getByLabelText('July 10, 2020')).toBeEnabled();
  expect(getByLabelText('July 11, 2020')).toBeDisabled();
});