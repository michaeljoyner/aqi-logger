type City = {
  id: number;
  idx: string;
  name: string;
  lat: number;
  lng: number;
}

type TursoCreds = {
  url: string;
  authToken: string;
}

export type {City, TursoCreds};
