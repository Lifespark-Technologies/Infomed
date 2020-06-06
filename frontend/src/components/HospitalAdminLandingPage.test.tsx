import { Calendar, CalendarProps } from "react-big-calendar"
import { render, act, RenderResult } from "@testing-library/react";
import { HospitalAdminLandingPage } from "./HospitalAdminLandingPage";
import React, { ComponentType, ReactElement } from "react";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { fetchAppointmentSlots } from "../apis/infomed";
import { isSameDay } from "date-fns";

jest.mock('react-big-calendar', () => ({
  ...jest.requireActual('react-big-calendar'),
  Calendar: jest.fn(() => null),
}))

jest.mock('../apis/infomed')
const mockFetchAppointmentSlots = mocked(fetchAppointmentSlots)

beforeEach(() => {
  advanceTo(new Date(2020, 1, 4))
  mockFetchAppointmentSlots.mockImplementation(async (hospitalId, start, end) => {
    switch (hospitalId) {
      case '1': {
        if (isSameDay(start, new Date(2020, 1, 2)) && isSameDay(end, new Date(2020, 1, 8))) {
          return [
            { start: new Date(2020, 1, 3, 13, 0), end: new Date(2020, 1, 3, 14, 0) },
            { start: new Date(2020, 1, 3, 15, 30), end: new Date(2020, 1, 3, 15, 45) },
            { start: new Date(2020, 1, 7, 17, 0), end: new Date(2020, 1, 7, 17, 30) },
          ]
        } else if (isSameDay(start, new Date(2020, 1, 16)) && isSameDay(end, new Date(2020, 1, 22))) {
          return [
            { start: new Date(2020, 1, 20, 10, 0), end: new Date(2020, 1, 20, 11, 0) },
          ]
        } else {
          throw Error(`Unknown date range: ${start} to ${end}`)
        }
      }

      case '2': return [
        { start: new Date(2020, 1, 6, 10, 0), end: new Date(2020, 1, 6, 11, 0) },
      ]

      default: throw Error(`Unknown hospital ${hospitalId}`)
    }
  })
})

function expectToBeRenderedWith<P>(component: ComponentType<P>, props: object): void {
  expect(component).toBeCalledWith(expect.objectContaining(props), expect.anything())
}

const renderAsync = async (element: ReactElement): Promise<RenderResult> => {
  let renderResult: RenderResult | null = null
  await act(async () => {
    renderResult = render(element)
  })
  return renderResult!
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