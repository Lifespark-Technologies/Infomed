export interface GeoCoordinates {
  lat: number;
  long: number;
}

export interface HospitalResponse {
  id: string;
  readonly name: string;
  readonly coords: GeoCoordinates;
  readonly admissionFormLink: string;
}

export const searchForHospitals = (name: string, near: GeoCoordinates): Promise<HospitalResponse[]> => {
  // TODO: dummy API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([{
        id: '1',
        name: 'Rajiv Gandhi Hospital',
        coords: { lat: 12 + 56/60 + 18.3/60/60, long: 77 + 35/60 + 26.9/60/60 },
        admissionFormLink: 'http://www.sdstrcrgicd.org/',
      }, {
        id: '2',
        name: `Dummy ${name} hospital`,
        coords: {...near},
        admissionFormLink: 'https://google.com/',
      }]);
    }, 1000);
  })
}