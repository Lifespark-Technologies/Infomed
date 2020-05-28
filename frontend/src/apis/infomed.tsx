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

export interface HospitalInventory {
  resourceType: string;
  total: number;
  available: number;
  unit: number;
}

export const fetchHospitalInventory  = async (hospitalId: string) => {
  await wait(1000);

  return [{
    resourceType: "Hospital Bed Occupancy",
    total: 4,
    available: 43,
    unit: 32
  }, {
    resourceType: "Number of Ventilators available",
    total: 4,
    available: 63,
    unit: 5
  }, {
    resourceType: "N95 Masks",
    total: 4,
    available: 7,
    unit: 5
  }, {
    resourceType: "3 Layer Mask",
    total: 76,
    available: 34,
    unit: 5
  }, {
    resourceType: "PPE Kit",
    total: 6,
    available: 11,
    unit: 5
  }, {
    resourceType: "Sanitizer",
    total: 8,
    available: 13,
    unit: 5
  }, {
    resourceType: "Bleaching Powder",
    total: 0,
    available: 8,
    unit: 5
  }, {
    resourceType: "Sodium Hypochlorite",
    total: 4,
    available: 14,
    unit: 5
  }, {
    resourceType: "Chemical Gloves",
    total: 4,
    available: 10,
    unit: 5
  }, {
    resourceType: "Infrared Thermometer",
    total: 4,
    available: 8,
    unit: 5
  }, {
    resourceType: "Handwash",
    total: 4,
    available: 5,
    unit: 5
  }, {
    resourceType: "Viral Transport Medium",
    total: 4,
    available: 23,
    unit: 5
  }, {
    resourceType: "Swap Sticks",
    total: 4,
    available: 73,
    unit: 5
  }, {
    resourceType: "3 Layer packing Mask",
    total: 4,
    available: 3,
    unit: 5
  }, {
    resourceType: "Ice Gel Pack",
    total: 4,
    available: 63,
    unit: 6
  }, {
    resourceType: "Handwash",
    total: 4,
    available: 65,
    unit: 2
  }];
}