'use client';

import CarCard from '../CarCard/CarCard';
import Loader from '../Loader/Loader';
import NoCarsFound from '../NoCarsFound/NoCarsFound';
import type { Car } from '../../lib/types';
import styles from './CarList.module.css';

type CarListProps = {
  cars: Car[];
  hasLoaded: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  onResetFilters: () => void;
};

export default function CarList({
  cars,
  hasLoaded,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  onResetFilters,
}: CarListProps) {
  const hasNoCars = hasLoaded && cars.length === 0;

  return (
    <section
      className={styles.results}
      aria-live="polite"
      aria-busy={isFetching}
    >
      {(cars.length > 0 || isFetching || hasNoCars) && (
        <div
          className={`${styles.cardsArea} ${
            isFetching || hasNoCars ? styles.cardsAreaReserved : ''
          }`}
        >
          {cars.length > 0 && (
            <ul className={styles.grid}>
              {cars.map((car) => (
                <li key={car.id}>
                  <CarCard car={car} />
                </li>
              ))}
            </ul>
          )}
          {hasNoCars && !isFetching && <NoCarsFound onReset={onResetFilters} />}
          {isFetching && <Loader />}
        </div>
      )}

      {cars.length > 0 && hasNextPage && (
        <div className={styles.loadMoreWrapper}>
          <button
            className={styles.loadMoreButton}
            type="button"
            onClick={onLoadMore}
            disabled={isFetching}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </section>
  );
}
