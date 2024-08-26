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
    <div className='bg-slate-800 border border-slate-400 rounded-md p-24 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative'>
      <h2 className='text-4xl text-white font-bold text-center mb-6'>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative my-4">
          <input
            type="text"
            className='peer block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700'
            placeholder=" "
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <label 
            htmlFor="brand"               
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Brand
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            id="model"
            className='peer block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700'
            placeholder=" "
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <label  
            htmlFor="model"
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Model
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            id="color"
            className='peer block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700'
            placeholder=" "
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <label  
            htmlFor="color"
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Color
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            id="engine"
            className='peer block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700'
            placeholder=" "
            value={engine}
            onChange={(e) => setEngine(e.target.value)}
          />
          <label  
            htmlFor="engine" 
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            Engine
          </label>
        </div>

        <div className="relative mb-4">
          <input
            type="number"
            id="horsePower"
            className='peer block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-700'
            placeholder=" "
            value={horsePower}
            onChange={(e) => setHorsePower(parseInt(e.target.value, 10))}
          />
          <label 
            htmlFor="horsePower" 
            className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
          >
            HorsePower
          </label>
        </div>

        <div className="flex items-center justify-between">
          <Button className='w-full mb-4 text-[18px] mt-6 rounded-full py-2' type="submit">Update Car</Button>
        </div>
      </form>
  </div>
  );
};

export default EditCar;
