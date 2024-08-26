import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { fetchCarById, updateCarById } from './api/car-api';

interface EditCarProps {
  token: string;
}

const EditCar: React.FC<EditCarProps> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [engine, setEngine] = useState<string>('');
  const [horsePower, setHorsePower] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCar = async () => {
      try {
        const car = await fetchCarById(Number(id), token)
        setBrand(car.brand);
        setModel(car.model);
        setColor(car.color);
        setEngine(car.engine);
        setHorsePower(car.horsePower);
      } catch (error) {
        console.error('Failed to fetch car details', error);
      }
    };

    loadCar();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCarById(Number(id), {brand, model, color, engine, horsePower}, token)
      navigate('/'); 
    } catch (error) {
      console.error('Failed to update car', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Edit Car</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Brand
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Model
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Color
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Engine
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            HorsePower
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={horsePower}
            onChange={(e) => setHorsePower(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Car
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
