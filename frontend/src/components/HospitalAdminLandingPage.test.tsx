import { Calendar } from "react-big-calendar"
import { act } from "@testing-library/react";
import { HospitalAdminLandingPage } from "./HospitalAdminLandingPage";
import React, { ComponentType } from "react";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";
import { renderAsync } from "../testUtils";
import fetchMock from "fetch-mock";

jest.mock('react-big-calendar', () => ({
  ...jest.requireActual('react-big-calendar'),
  Calendar: jest.fn(() => null),
}))

beforeEach(() => {
  advanceTo(new Date(2020, 1, 4))
  fetchMock
    .get(
      {
        url: '/apis/hospitals/1/appointmentSlots',
        query: { start: '2020-02-02T00:00:00Z', end: '2020-02-08T23:59:59Z', },
      },
      [
        { start: '2020-02-03T13:00:00Z', end: '2020-02-03T14:00:00Z' },
        { start: '2020-02-03T15:30:00Z', end: '2020-02-03T15:45:00Z' },
        { start: '2020-02-07T17:00:00Z', end: '2020-02-07T17:30:00Z' },
      ])
    .get(
      {
        url: '/apis/hospitals/1/appointmentSlots',
        query: { start: '2020-02-16T00:00:00Z', end: '2020-02-22T23:59:59Z', },
        overwriteRoutes: false,
      },
      [
        { start: '2020-02-20T10:00:00Z', end: '2020-02-20T11:00:00Z' },
      ])
    .get('path:/apis/hospitals/2/appointmentSlots', [
      { start: '2020-02-06T10:00:00Z', end: '2020-02-06T11:00:00Z' },
    ])
})

afterEach(() => fetchMock.reset())

function expectToBeRenderedWith<P>(component: ComponentType<P>, props: object): void {
  expect(component).toBeCalledWith(expect.objectContaining(props), expect.anything())
}

test('fetches appointment slots and renders them on the big calendar', async () => {
  await renderAsync(<HospitalAdminLandingPage hospitalId="1" />)
  expectToBeRenderedWith(Calendar, {
    date: new Date(2020, 1, 4),
    events: [
      { start: new Date(2020, 1, 3, 13, 0), end: new Date(2020, 1, 3, 14, 0) },
      { start: new Date(2020, 1, 3, 15, 30), end: new Date(2020, 1, 3, 15, 45) },
      { start: new Date(2020, 1, 7, 17, 0), end: new Date(2020, 1, 7, 17, 30) },
    ],
  })

  await renderAsync(<HospitalAdminLandingPage hospitalId="2" />)
  expectToBeRenderedWith(Calendar, {
    date: new Date(2020, 1, 4),
    events: [
      { start: new Date(2020, 1, 6, 10, 0), end: new Date(2020, 1, 6, 11, 0) },
    ],
  })
})

test('can switch weeks using the small calendar', async () => {
  const { getByLabelText } = await renderAsync(<HospitalAdminLandingPage hospitalId="1" />)

  await act(async () => { userEvent.click(getByLabelText('February 18, 2020')) })

  expectToBeRenderedWith(Calendar, {
    date: new Date(2020, 1, 18),
    events: [
      { start: new Date(2020, 1, 20, 10, 0), end: new Date(2020, 1, 20, 11, 0) },
    ],
  })
})