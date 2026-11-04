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
          sizes="(max-width: 375px) calc(100vw - 272px), (max-width: 768px) calc(50vw - 168px), (max-width: 1100px) calc(33.333vw - 133.333px), (max-width: 1440px) calc(25vw - 116px), 244px"
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
        target="_blank"
        rel="noopener noreferrer"
      >
        Read more
      </Link>
    </article>
  );
}
