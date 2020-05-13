import React from "react";
import { fetchAppointmentSlots } from "../apis/infomed";
import { mocked } from "ts-jest/utils";
import { render, fireEvent } from "@testing-library/react";
import AppointmentScheduler from "./AppointmentScheduler";
import { advanceTo } from "jest-date-mock";

jest.mock('../apis/infomed');
const mockFetchAppointmentSlots = mocked(fetchAppointmentSlots);

test('should schedule an appointment', async () => {
  advanceTo(new Date(2020, 5, 1));
  mockFetchAppointmentSlots.mockResolvedValue([
    { start: new Date(2020, 5, 6, 13), end: new Date(2020, 5, 6, 14) }
  ]);

  const { getByText, getByLabelText, queryByText, findByText } = render(<AppointmentScheduler />);
  expect(await findByText(/please select a date/i)).toBeInTheDocument();

  // When unavailable date is clicked, no transition should be made just yet.
  fireEvent.click(getByLabelText('June 2, 2020'));
  expect(queryByText(/please select a time/i)).not.toBeInTheDocument();

  // When available date is clicked, we expect a transition.
  fireEvent.click(getByLabelText('June 6, 2020'));
  expect(getByText(/please select a time/i)).toBeInTheDocument();
});