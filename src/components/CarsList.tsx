import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { Button } from 'flowbite-react';

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
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [sortKey, setSortKey] = useState<keyof Car>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 
  const navigate = useNavigate()

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

  const fetchCarById = (id: number) => {
    navigate(`/${id}`)
  }

  const sortCars = (key: keyof Car) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);
  };

  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.id.toString().includes(searchTerm) ||
    car.horsePower.toString().includes(searchTerm) 
  )
  .sort((a, b) => {
    if (a[sortKey] < b[sortKey]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortKey] > b[sortKey]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const navigateToAddCar = () => {
    navigate('/add-car');
  };

  const navigateToEditCar = (id: number) => {
    navigate(`/edit-car/${id}`);
  };

  return (
    <div >
      <h2 className="text-2xl mb-4">Cars List</h2>
      <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Filter by any field..."
        className="p-2 rounded border bg-slate-800 h-12 flex-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button className='w-full text-[18px] rounded py-2 h-12 px-4 max-w-xs' onClick={navigateToAddCar}>Add New Car</Button>
      </div>
      <table className="mt-11 table-auto mb-4 w-full bg-slate-800 border-collapse border border-slate-400 rounded-md p-14 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <thead>
          <tr>
            <th className="text-center px-5 py-3 border-b cursor-pointer" onClick={() => sortCars('id')}>
              Id {sortKey === 'id' && (sortOrder === 'asc' ? <FaSortUp className="inline-block ml-2"/> : <FaSortDown className="inline-block ml-2"/>)}
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer" onClick={() => sortCars('brand')}>
              Brand {sortKey === 'brand' && (sortOrder === 'asc' ? <FaSortUp className="inline-block ml-2"/> : <FaSortDown className="inline-block ml-2"/>)}
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer" onClick={() => sortCars('model')}>
              Model {sortKey === 'model' && (sortOrder === 'asc' ? <FaSortUp className="inline-block ml-2"/> : <FaSortDown className="inline-block ml-2"/>)}
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer" onClick={() => sortCars('color')}>
              Color {sortKey === 'color' && (sortOrder === 'asc' ? <FaSortUp className="inline-block ml-2"/> : <FaSortDown className="inline-block ml-2"/>)}
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer" onClick={() => sortCars('engine')}>
              Engine {sortKey === 'engine' && (sortOrder === 'asc' ? <FaSortUp className="inline-block ml-2"/> : <FaSortDown className="inline-block ml-2"/>)}
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer" onClick={() => sortCars('horsePower')}>
              HorsePower {sortKey === 'horsePower' && (sortOrder === 'asc' ? <FaSortUp className="inline-block ml-2"/> : <FaSortDown className="inline-block ml-2"/>)}
            </th>
            <th className="text-center px-5 py-3 border-b">
              Delete / Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map(car => (
            <tr className="cursor-pointer hover:bg-slate-600 transition-colors" key={car.id}>
              <td className="text-center border px-4 py-2">{car.id}</td>
              <td className="text-center border px-4 py-2" onClick={() => fetchCarById(car.id)}>{car.brand}</td>
              <td className="text-center border px-4 py-2">{car.model}</td>
              <td className="text-center border px-4 py-2">{car.color}</td>
              <td className="text-center border px-4 py-2">{car.engine}</td>
              <td className="text-center border px-4 py-2">{car.horsePower}</td>
              <td className="text-center px-4 py-2 border">
                <div className="flex justify-end">
                  <Button
                    className="hover:font-bold mr-5"
                    color="failure"
                    gradientMonochrome="failure"
                  >
                    Delete
                  </Button>

                  <Button
                    gradientMonochrome="cyan"
                    onClick={() => navigateToEditCar(car.id)}
                  >
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsList;
