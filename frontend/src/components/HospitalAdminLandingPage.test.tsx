import { Calendar, CalendarProps } from "react-big-calendar"
import { render } from "@testing-library/react";
import HospitalAdminLandingPage from "./HospitalAdminLandingPage";
import React, { ReactNode, ComponentType } from "react";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";

jest.mock('react-big-calendar', () => ({
  ...jest.requireActual('react-big-calendar'),
  Calendar: jest.fn(() => null),
}))

function expectToBeRenderedWith<P>(component: ComponentType<P>, props: object): void {
  expect(component).toBeCalledWith(expect.objectContaining(props), expect.anything());
}

test('can switch weeks using the small calendar', () => {
  advanceTo(new Date(2020, 3, 1));
  const { getByLabelText } = render(<HospitalAdminLandingPage />)
  expectToBeRenderedWith(Calendar, { date: new Date(2020, 3, 1) });

  userEvent.click(getByLabelText('April 18, 2020'));
  expectToBeRenderedWith(Calendar, { date: new Date(2020, 3, 18) });
})

test('fetches appointment slots and renders them on the big calendar', () => {
  advanceTo(new Date(2020, 3, 1));
})