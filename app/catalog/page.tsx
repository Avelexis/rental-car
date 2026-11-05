import CatalogClient from './CatalogClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Catalog',
  description:
    'Explore available rental cars and filter by brand, hourly price, and mileage.',
};

export default function CatalogPage() {
  return <CatalogClient />;
}
