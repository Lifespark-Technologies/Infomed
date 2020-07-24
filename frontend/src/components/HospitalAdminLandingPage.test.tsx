import { Calendar } from "react-big-calendar"
import { act, fireEvent, render } from "@testing-library/react";
import { HospitalAdminLandingPage } from "./HospitalAdminLandingPage";
import React, { ComponentType, Component, ReactElement } from "react";
import { advanceTo } from "jest-date-mock";
import userEvent from "@testing-library/user-event";
import { renderAsync } from "../testUtils";
import fetchMock from "fetch-mock";
import { mocked } from "ts-jest/utils";

jest.mock('react-big-calendar', () => ({
  ...jest.requireActual('react-big-calendar'),
  Calendar: jest.fn(() => null),
}))

// Implementation note: because `react-big-calendar` is notoriously difficult to
// interact with properly in test, we need to mock it out.
const MockCalendar = mocked(Calendar);

beforeEach(() => {
  advanceTo(new Date(2020, 1, 4))
  fetchMock
    .get(
      {
        url: '/apis/hospitals/1/appointment-slots',
        query: { since: '2020-02-02T00:00:00Z', until: '2020-02-08T23:59:59Z', },
      },
      [
        { id: '12', start: '2020-02-03T13:00:00Z', end: '2020-02-03T14:00:00Z', status: 'available' },
        { id: '13', start: '2020-02-03T15:30:00Z', end: '2020-02-03T15:45:00Z', status: 'available' },
        { id: '14', start: '2020-02-07T17:00:00Z', end: '2020-02-07T17:30:00Z', status: 'unavailable' },
      ])
    .get(
      {
        url: '/apis/hospitals/1/appointment-slots',
        query: { since: '2020-02-16T00:00:00Z', until: '2020-02-22T23:59:59Z', },
        overwriteRoutes: false,
      },
      [
        { id: '15', start: '2020-02-20T10:00:00Z', end: '2020-02-20T11:00:00Z', status: 'available' },
      ])
    .get('path:/apis/hospitals/2/appointment-slots', [
      { id: '21', start: '2020-02-06T10:00:00Z', end: '2020-02-06T11:00:00Z', status: 'available' },
    ])
    .post('/apis/hospitals/1/appointment-slots', [])
    .post('/apis/hospitals/2/appointment-slots', [])
    .delete('/apis/hospitals/1/appointment-slots/12', 200)
    .delete('/apis/hospitals/1/appointment-slots/13', 200);
  MockCalendar.mockClear();
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
      { id: '12', start: new Date(2020, 1, 3, 13, 0), end: new Date(2020, 1, 3, 14, 0), status: 'available' },
      { id: '13', start: new Date(2020, 1, 3, 15, 30), end: new Date(2020, 1, 3, 15, 45), status: 'available' },
      { id: '14', start: new Date(2020, 1, 7, 17, 0), end: new Date(2020, 1, 7, 17, 30), status: 'unavailable' },
    ],
  })

  await renderAsync(<HospitalAdminLandingPage hospitalId="2" />)
  expectToBeRenderedWith(Calendar, {
    date: new Date(2020, 1, 4),
    events: [
      { id: '21', start: new Date(2020, 1, 6, 10, 0), end: new Date(2020, 1, 6, 11, 0), status: 'available' },
    ],
  })
})

test('renders unavailable slots in red', async () => {
  await renderAsync(<HospitalAdminLandingPage hospitalId="1" />)
  const { eventPropGetter } = lastRenderedProps(MockCalendar)
  expect(eventPropGetter).toBeDefined()
  const availableEventProps = eventPropGetter!(
    { id: '12', start: '2020-02-03T13:00:00Z', end: '2020-02-03T14:00:00Z', status: 'available' },
    new Date(2020, 1, 3, 13, 0),
    new Date(2020, 1, 3, 14, 0),
    false
  )
  const unavailableEventProps = eventPropGetter!(
    { id: '14', start: '2020-02-07T17:00:00Z', end: '2020-02-07T17:30:00Z', status: 'unavailable' },
    new Date(2020, 1, 7, 17, 0),
    new Date(2020, 1, 7, 17, 30),
    false
  )
  
  expect(unavailableEventProps.style).toBeDefined()
  expect(unavailableEventProps.style!.backgroundColor).toBe('red')

  expect(availableEventProps.style).toBeDefined()
  expect(availableEventProps.style!).not.toHaveProperty('backgroundColor')
})

test('can switch weeks using the small calendar', async () => {
  const { getByLabelText } = await renderAsync(<HospitalAdminLandingPage hospitalId="1" />)

  await act(async () => { userEvent.click(getByLabelText('February 18, 2020')) })

  expectToBeRenderedWith(Calendar, {
    date: new Date(2020, 1, 18),
    events: [
      { id: '15', start: new Date(2020, 1, 20, 10, 0), end: new Date(2020, 1, 20, 11, 0), status: 'available' },
    ],
  })
})

/** Returns the last call made to a given mock instance. */
function lastCall<T, Y extends any[]>(mockInstance: jest.MockInstance<T, Y>) {
  return mockInstance.mock.calls[mockInstance.mock.calls.length - 1]
}

