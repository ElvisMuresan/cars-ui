import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cars/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        setCar(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch car details');
        setLoading(false);
      }
    };

    fetchCar();
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
    <div className="mt-8">
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
