import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';

export const MyItem = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState({ success: null, message: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [foodToDelete, setFoodToDelete] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [foodToUpdate, setFoodToUpdate] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        quantity: '',
        expiryDate: '',
        category: 'Fruits',
        status: 'active',
        notes: ''
    });

    const handleDeleteClick = (id) => {
        setFoodToDelete(id);
        setShowDeleteModal(true);
    };

    const handleUpdateClick = (food) => {
        setFoodToUpdate(food._id);
        setUpdateFormData({
            name: food.name,
            quantity: food.quantity,
            expiryDate: food.expiryDate.split('T')[0], // Format date for input
            category: food.category,
            status: food.status,
            notes: food.notes || ''
        });
        setShowUpdateModal(true);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/addfood/${foodToUpdate}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateFormData)
            });

            if (!response.ok) throw new Error('Failed to update food item');

            toast.success('Food item updated successfully!');
            setShowUpdateModal(false);

            // Refresh the food items list
            fetchFoodItems();
        } catch (error) {
            toast.error(`Error updating food: ${error.message}`);
        }
    };

    const handleConfirmDelete = async () => {
        if (!foodToDelete) return;

        try {
            const response = await fetch(`http://localhost:3000/addfood/${foodToDelete}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete food item');

            setFoodItems(prev => prev.filter(item => item._id !== foodToDelete));
            setShowDeleteModal(false);
            setFoodToDelete(null);
            toast.success('Food item deleted successfully!');
        } catch (error) {
            toast.error(`Error deleting food: ${error.message}`);
        }
    };

    const fetchFoodItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/addfood?userId=${user?.uid}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setFoodItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.uid) {
            fetchFoodItems();
        }
    }, [user]);

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

    return (
        <div className="container mx-auto mt-[100px] px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">My Food Items</h2>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-6">Are you sure you want to delete this food item?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Food Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Update Food Item</h3>
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={updateFormData.name}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Quantity</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={updateFormData.quantity}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={updateFormData.expiryDate}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Category</label>
                                <select
                                    name="category"
                                    value={updateFormData.category}
                                    onChange={handleUpdateChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="Fruits">Fruits</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Grains">Grains</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowUpdateModal(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {foodItems.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Quantity</th>
                                <th className="py-2 px-4 border">Expiry Date</th>
                                <th className="py-2 px-4 border">Category</th>
                                <th className="py-2 px-4 border">Status</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodItems.map(item => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border">{item.name}</td>
                                    <td className="py-2 px-4 border">{item.quantity}</td>
                                    <td className="py-2 px-4 border">
                                        {new Date(item.expiryDate).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4 border">{item.category}</td>
                                    <td className="py-2 px-4 border">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <button
                                            onClick={() => handleUpdateClick(item)}
                                            className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(item._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
                    <p className="font-medium">No food items found. Add your first item!</p>
                </div>
            )}
        </div>
    );
};