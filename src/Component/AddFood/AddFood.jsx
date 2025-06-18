import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Dairy',
    quantity: '',
    expiryDate: '',
    description: '',
    imageUrl: '',
    userEmail: '',
    userId: ''
  });

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = 'd887aa1f55a982c1a6829f027d626c89';

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/addfood' } });
      return;
    }

    const initializeForm = async () => {
      setFormData(prev => ({
        ...prev,
        userEmail: user.email,
        userId: user.uid
      }));

      if (id) {
        setIsEditMode(true);
        await fetchFoodItem(id);
      }
      setIsLoading(false);
    };

    initializeForm();
  }, [user, navigate, id]);

  const fetchFoodItem = async (foodId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`http://localhost:3000/addfood/${foodId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(`Failed to fetch food item: ${response.status}`);
      }

      const data = await response.json();
      setFormData({
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        expiryDate: data.expiryDate.split('T')[0],
        description: data.description,
        imageUrl: data.imageUrl,
        userEmail: data.userEmail,
        userId: data.userId
      });

      if (data.imageUrl) setPreviewImage(data.imageUrl);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      console.error('Fetch error:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.length) handleImageUpload(files[0]);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleImageUpload = async (file) => {
    if (!file.type.match('image.*')) {
      setError('Please upload an image file');
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      toast.error('Image size should be less than 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Image upload failed');

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.data.url }));
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error(data.error?.message || 'Image upload failed');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.quantity || !formData.expiryDate) {
      setError('Please fill in all required fields');
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const foodData = {
        name: formData.name,
        category: formData.category,
        quantity: formData.quantity,
        expiryDate: formData.expiryDate,
        description: formData.description,
        imageUrl: formData.imageUrl,
        userEmail: formData.userEmail,
        userId: formData.userId,
        status: 'active',
        addedDate: new Date().toISOString()
      };

      const toastId = toast.loading(isEditMode ? 'Updating...' : 'Adding...');

      const url = isEditMode
        ? `http://localhost:3000/addfood/${id}`
        : 'http://localhost:3000/addfood';

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(foodData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Operation failed');
      }

      toast.update(toastId, {
        render: isEditMode ? 'Updated successfully!' : 'Added successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });

      setTimeout(() => navigate('/my-items'), 1500);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      console.error('Submission error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Please login to continue</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[100px] min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} />

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
            {isEditMode ? 'Edit Food Item' : 'Add Food Item'}
          </h1>
          <p className="mt-2 text-gray-600">
            {isEditMode ? 'Update your food details' : 'Share details about your food'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Organic Apples"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {['Dairy', 'Meat', 'Vegetables', 'Fruits', 'Grains', 'Snacks', 'Beverages', 'Other'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 1 kg, 5 pieces"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional details..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {previewImage ? (
                <div className="mb-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData(prev => ({ ...prev, imageUrl: '' }));
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      Drag and drop or click to select
                    </p>
                    {isUploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                  >
                    Select Image
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-3 px-4 text-white font-medium rounded-lg shadow-md ${
                isUploading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isUploading ? 'Processing...' : (isEditMode ? 'Update Food Item' : 'Add Food Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};