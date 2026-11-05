import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '../../lib/types';
import styles from './CarCard.module.css';

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  const carName = `${car.brand} ${car.model}, ${car.year}`;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={car.img}
          alt={carName}
          fill
          sizes="(min-width: 1440px) 244px, (min-width: 1100px) calc(33.333vw - 74.667px), (min-width: 768px) calc(50vw - 76px), calc(100vw - 64px)"
        />
      </div>

      <div className={styles.titleRow}>
        <h2 className={styles.title} title={carName}>
          <span>{car.brand} </span>
          <span className={styles.model}>{car.model}</span>
          <span>, {car.year}</span>
        </h2>
        <p className={styles.price}>${car.rentalPrice}</p>
      </div>

      <ul className={styles.details}>
        <li>{car.location.city}</li>
        <li>{car.location.country}</li>
        <li>{car.rentalCompany}</li>
        <li>{car.type}</li>
        <li>{car.mileage} km</li>
      </ul>

      <Link
        className={styles.button}
        href={`/catalog/${car.id}`}
        prefetch={false}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </Link>
    </article>
  );
}
