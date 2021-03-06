import React from "react";
import { render } from "@testing-library/react";
import AppointmentDatePicker from "./AppointmentDatePicker";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";

const getSlots = () => [
  {
    start: new Date(2020, 0, 10, 6, 0),
    end: new Date(2020, 0, 10, 6, 30),
  },
  {
    start: new Date(2020, 0, 14, 6, 0),
    end: new Date(2020, 0, 14, 6, 30),
  },
];

test('Picks an available date', () => {
  advanceTo(new Date(2020, 0, 1));
  const datePicked = jest.fn();
  const { getByLabelText } = render(
    <AppointmentDatePicker availableSlots={getSlots()} onDatePicked={datePicked} />
  );

  userEvent.click(getByLabelText('January 10, 2020'));
  expect(datePicked).toBeCalledWith(new Date(2020, 0, 10));

  userEvent.click(getByLabelText('January 14, 2020'));
  expect(datePicked).toBeCalledWith(new Date(2020, 0, 14));
});

test('Does not pick unavailable date', () => {
  advanceTo(new Date(2020, 0, 1));
  const datePicked = jest.fn();
  const { getByLabelText } = render(
    <AppointmentDatePicker availableSlots={getSlots()} onDatePicked={datePicked} />
  );

  userEvent.click(getByLabelText('January 11, 2020'));
  userEvent.click(getByLabelText('January 13, 2020'));
  expect(datePicked).not.toBeCalled();
});