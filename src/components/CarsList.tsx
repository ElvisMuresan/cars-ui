import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Car {
  id: number;
  brand: string;
  model: string;
  color: string;
  engine: string;
  horsePower: number;
}

interface CarsListProps {
  token: string;
}

const CarsList: React.FC<CarsListProps> = ({ token }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars', {
          headers: {
            Authorization: token,
          },
        });
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
      }
    };

    fetchCars();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Cars List</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2">Brand</th>
            <th className="py-2">Model</th>
            <th className="py-2">Color</th>
            <th className="py-2">Engine</th>
            <th className="py-2">HorsePower</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td className="border px-4 py-2">{car.brand}</td>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.color}</td>
              <td className="border px-4 py-2">{car.engine}</td>
              <td className="border px-4 py-2">{car.horsePower}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsList;
