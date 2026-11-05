# Rental Car

A car rental web application built with Next.js and TypeScript. Browse available cars, filter the catalog, load more results, view car details, and submit a booking request.

## Features

- Browse cars retrieved from the GoIT Car Rental API.
- Filter the catalog by brand, hourly price, and mileage range.
- Load additional results with paginated requests powered by TanStack Query's `useInfiniteQuery`.
- Open a car's details page in a new browser tab.
- View car photos, specifications, rental conditions, and features.
- Submit a booking request with name, email, and comment fields.
- See loading, validation, request error, and booking success states.
- Responsive layouts for mobile, tablet, and desktop screens.

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- TanStack Query
- CSS Modules
- `modern-normalize`
- Local Manrope font files

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page with a hero section and a link to the catalog. |
| `/catalog` | Car catalog with backend filters and a Load More button. |
| `/catalog/[carId]` | Car details and booking form for the selected car. |

## Getting started

### Requirements

- Node.js
- npm

### Install and run locally

```bash
git clone https://github.com/Avelexis/rental-car.git
cd rental-car
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application currently uses the API base URL configured in `lib/api.ts`; no environment variables are required for local development.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server after building. |

## API

The application communicates with the [GoIT Car Rental API](https://car-rental-api.goit.study/api-docs/).

- `GET /cars` — retrieve a page of cars and apply catalog filters.
- `GET /cars/filters` — retrieve available filter options.
- `GET /cars/{id}` — retrieve car details.
- `POST /cars/{carId}/booking-requests` — submit a booking request.

## Deployment

Deploy the project to Vercel or Netlify. Add the public deployment URL here after publishing:

**Live demo:** _Add deployment URL_

## Author

**Avelexis**
