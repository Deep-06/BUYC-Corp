import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchInventoryBYId } from '../actions/inventoryActions';

export const CarDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract id from URL
  const history = useHistory(); // Optional: To navigate back

  // Retrieve the inventory item and its status
  const { items, status, error } = useSelector((state) => state.inventory);

  useEffect(() => {
    // Fetch car details by ID
    dispatch(fetchInventoryBYId({ id }));
  }, [dispatch, id]);

  // Find the car item based on ID
  const car = items.find(item => item._id === id);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div>
      <h1>Car Details</h1>
      <button onClick={() => history.goBack()}>Back</button>

      <div>
        <img src={car.image} alt={car.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
        <h2>{car.title}</h2>
        
        <p><strong>Odometer:</strong> {car.odometer} km</p>
        <p><strong>Scratches:</strong> {car.scratches}</p>
        <p><strong>Original Paint:</strong> {car.original_paint}</p>
        <p><strong>Reported Accident:</strong> {car.reported_accident ? 'Yes' : 'No'}</p>
        <p><strong>Previous Buyer:</strong> {car.previous_buyer ? 'Yes' : 'No'}</p>
        <p><strong>Registration Place:</strong> {car.registration_place}</p>
        
        <div>
          <h3>Description:</h3>
          <ul>
            {car.description && car.description.length > 0 ? (
              car.description.map((desc, index) => <li key={index}>{desc}</li>)
            ) : (
              <li>No description available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
