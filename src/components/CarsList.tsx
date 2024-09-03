import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { deleteAllCars, deleteCarById, fetchCars } from './api/car-api';

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
  // const [sortKey, setSortKey] = useState<keyof Car>('id');
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); 
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null); 
  const navigate = useNavigate()

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars(token, searchTerm)
        setCars(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error
        setError(error.message);
        setLoading(false);
      }
    };
    if(searchTerm.length >= 3 || searchTerm === '') {

    loadCars();

  }
}, 500)
return () => clearTimeout(debounceTimeout);
  }, [token, searchTerm]);

  const fetchCarById = (id: number) => {
    navigate(`/${id}`)
  }

  // const sortCars = (key: keyof Car) => {
  //   const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
  //   setSortKey(key);
  //   setSortOrder(order);
  // };

  const handleDeleteClick = (car: Car) => {
    setSelectedCar(car)
    setShowDeleteModal(true)
  }

  const handleDeleteCar = async () => {
    if(!selectedCar) return;
    try {
      await deleteCarById(selectedCar.id, token)
      setCars(cars.filter(car => car.id !== selectedCar.id));
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Failed to delete car', error);
    }
  };

  const handleBulkDeleteClick = () => {
    setShowBulkDeleteModal(true);
  };

  const handleBulkDeleteCars = async () => {
    try {
      const ids = cars.map(car => car.id);
      await deleteAllCars(ids, token)
      setCars([]); 
      setShowBulkDeleteModal(false); 
    } catch (error) {
      console.error('Failed to delete cars', error);
    }
  };


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
      <h2 className="text-4xl mb-8 text-center">Cars List</h2>
      <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Filter by any field..."
        className="p-2 rounded border bg-slate-800 h-12 flex-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button className='w-full text-[18px] rounded py-2 h-12 px-4 max-w-xs' onClick={navigateToAddCar}>Add New Car</Button>
      <Button className="w-full text-[18px] rounded py-2 h-12 px-4 max-w-xs" color="failure" onClick={handleBulkDeleteClick}>
          Delete all cars
        </Button>
      </div>
      <table className="mt-11 table-auto mb-4 w-full bg-slate-800 border-collapse border border-slate-400 rounded-md p-14 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <thead>
          <tr>
            <th className="text-center px-5 py-3 border-b cursor-pointer">
              Id 
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer">
              Brand 
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer">
              Model 
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer">
              Color 
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer">
              Engine 
            </th>
            <th className="text-center px-5 py-3 border-b cursor-pointer">
              HorsePower 
            </th>
            <th className="text-center px-5 py-3 border-b">
              Delete / Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr className="cursor-pointer hover:bg-slate-600 transition-colors" onClick={() => fetchCarById(car.id)} key={car.id}>
              <td className="text-center border px-4 py-2">{car.id}</td>
              <td className="text-center border px-4 py-2" >{car.brand}</td>
              <td className="text-center border px-4 py-2">{car.model}</td>
              <td className="text-center border px-4 py-2">{car.color}</td>
              <td className="text-center border px-4 py-2">{car.engine}</td>
              <td className="text-center border px-4 py-2">{car.horsePower}</td>
              <td className="text-center px-4 py-2 border" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                  <Button
                    className="hover:font-bold mr-5"
                    color="failure"
                    onClick={() => handleDeleteClick(car)}
                  >
                    Delete
                  </Button>

                  <Button
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

      {showDeleteModal && selectedCar && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowDeleteModal(false)}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div 
            className='bg-slate-800 border border-slate-400 rounded-md p-24 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative z-10'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-4xl text-white font-bold text-center mb-6'>Confirm Delete</h2>
            <div className='relative my-4 text-center'>
              <p className='text-white'>
                Are you sure you want to delete the car <strong>{selectedCar.brand} {selectedCar.model}</strong>?
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <Button color="failure" onClick={handleDeleteCar} className='mx-2 w-full text-[18px] rounded-full py-2'>
                Confirm
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)} className='mx-2 w-full text-[18px] rounded-full py-2'>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}


        {showBulkDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setShowBulkDeleteModal(false)}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div 
              className='bg-slate-800 border border-slate-400 rounded-md p-24 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative z-10'
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className='text-4xl text-white font-bold text-center mb-6'>Confirm Bulk Delete</h2>
              <div className='relative my-4 text-center'>
                <p className='text-white'>
                  Are you sure you want to delete all cars?
                </p>
              </div>
              <div className="flex justify-center mt-8">
                <Button color="failure" onClick={handleBulkDeleteCars} className='mx-2 w-full text-[18px] rounded-full py-2'>
                  Confirm
                </Button>
                <Button color="gray" onClick={() => setShowBulkDeleteModal(false)} className='mx-2 w-full text-[18px] rounded-full py-2'>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}


    </div>
  );
};

export default CarsList;
