import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleFoodItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); // Initialize as null for public users

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/addfood/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch food item');
        }
        const data = await response.json();
        setFoodItem(data);
        setNotesList(data.notes || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  const calculateTimeLeft = (expiryDate) => {
    if (!expiryDate) return { expired: false };

    const now = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry - now;

    if (difference <= 0) {
      return { expired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    return {
      days,
      hours,
      minutes,
      expired: false
    };
  };

  const handleAddNote = async () => {
    if (!note.trim()) return;

    try {
      const newNote = {
        text: note,
        postedBy: currentUserId || 'anonymous', // Handle public users
        postedDate: new Date().toISOString()
      };

      const response = await fetch(`http://localhost:3000/addfood/${id}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error('Failed to add note');
      }

      const updatedFood = await response.json();
      setNotesList(updatedFood.notes);
      setNote('');
    } catch (err) {
      setError('Failed to add note');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );

  if (!foodItem) return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Warning: </strong>
      <span className="block sm:inline">Food item not found</span>
    </div>
  );

  const timeLeft = calculateTimeLeft(foodItem.expiryDate);
  const isOwner = foodItem.userId && currentUserId && foodItem.userId === currentUserId;
  const canAddNote = !currentUserId || isOwner; // Allow public users or owner to add notes

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Fridge
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={foodItem.imageUrl || '/default-food-image.jpg'}
              alt={foodItem.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/default-food-image.jpg';
              }}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{foodItem.name}</h1>
            <div className="mb-6">
              {timeLeft.expired ? (
                <span className="inline-block bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full mb-2">
                  Expired
                </span>
              ) : (
                <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-2">
                  {foodItem.expiryDate ? `Expires in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m` : 'No expiry date'}
                </div>
              )}
              <p className="text-gray-600 mb-2"><span className="font-semibold">Expiry Date:</span> {foodItem.expiryDate ? new Date(foodItem.expiryDate).toLocaleDateString() : 'N/A'}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Category:</span> {foodItem.category || 'Not specified'}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Quantity:</span> {foodItem.quantity || 'Not specified'}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Unit:</span> {foodItem.unit || 'Not specified'}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Description:</span> {foodItem.description || 'No description'}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Added by:</span> {foodItem.userEmail || 'Unknown'}</p>
              <p className="text-gray-600 mb-2"><span className="font-semibold">Added on:</span> {foodItem.createdAt ? new Date(foodItem.createdAt).toLocaleDateString() : 'Unknown'}</p>
            </div>

            {/* Only show edit/delete buttons if user is the owner */}
            {isOwner && (
              <div className="flex space-x-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors duration-300">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes</h2>
        {notesList.length > 0 ? (
          <div className="space-y-4">
            {notesList.map((noteItem, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <p className="text-gray-700 mb-1">{noteItem.text}</p>
                <p className="text-xs text-gray-500">
                  Posted by {noteItem.postedBy === currentUserId ? 'You' : (noteItem.postedBy || 'Anonymous')} on {new Date(noteItem.postedDate).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notes yet</p>
        )}
      </div>

      {/* Add Note Section - Available to all users */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Note</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Write your note here..."
        />
        <button
          onClick={handleAddNote}
          disabled={!note.trim()}
          className={`py-2 px-4 rounded transition-colors duration-300 ${note.trim() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default SingleFoodItem;