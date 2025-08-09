import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../Pages/AuthContext/Authprovider';
import { useTheme } from '../../contexts/ThemeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddFood = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useTheme();
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

      const response = await fetch(`https://server-sepia-nine.vercel.app/addfood/${foodId}`, {
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
        ? `https://server-sepia-nine.vercel.app/addfood/${id}`
        : 'https://server-sepia-nine.vercel.app/addfood';

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
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className={`animate-spin rounded-full h-16 w-16 border-4 border-t-4 ${
            isDark
              ? 'border-gray-700 border-t-green-500'
              : 'border-gray-200 border-t-[#124A2F]'
          }`}></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <svg className={`w-16 h-16 mx-auto ${isDark ? 'text-green-400' : 'text-[#124A2F]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please login to access this feature</p>
          <button
            onClick={() => navigate('/login')}
            className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] text-white'
            }`}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[100px] min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={isDark ? 'dark' : 'light'}
        toastClassName={isDark ? 'dark:bg-gray-800 dark:text-white' : ''}
      />

      {/* Animated Food Icons at the top */}
      <div className="fixed top-20 left-0 right-0 z-10 pointer-events-none overflow-hidden">
        <div className="relative w-full h-16">
          {/* Floating Food Icons */}
          <div className="absolute left-0 top-0 animate-bounce-gentle opacity-70">
            <div className="w-8 h-8 text-4xl animate-pulse">🍎</div>
          </div>
          <div className="absolute left-20 top-2 animate-bounce-gentle opacity-60" style={{animationDelay: '0.5s'}}>
            <div className="w-8 h-8 text-3xl animate-pulse">🥕</div>
          </div>
          <div className="absolute left-40 top-1 animate-bounce-gentle opacity-80" style={{animationDelay: '1s'}}>
            <div className="w-8 h-8 text-3xl animate-pulse">🍌</div>
          </div>
          <div className="absolute right-40 top-0 animate-bounce-gentle opacity-70" style={{animationDelay: '1.5s'}}>
            <div className="w-8 h-8 text-4xl animate-pulse">🥖</div>
          </div>
          <div className="absolute right-20 top-2 animate-bounce-gentle opacity-60" style={{animationDelay: '2s'}}>
            <div className="w-8 h-8 text-3xl animate-pulse">🥛</div>
          </div>
          <div className="absolute right-0 top-1 animate-bounce-gentle opacity-80" style={{animationDelay: '2.5s'}}>
            <div className="w-8 h-8 text-3xl animate-pulse">🧀</div>
          </div>

          {/* Moving food items */}
          <div className="absolute top-4 left-0 w-full">
            <div className="flex justify-between items-center opacity-50">
              <div className="animate-ping text-2xl">🍇</div>
              <div className="animate-ping text-2xl" style={{animationDelay: '1s'}}>🥦</div>
              <div className="animate-ping text-2xl" style={{animationDelay: '2s'}}>🍊</div>
              <div className="animate-ping text-2xl" style={{animationDelay: '3s'}}>🥬</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto card p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDark
                ? 'bg-gradient-to-br from-green-600 to-green-700'
                : 'bg-gradient-to-br from-[#124A2F] to-green-600'
            }`}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${
            isDark
              ? 'bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-[#124A2F] to-green-600 bg-clip-text text-transparent'
          }`}>
            {isEditMode ? 'Edit Food Item' : 'Add Food Item'}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
            {isEditMode ? 'Update your food details below' : 'Share details about your food to help reduce waste'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg flex items-center space-x-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Food Name <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Organic Apples, Fresh Milk, etc."
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                isDark
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#124A2F] focus:border-transparent'
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Category <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                  isDark
                    ? 'border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    : 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#124A2F] focus:border-transparent'
                }`}
              >
                {['Dairy', 'Meat', 'Vegetables', 'Fruits', 'Grains', 'Snacks', 'Beverages', 'Other'].map(cat => (
                  <option key={cat} value={cat} className="bg-white dark:bg-gray-700">{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Quantity <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 1 kg, 5 pieces, 2 liters"
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                  isDark
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#124A2F] focus:border-transparent'
                }`}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Expiry Date <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 ${
                isDark
                  ? 'border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#124A2F] focus:border-transparent'
              }`}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Share additional details about your food item, storage conditions, or any special notes..."
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none ${
                isDark
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#124A2F] focus:border-transparent'
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Food Image
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? isDark
                    ? 'border-green-500 bg-green-900/20'
                    : 'border-[#124A2F] bg-green-50'
                  : isDark
                    ? 'border-gray-600 hover:border-green-500 bg-gray-800/50'
                    : 'border-gray-300 hover:border-[#124A2F] bg-gray-50'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {previewImage ? (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-56 max-w-full mx-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                      <span className="text-white font-medium">Preview</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 border border-red-200 dark:border-red-800"
                    onClick={() => {
                      setPreviewImage(null);
                      setFormData(prev => ({ ...prev, imageUrl: '' }));
                    }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isDark
                        ? 'bg-gradient-to-br from-green-800 to-green-700'
                        : 'bg-gradient-to-br from-green-100 to-green-200'
                    }`}>
                      <svg className={`w-8 h-8 ${isDark ? 'text-green-400' : 'text-[#124A2F]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-base font-medium text-gray-700 dark:text-gray-300">
                        Drag and drop your image here
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        or click to browse files
                      </p>
                    </div>
                    {isUploading && (
                      <div className="w-full max-w-xs">
                        <div className={`rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              isDark
                                ? 'bg-gradient-to-r from-green-500 to-green-600'
                                : 'bg-gradient-to-r from-[#124A2F] to-green-600'
                            }`}
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                          Uploading... {uploadProgress}%
                        </p>
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
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                      isDark
                        ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:ring-green-500'
                        : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] focus:ring-[#124A2F]'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Select Image
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Supported formats: JPG, PNG, GIF (Max size: 5MB)
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-4 px-6 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform ${
                isUploading
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : isDark
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 focus:ring-green-500'
                    : 'bg-gradient-to-r from-[#124A2F] to-green-600 hover:from-[#0D3521] hover:to-[#124A2F] hover:scale-105 focus:ring-[#124A2F]'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isEditMode ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 6v6m0 0v6m0-6h6m-6 0H6"} />
                  </svg>
                  <span>{isEditMode ? 'Update Food Item' : 'Add Food Item'}</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};