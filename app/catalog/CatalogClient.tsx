'use client';

import { useState } from 'react';
import CarList from '../../components/CarList/CarList';
import CatalogFilters from '../../components/CatalogFilters/CatalogFilters';
import { useCarFilterOptions } from '../../hooks/useCarFilterOptions';
import { useCars } from '../../hooks/useCars';
import type { CatalogFilters as CatalogFiltersValues } from '../../lib/types';
import styles from './catalog.module.css';

const EMPTY_FILTERS: CatalogFiltersValues = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};

export default function CatalogClient() {
  const [draftFilters, setDraftFilters] =
    useState<CatalogFiltersValues>(EMPTY_FILTERS);
  const [activeFilters, setActiveFilters] =
    useState<CatalogFiltersValues>(EMPTY_FILTERS);

  const { data: filterOptions, isError: filterOptionsError } =
    useCarFilterOptions();

  const carsQuery = useCars(activeFilters);

  function handleFilterChange(name: keyof CatalogFiltersValues, value: string) {
    setDraftFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSearch() {
    setActiveFilters({ ...draftFilters });
  }

  function handleClearFilters() {
    setDraftFilters(EMPTY_FILTERS);
    setActiveFilters(EMPTY_FILTERS);
  }

  return (
    <main className={styles.main}>
      <div className="container">
        {filterOptionsError && (
          <p className={styles.error} role="alert">
            Could not load filter options. Please try again.
          </p>
        )}

        {filterOptions && (
          <CatalogFilters
            value={draftFilters}
            options={filterOptions}
            disabled={carsQuery.isFetching}
            onChange={handleFilterChange}
            onSearch={handleSearch}
            onClear={handleClearFilters}
          />
        )}

        {carsQuery.isError && (
          <p className={styles.error} role="alert">
            Could not load cars. Please try again.
          </p>
        )}

        <CarList
          cars={carsQuery.cars}
          hasLoaded={carsQuery.data !== undefined}
          isFetching={carsQuery.isFetching}
          hasNextPage={carsQuery.hasNextPage}
          isFetchingNextPage={carsQuery.isFetchingNextPage}
          onLoadMore={() => void carsQuery.fetchNextPage()}
          onResetFilters={handleClearFilters}
        />
      </div>
    </main>
  );
}