/**
 * Returns props that were used last time a given component was rendered.
 * 
 * Caution! Forgetting to use the last call at all times, and using the first
 * one instead, may cause a very sneaky bug in the test where we refer to a
 * captured `onSelect` callback that was not defined within the latest render
 * call. In this case, its closure would refer to old state values. What
 * happens next is that a hole in the ground opens, and the hounds of hell come
 * to eat your soul. Also, you lose all your mana and 50 points of patience by
 * spending an hour debugging state changes that JUST REFUSE TO TAKE ANY
 * EFFECT.
 */
function lastRenderedProps<P>(
  mockComponent: jest.MockInstance<Component<P>, [P, any?]>
): P {
  // Return the first argument of the last call.
  return lastCall(mockComponent)[0];
}

test('can create appointment slots', async () => {
  const { getByRole, queryByRole } = await renderAsync(
    <HospitalAdminLandingPage hospitalId="1" />
  )

  expect(queryByRole('button', { name: 'Create slots' })).not.toBeInTheDocument();

  let { onSelectSlot } = lastRenderedProps(MockCalendar)
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 5, 12, 0),
    end: new Date(2020, 1, 5, 18, 0),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }));
  await act(async () => getByRole('button', { name: 'Create slots' }).click());

  expect(queryByRole('button', { name: 'Create slots' })).not.toBeInTheDocument();
  expect(fetchMock.called('/apis/hospitals/1/appointment-slots', {
    body: {
      start: '2020-02-05T12:00:00Z',
      end: '2020-02-05T18:00:00Z',
      slotLength: 'P0Y0M0DT0H15M0S',
    },
    headers: { 'Content-Type': 'application/json' },
  })).toBe(true);

  ({ onSelectSlot } = lastCall(MockCalendar)[0])
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 6, 14, 0),
    end: new Date(2020, 1, 6, 17, 30),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }))
  await act(async () => getByRole('button', { name: 'Create slots' }).click());

  expect(fetchMock.called('/apis/hospitals/1/appointment-slots', {
    body: {
      start: '2020-02-06T14:00:00Z',
      end: '2020-02-06T17:30:00Z',
      slotLength: 'P0Y0M0DT0H15M0S',
    },
    headers: { 'Content-Type': 'application/json' },
  })).toBe(true);
  ({ onSelectSlot } = lastCall(MockCalendar)[0])

});

test.each([
  ['1', '/apis/hospitals/1/appointment-slots'],
  ['2', '/apis/hospitals/2/appointment-slots'],
])('can create timeslots for hospital %s', async (hospitalId, endpointUrl) => {
  const { getByRole } = await renderAsync(
    <HospitalAdminLandingPage hospitalId={hospitalId} />
  )

  const { onSelectSlot } = lastRenderedProps(MockCalendar)
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 4, 10, 0),
    end: new Date(2020, 1, 4, 11, 0),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }));
  await act(async () => getByRole('button', { name: 'Create slots' }).click());

  expect(fetchMock.called(endpointUrl)).toBe(true);
});

test('can customize appointment timeslot length', async () => {
  const { getByRole, getByLabelText } = await renderAsync(
    <HospitalAdminLandingPage hospitalId="1" />
  )

  let { onSelectSlot } = lastRenderedProps(MockCalendar)
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 5, 13, 0),
    end: new Date(2020, 1, 5, 17, 0),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }));
  const timeslotLengthInput = getByLabelText('Timeslot length') as HTMLInputElement;
  expect(timeslotLengthInput.value).toBe('15');
  fireEvent.change(timeslotLengthInput, { target: { value: '20' } });
  await act(async () =>
    userEvent.click(getByRole('button', { name: 'Create slots' })));

  expect(fetchMock.called('/apis/hospitals/1/appointment-slots', {
    body: {
      start: '2020-02-05T13:00:00Z',
      end: '2020-02-05T17:00:00Z',
      slotLength: 'P0Y0M0DT0H20M0S',
    },
    headers: { 'Content-Type': 'application/json' },
  })).toBe(true);
});

test('can cancel creating appointment timeslots', async () => {
  const { getByRole, queryByRole } = await renderAsync(
    <HospitalAdminLandingPage hospitalId="1" />
  )

  let { onSelectSlot } = lastRenderedProps(MockCalendar)
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 5, 13, 0),
    end: new Date(2020, 1, 5, 17, 0),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }));
  await act(async () => userEvent.click(getByRole('button', { name: 'Close' })));
  expect(queryByRole('button', { name: 'Create slots' })).not.toBeInTheDocument();
});

test('validates appointment timeslot length', async () => {
  const { getByRole, getByLabelText } = await renderAsync(
    <HospitalAdminLandingPage hospitalId="1" />
  )
  let { onSelectSlot } = lastRenderedProps(MockCalendar)
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 5, 13, 0),
    end: new Date(2020, 1, 5, 17, 0),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }));
  const timeslotLengthInput = getByLabelText('Timeslot length');

  fireEvent.change(timeslotLengthInput, { target: { value: '0' } });
  expect(getByRole('button', { name: 'Create slots' })).toBeDisabled();

  fireEvent.change(timeslotLengthInput, { target: { value: '' } });
  expect(getByRole('button', { name: 'Create slots' })).toBeDisabled();
});

