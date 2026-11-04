import type {
  BookingRequest,
  BookingResponse,
  Car,
  CarFilterOptions,
  CarsQueryParams,
  CarsResponse,
} from './types';

const API_BASE_URL = 'https://car-rental-api.goit.study';

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/** GET /cars — page of cars with given filters. */
export function getCars(params: CarsQueryParams): Promise<CarsResponse> {
  const searchParams = new URLSearchParams();

  if (params.brand) {
    searchParams.set('brand', params.brand);
  }

  if (params.price !== undefined) {
    searchParams.set('price', String(params.price));
  }

  if (params.minMileage !== undefined) {
    searchParams.set('minMileage', String(params.minMileage));
  }

  if (params.maxMileage !== undefined) {
    searchParams.set('maxMileage', String(params.maxMileage));
  }

  searchParams.set('perPage', String(params.perPage));
  searchParams.set('page', String(params.page));

  return requestJson<CarsResponse>(
    `${API_BASE_URL}/cars?${searchParams.toString()}`,
  );
}

/** GET /cars/filters — brands and available price ranges */
export function getCarFilterOptions(): Promise<CarFilterOptions> {
  return requestJson<CarFilterOptions>(`${API_BASE_URL}/cars/filters`);
}

/** GET /cars/{id} — details */
export function getCarById(id: string): Promise<Car> {
  return requestJson<Car>(`${API_BASE_URL}/cars/${encodeURIComponent(id)}`);
}

/** POST /cars/{carId}/booking-requests — order */
export function createBookingRequest(
  carId: string,
  data: BookingRequest,
): Promise<BookingResponse> {
  return requestJson<BookingResponse>(
    `${API_BASE_URL}/cars/${encodeURIComponent(carId)}/booking-requests`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
}
