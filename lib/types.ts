export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  features: string[];
  rentalPrice: string;
  rentalCompany: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface CarsQueryParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  perPage: number;
  page: number;
}

export interface CatalogFilters {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

export interface CarFilterOptions {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
}

export interface BookingResponse {
  message: string;
}
