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
    <div className="bg-slate-800 border border-slate-400 rounded-md p-16 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-w-lg mx-auto">
      <h2 className="text-4xl text-white font-bold text-center mb-8">Car Details</h2>
      <ul className="text-white space-y-4">
        <li>
          <span className="font-semibold">ID:</span> {car.id}
        </li>
        <li>
          <span className="font-semibold">Brand:</span> {car.brand}
        </li>
        <li>
          <span className="font-semibold">Model:</span> {car.model}
        </li>
        <li>
          <span className="font-semibold">Color:</span> {car.color}
        </li>
        <li>
          <span className="font-semibold">Engine:</span> {car.engine}
        </li>
        <li>
          <span className="font-semibold">HorsePower:</span> {car.horsePower}
        </li>
      </ul>
    </div>

  );
};

export default CarDetails;
