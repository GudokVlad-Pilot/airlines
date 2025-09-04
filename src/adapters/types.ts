export interface Page {
  title: {
    en: string;
    ru: string;
    fi: string;
  };
  slug: string;
  description: {
    en: string;
    ru: string;
    fi: string;
  };
  image?: string | null;
}
export interface Airport {
  _id?: string;
  title: {
    en: string;
    ru: string;
    fi: string;
  };
  iata: string;
  city: {
    en: string;
    ru: string;
    fi: string;
  };
  country: {
    en: string;
    ru: string;
    fi: string;
  };
  description?: {
    en: string;
    ru: string;
    fi: string;
  };
  image?: string | null;
}

export interface Dictionary {
  title: string;
  phrase: {
    en: string;
    ru: string;
    fi: string;
  };
}

export interface Route {
  _id: string;
  origin: Airport;
  destination: Airport;
  departureTime: string; // ISO date string from Sanity (e.g. "2025-08-23T09:00:00Z")
  arrivalTime: string; // ISO date string
  price: number;
}

export interface StaticRoute {
  _id: string;
}

export interface Category {
  _id: string;
  title: {
    en: string;
    ru: string;
    fi: string;
  };
}

export interface Ingredient {
  _id: string;
  title: {
    en: string;
    ru: string;
    fi: string;
  };
  category: Category[];
}

export interface Meal {
  _id: string;
  title: {
    en: string;
    ru: string;
    fi: string;
  };
  image?: string;
  isActive: boolean;
  ingredients: Ingredient[];
}

export interface Extra {
  _id: string;
  title: {
    en: string;
    ru: string;
    fi: string;
  };
  image?: string;
  isActive: boolean;
  description: {
    en: string;
    ru: string;
    fi: string;
  };
  price: number;
}

export interface PassengerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  meal: string;
  extras: string[];
}

export interface PaymentData {
  flightId: string;
  passengers: PassengerData[];
  total: number;
  paid: boolean;
}
