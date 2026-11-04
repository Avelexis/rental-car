'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getCars } from '../lib/api';
import type { CatalogFilters } from '../lib/types';

const CARS_PER_PAGE = 12;

function toOptionalNumber(value: string): number | undefined {
  if (value.trim() === '') {
    return undefined;
  }

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : undefined;
}

export function useCars(filters: CatalogFilters) {
  const query = useInfiniteQuery({
    queryKey: ['cars', filters],

    queryFn: ({ pageParam }) =>
      getCars({
        brand: filters.brand || undefined,
        price: toOptionalNumber(filters.price),
        minMileage: toOptionalNumber(filters.minMileage),
        maxMileage: toOptionalNumber(filters.maxMileage),
        perPage: CARS_PER_PAGE,
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const cars = query.data?.pages.flatMap((page) => page.cars) ?? [];

  return {
    ...query,
    cars,
  };
}
