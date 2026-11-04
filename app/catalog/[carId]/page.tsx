import { notFound } from 'next/navigation';
import CarDetails from '../../../components/CarDetails/CarDetails';
import { getCarById } from '../../../lib/api';

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
