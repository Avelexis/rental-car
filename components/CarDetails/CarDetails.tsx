import Image from 'next/image';
import BookingForm from '../BookingForm/BookingForm';
import type { Car } from '../../lib/types';
import styles from './CarDetails.module.css';

const iconSources: Record<string, string> = {
  location: '/svg/car-details.svg#icon-location',
  check: '/svg/car-details.svg#icon-check',
  year: '/svg/calendar.svg#icon-year',
  car: '/svg/car.svg#icon-car',
  fuel: '/svg/fuel.svg#icon-fuel',
  settings: '/svg/engine.svg#icon-settings',
  mileage: '/svg/mileage.svg#icon-mileage',
};

function InfoIcon({ kind }: { kind: string }) {
  const isFilledIcon = ['year', 'car', 'fuel', 'settings', 'mileage'].includes(kind);

  return (
    <span className={styles.iconWrap} aria-hidden="true">
      <svg
        className={`${styles.icon} ${isFilledIcon ? styles.filledIcon : ''}`}
        viewBox="0 0 16 16"
      >
        <use href={iconSources[kind] ?? iconSources.check} />
      </svg>
    </span>
  );
}

export default function CarDetails({ car }: { car: Car }) {
  const rows = [
    ['year', `Year: ${car.year}`],
    ['car', `Type: ${car.type}`],
    ['fuel', `Fuel Consumption: ${car.fuelConsumption}`],
    ['settings', `Engine: ${car.engine}`],
    ['mileage', `Mileage: ${car.mileage} km`],
  ];
  return (
    <main className={styles.main}>
      <section className={styles.layout}>
        <div className={styles.leftColumn}>
          <div className={styles.photo}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />
          </div>
          <BookingForm carId={car.id} className={styles.bookingForm} />
        </div>
        <div className={styles.info}>
          <div className={styles.summary}>
            <div className={styles.heading}>
              <h1>
                {car.brand} {car.model}, {car.year}
              </h1>
              <span>Article: {car.id.slice(0, 4)}</span>
            </div>
            <p className={styles.location}>
              <InfoIcon kind="location" />
              {car.location.city}, {car.location.country}
            </p>
            <p className={styles.price}>${car.rentalPrice}</p>
            <p className={styles.description}>{car.description}</p>
          </div>
          <div className={styles.detailsContent}>
            <h2>Rental Conditions:</h2>
            <ul className={styles.list}>
              {car.rentalConditions.map((item) => (
                <li key={item}>
                  <InfoIcon kind="check" />
                  {item}
                </li>
              ))}
            </ul>
            <hr />
            <h2>Car Specifications:</h2>
            <ul className={styles.list}>
              {rows.map(([icon, text]) => (
                <li key={text}>
                  <InfoIcon kind={icon} />
                  {text}
                </li>
              ))}
            </ul>
            <hr />
            <h2>Features:</h2>
            <ul className={styles.list}>
              {car.features.map((item) => (
                <li key={item}>
                  <InfoIcon kind="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
