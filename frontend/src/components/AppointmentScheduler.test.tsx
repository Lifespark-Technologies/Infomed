import React from "react";
import { fetchAppointmentSlots, scheduleAppointment } from "../apis/infomed";
import { mocked } from "ts-jest/utils";
import { render } from "@testing-library/react";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";
import { AppointmentScheduler } from "./AppointmentScheduler";

jest.mock('../apis/infomed');
const mockFetchAppointmentSlots = mocked(fetchAppointmentSlots);

beforeEach(() => {
  advanceTo(new Date(2020, 5, 1));
  mockFetchAppointmentSlots.mockImplementation(async (hospitalId, start, end) => {
    switch (hospitalId) {
      case '1': return [
        { start: new Date(2020, 5, 6, 13, 0), end: new Date(2020, 5, 6, 14, 0) },
        { start: new Date(2020, 5, 6, 15, 30), end: new Date(2020, 5, 6, 15, 45) },
        { start: new Date(2020, 5, 7, 17, 0), end: new Date(2020, 5, 7, 17, 30) },
      ];

      case '2': return [
        { start: new Date(2020, 5, 9, 10, 0), end: new Date(2020, 5, 9, 11, 0) },
      ];

      default: throw Error(`Unknown hospital ${hospitalId}`);
    }
  });
})

test.each`
  hospitalId | dateLabel         | dateText            | timeSlotText       | timeSlotStart
  ${'1'}     | ${'June 6, 2020'} | ${'June 6th, 2020'} | ${'15:30 – 15:45'} | ${new Date(2020, 5, 6, 15, 30)}
  ${'2'}     | ${'June 9, 2020'} | ${'June 9th, 2020'} | ${'10:00 – 11:00'} | ${new Date(2020, 5, 9, 10, 0)}
`('should schedule an appointment at hospital $hospitalId',
  async ({ hospitalId, dateLabel, dateText, timeSlotText, timeSlotStart }) => {
    const { getByText, getByLabelText, findByText, queryByText } =
      render(<AppointmentScheduler hospitalId={hospitalId} />);
    expect(await findByText(/please select a date/i)).toBeInTheDocument();

    userEvent.click(getByLabelText(dateLabel));
    expect(getByText(/please select a time/i)).toBeInTheDocument();
    expect(getByText(`You’ve selected ${dateText}`)).toBeInTheDocument();
    const doneButton = getByText('Done');
    expect(doneButton).toBeDisabled();

    userEvent.click(getByLabelText(timeSlotText));
    expect(doneButton).toBeDisabled();

    userEvent.type(
      getByLabelText(/what’s your email address?/i), 'foo@example.com');
    expect(doneButton).toBeEnabled();

    userEvent.click(doneButton);
    expect(scheduleAppointment).toBeCalledWith(
      hospitalId, timeSlotStart, 'foo@example.com');
    expect(queryByText(/you’ve booked your appointment/i)).not.toBeInTheDocument();

    expect(await findByText(/you’ve booked your appointment/i)).toBeInTheDocument();
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