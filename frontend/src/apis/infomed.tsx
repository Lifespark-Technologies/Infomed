import { isBefore, addHours, addMinutes } from "date-fns";

export interface GeoCoordinates {
  readonly lat: number;
  readonly long: number;
}

export interface HospitalResponse {
  id: string;
  readonly name: string;
  readonly coords: GeoCoordinates;
  readonly admissionFormLink: string;
}

export const searchForHospitals = async (name: string, near: GeoCoordinates): Promise<HospitalResponse[]> => {
  // TODO: dummy API
  await wait(1000);
  return [{
    id: '1',
    name: 'Rajiv Gandhi Hospital',
    coords: { lat: 12 + 56 / 60 + 18.3 / 60 / 60, long: 77 + 35 / 60 + 26.9 / 60 / 60 },
    admissionFormLink: 'http://www.sdstrcrgicd.org/',
  }, {
    id: '2',
    name: `Dummy ${name} hospital`,
    coords: { ...near },
    admissionFormLink: 'https://google.com/',
  }];
};

export interface AppointmentSlot {
  start: Date;
  end: Date;
}

export const fetchAppointmentSlots = async (hospitalId: string, start: Date, end: Date): Promise<AppointmentSlot[]> => {
  await wait(1000);

  const slots = [];
  for (let current = new Date(start.getTime()); isBefore(current, end); current = addHours(current, 1)) {
    slots.push({
      start: current,
      end: addMinutes(current, 30),
    });
  }
  return slots;
};

export const scheduleAppointment = async (
  hospitalId: string, startDate: Date, email: string
) => {
  await wait(2000);
};

const wait = (delay: number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, delay);
});