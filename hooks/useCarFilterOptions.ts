'use client';

import { useQuery } from '@tanstack/react-query';
import { getCarFilterOptions } from '../lib/api';

export function useCarFilterOptions() {
  return useQuery({
    queryKey: ['car-filter-options'],
    queryFn: getCarFilterOptions,
  });
}
