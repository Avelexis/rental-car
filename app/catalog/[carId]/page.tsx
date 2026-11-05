import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CarDetails from '../../../components/CarDetails/CarDetails';
import { getCarById } from '../../../lib/api';

export const metadata: Metadata = {
  title: 'Car Details',
  description:
    'View vehicle specifications, rental conditions, and submit a booking request.',
};

export default async function CarDetailsPage({
  params,
}: {
  params: Promise<{ carId: string }>;
}) {
  const { carId } = await params;
  const car = await getCarById(carId).catch(() => null);
  if (!car) notFound();
  return <CarDetails car={car} />;
}
