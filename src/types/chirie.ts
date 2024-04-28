export type ChirieType = {
  id: string;
  adress: {
    location: string;
    floor: number;
    city: string;
    county: string;
    country: string;
  };
  propertyInfo: {
    rooms: number;
    surface: number;
    year: number;
    state: string;
    furnished: boolean;
    price: number;
    warranty: boolean;
    type: string;
    comfort: string;
  };
  facilities: {
    internet: boolean;
    cableTv: boolean;
    airConditioning: boolean;
    centralHeating: boolean;
    fridge: boolean;
    stove: boolean;
    washingMachine: boolean;
    lift: boolean;
    parking: boolean;
    storageSpace: boolean;
    balcony: boolean;
    smokeDetector: boolean;
    gasDetector: boolean;
  };
  otherInfo: {
    description: string;
    freeFrom: string;
    petsAllowed: boolean;
  };
  contact: {
    userId: string;
    name: string;
    email: string;
  };
  images: string[];
};
