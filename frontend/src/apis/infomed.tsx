import { parseISO, formatISO, formatISODuration } from "date-fns";

export interface GeoCoordinates {
  readonly lat: number;
  readonly long: number;
}

export interface HospitalResponse {
  readonly id: string;
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
  readonly id: string;
  readonly start: Date;
  readonly end: Date;
  readonly status: string;
}

interface AppointmentSlotJson {
  readonly id: string;
  readonly start: string;
  readonly end: string;
  readonly status: string;
}

export const fetchAppointmentSlots = async (hospitalId: string, start: Date, end: Date): Promise<AppointmentSlot[]> => {
  const startEnc = encodeURIComponent(formatISO(start));
  const endEnc = encodeURIComponent(formatISO(end));
  const hospitalIdEnc = encodeURIComponent(hospitalId);
  const query = `since=${startEnc}&until=${endEnc}`;
  const response = await fetch(
    `/apis/hospitals/${hospitalIdEnc}/appointment-slots?${query}`);
  const results = await response.json() as AppointmentSlotJson[];
  return results.map(parseAppointmentSlot);
};

const parseAppointmentSlot = ({ id, start, end, status }: AppointmentSlotJson) => ({
  id,
  start: parseISO(start),
  end: parseISO(end),
  status,
});

export const scheduleAppointment = async (
  hospitalId: string, timeslotId: string, email: string
) => {
  fetch(`/apis/hospitals/${hospitalId}/appointment-slots/${timeslotId}/schedule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

const wait = (delay: number) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, delay);
});

export interface HospitalInventory {
  resourceType: string;
  total?: number;
  available?: number;
  unit?: string;
}

export const fetchHospitalInventory = async (hospitalId: string) => {
  await wait(1000);

  return [{
    resourceType: "Hospital Bed Occupancy",
    // total: 4,s
    // available: 43
  }, {
    resourceType: "Number of Ventilators available",
    total: 4,
    available: 5,
    unit: 'kg'
  }, {
    resourceType: "N95 Masks",
    total: 4,
    available: 7
  }, {
    resourceType: "3 Layer Mask",
    total: 76,
    available: 34
  }, {
    resourceType: "PPE Kit",
    total: 6,
    available: 11
  }, {
    resourceType: "Sanitizer",
    total: 8,
    available: 13
  }, {
    resourceType: "Bleaching Powder",
    total: 0,
    available: 8,
    unit: 'mg'
  }, {
    resourceType: "Sodium Hypochlorite",
    total: 4,
    available: 14
  }, {
    resourceType: "Chemical Gloves",
    total: 4,
    available: 10
  }, {
    resourceType: "Infrared Thermometer",
    total: 4,
    available: 8
  }, {
    resourceType: "Handwash",
    total: 4,
    available: 5
  }, {
    resourceType: "Viral Transport Medium",
    total: 4,
    available: 23,
    unit: 'g'
  }, {
    resourceType: "Swap Sticks",
    total: 4,
    available: 73
  }, {
    resourceType: "3 Layer packing Mask",
    total: 4,
    available: 3,
    unit: 'tonne'
  }, {
    resourceType: "Ice Gel Pack",
    total: 4,
    // available: 63,
    unit: 'MT'
  }];
}

export interface HospitalAddress {
  street?: string;
  city?: string;
  zip?: number;
  country?: string;
}

export const fetchHospitalAddress = async (hospitalId: string) => {
  return {
    street: '10 Delhi House Mumbai India',
    city: 'dehli',
    zip: 123456,
    country: ''
  }
}

export const createTimeslots = async (
  hospitalId: string, start: Date, end: Date, slotLength: Duration
) => {
  const hospitalIdEnc = encodeURIComponent(hospitalId);
  const response = await fetch(`/apis/hospitals/${hospitalIdEnc}/appointment-slots`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      start: formatISO(start),
      end: formatISO(end),
      slotLength: formatISODuration(slotLength),
    }),
  })
  return (await response.json()).map(parseAppointmentSlot);
}

export const deleteTimeslot = (hospitalId: string, timeslotId: string) => {
  const hospitalIdEnc = encodeURIComponent(hospitalId);
  const timeslotIdEnc = encodeURIComponent(timeslotId);
  return fetch(
    `/apis/hospitals/${hospitalIdEnc}/appointment-slots/${timeslotIdEnc}`,
    { method: 'DELETE' },
  );
}