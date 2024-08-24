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
    <div >
      <h2 className="text-2xl mb-4">Cars List</h2>
      <table className="mt-11 table-auto mb-4 w-full bg-slate-800 border-collapse border border-slate-400 rounded-md p-14 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <thead>
          <tr>
            <th className="text-right px-5 py-3 border-b">Id</th>
            <th className="text-right px-5 py-3 border-b">Brand</th>
            <th className="text-right px-5 py-3 border-b">Model</th>
            <th className="text-right px-5 py-3 border-b">Color</th>
            <th className="text-right px-5 py-3 border-b">Engine</th>
            <th className="text-right px-5 py-3 border-b">HorsePower</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr className="cursor-pointer hover:bg-slate-600 transition-colors" key={car.id}>
              <td className="text-center border px-4 py-2">{car.id}</td>
              <td className="text-center border px-4 py-2">{car.brand}</td>
              <td className="text-center border px-4 py-2">{car.model}</td>
              <td className="text-center border px-4 py-2">{car.color}</td>
              <td className="text-center border px-4 py-2">{car.engine}</td>
              <td className="text-center border px-4 py-2">{car.horsePower}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsList;
