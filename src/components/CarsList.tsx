import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { Button, Modal } from 'flowbite-react';
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
  const [sortKey, setSortKey] = useState<keyof Car>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); 
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null); 
  const navigate = useNavigate()

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars(token)
        setCars(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error
        setError(error.message);
        setLoading(false);
      }
    };

    loadCars();
  }, [token]);

  const fetchCarById = (id: number) => {
    navigate(`/${id}`)
  }

  const sortCars = (key: keyof Car) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);
  };

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

  const filteredCars = cars.filter(car => 
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.engine.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <Button className="w-full text-[18px] rounded py-2 h-12 px-4 max-w-xs" color="failure" onClick={handleBulkDeleteClick}>
          Delete all cars
        </Button>
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
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <Modal.Header>
            Confirm Delete
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete the car <strong>{selectedCar.brand} {selectedCar.model}</strong>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={handleDeleteCar}>
              Confirm
            </Button>
            <Button color="gray" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showBulkDeleteModal && (
        <Modal show={showBulkDeleteModal} onClose={() => setShowBulkDeleteModal(false)}>
          <Modal.Header>
            Confirm Bulk Delete
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete all cars?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={handleBulkDeleteCars}>
              Confirm
            </Button>
            <Button color="gray" onClick={() => setShowBulkDeleteModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CarsList;
