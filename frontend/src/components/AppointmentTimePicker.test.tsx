import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppointmentTimePicker from './AppointmentTimePicker';

test('displays time slots', () => {
  const slots = [{
    start: new Date(2020, 0, 1, 12, 0),
    end: new Date(2020, 0, 1, 12, 15),
  }, {
    start: new Date(2020, 0, 1, 13, 45),
    end: new Date(2020, 0, 1, 14, 0),
  }];
  const { getByLabelText } = render(<AppointmentTimePicker timeSlots={slots} />);
  expect(getByLabelText('12:00 – 12:15')).toBeInTheDocument();
  expect(getByLabelText('13:45 – 14:00')).toBeInTheDocument();
});

test('picks a time', () => {
  const slots = [{
    start: new Date(2020, 0, 1, 14, 40),
    end: new Date(2020, 0, 1, 15, 0),
  }, {
    start: new Date(2020, 0, 1, 16, 0),
    end: new Date(2020, 0, 1, 16, 20),
  }];
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <AppointmentTimePicker timeSlots={slots} onChange={onChange} />
  );

  userEvent.click(getByLabelText('14:40 – 15:00'));
  expect(onChange).toBeCalledWith(slots[0]);

  userEvent.click(getByLabelText('16:00 – 16:20'));
  expect(onChange).toBeCalledWith(slots[1]);
});