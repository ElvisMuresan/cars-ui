import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarById } from './api/car-api';

interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  engine: string;
  horsePower: number;
}

interface CarDetailsProps {
  token: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const carData = await fetchCarById(Number(id), token)
        setCar(carData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch car details');
        setLoading(false);
      }
    };

    loadCar();
  }, [id, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!car) {
    return <p>No car found</p>;
  }

  return (
    <div className="mt-11 table-auto mb-4 w-full bg-slate-800 border-collapse border border-slate-400 rounded-md p-14 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
      <h2 className="text-3xl mb-4">Car Details</h2>
      <ul>
        <li><strong>ID:</strong> {car.id}</li>
        <li><strong>Brand:</strong> {car.brand}</li>
        <li><strong>Model:</strong> {car.model}</li>
        <li><strong>Color:</strong> {car.color}</li>
        <li><strong>Engine:</strong> {car.engine}</li>
        <li><strong>HorsePower:</strong> {car.horsePower}</li>
      </ul>
    </div>
  );
};

export default CarDetails;