test('displays returned timeslots', async () => {
  fetchMock.post(
    {
      url: '/apis/hospitals/2/appointment-slots',
      overwriteRoutes: true,
    },
    [
      { id: '25', start: '2020-02-05T12:00:00Z', end: '2020-02-05T12:15:00Z', status: 'available' },
      { id: '26', start: '2020-02-05T12:15:00Z', end: '2020-02-05T12:30:00Z', status: 'available' },
    ]
  );

  const { getByRole, queryByRole } = await renderAsync(
    <HospitalAdminLandingPage hospitalId="2" />
  )

  let { onSelectSlot } = lastRenderedProps(MockCalendar)
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 5, 12, 0),
    end: new Date(2020, 1, 5, 13, 0),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }));
  await act(async () => getByRole('button', { name: 'Create slots' }).click());

  expectToBeRenderedWith(Calendar, {
    events: [
      { id: '21', start: new Date(2020, 1, 6, 10, 0), end: new Date(2020, 1, 6, 11, 0), status: 'available' },
      { id: '25', start: new Date(2020, 1, 5, 12, 0), end: new Date(2020, 1, 5, 12, 15), status: 'available' },
      { id: '26', start: new Date(2020, 1, 5, 12, 15), end: new Date(2020, 1, 5, 12, 30), status: 'available' },
    ],
  });

  fetchMock.post(
    {
      url: '/apis/hospitals/2/appointment-slots',
      overwriteRoutes: true,
    },
    [
      { id: '27', start: '2020-02-07T14:00:00Z', end: '2020-02-07T14:15:00Z', status: 'available' },
    ]
  );

  ({ onSelectSlot } = lastCall(MockCalendar)[0])
  act(() => onSelectSlot!({
    start: new Date(2020, 1, 7, 14, 0),
    end: new Date(2020, 1, 7, 14, 15),
    slots: [], // We don't actually care about this field.
    action: 'select',
  }))
  MockCalendar.mockClear();
  await act(async () => getByRole('button', { name: 'Create slots' }).click());

  expectToBeRenderedWith(Calendar, {
    events: [
      { id: '21', start: new Date(2020, 1, 6, 10, 0), end: new Date(2020, 1, 6, 11, 0), status: 'available' },
      { id: '25', start: new Date(2020, 1, 5, 12, 0), end: new Date(2020, 1, 5, 12, 15), status: 'available' },
      { id: '26', start: new Date(2020, 1, 5, 12, 15), end: new Date(2020, 1, 5, 12, 30), status: 'available' },
      { id: '27', start: new Date(2020, 1, 7, 14, 0), end: new Date(2020, 1, 7, 14, 15), status: 'available' },
    ],
  });
});

test('deletes appointment slots', async () => {
  const { getByRole, queryByRole } = await renderAsync(
    <HospitalAdminLandingPage hospitalId="1" />
  )

  // Stupid react-big-calendar. This is a hack upon a hack. Not only we have to
  // mock the entire thing, then we have to render the event title element
  // separately. The title element contains the "delete" button, which we have
  // to click. Also, since the TS type bindings for this library don't take into
  // consideration that the title accessor can return a React element, we have
  // to play with unnecessary type casting.
  let { titleAccessor } = lastRenderedProps(MockCalendar)
  let { getByRole: getTitleElementByRole } = render(titleAccessor!(
    { id: '13', start: new Date(2020, 1, 3, 15, 30), end: new Date(2020, 1, 3, 15, 45) },
  ) as unknown as ReactElement)
  let deleteButton = getTitleElementByRole(
    'button',
    { name: 'Remove timeslot starting at February 3rd, 2020 at 3:30 PM' }
  );
  await act(async () => userEvent.click(deleteButton));

  expect(fetchMock.called('/apis/hospitals/1/appointment-slots/13', {
    method: 'DELETE'
  })).toBe(true);

  ({ titleAccessor } = lastRenderedProps(MockCalendar));
  ({ getByRole: getTitleElementByRole } = render(titleAccessor!(
    { id: '12', start: new Date(2020, 1, 3, 13, 0), end: new Date(2020, 1, 3, 14, 0) },
  ) as unknown as ReactElement));
  deleteButton = getTitleElementByRole(
    'button',
    { name: 'Remove timeslot starting at February 3rd, 2020 at 1:00 PM' }
  );
  MockCalendar.mockClear();
  await act(async () => userEvent.click(deleteButton));

  expect(fetchMock.called('/apis/hospitals/1/appointment-slots/12', {
    method: 'DELETE'
  })).toBe(true);
  expectToBeRenderedWith(Calendar, {
    events: [
      { id: '14', start: new Date(2020, 1, 7, 17, 0), end: new Date(2020, 1, 7, 17, 30), status: 'unavailable' },
    ],
  })
});