import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCar } from '../actions/inventoryActions'; // Your action to add the car

export const AddCar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // State to manage the input values
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    odometer: '',
    scratches: '',
    original_paint: '',
    reported_accident: false,
    previous_buyer: false,
    registration_place: '',
    description: []
  });

  const [error, setError] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle adding description dynamically
  const handleDescriptionChange = (e, index) => {
    const { value } = e.target;
    const updatedDescription = [...formData.description];
    updatedDescription[index] = value;
    setFormData({ ...formData, description: updatedDescription });
  };

  const addDescriptionField = () => {
    setFormData({ ...formData, description: [...formData.description, ''] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation (you can customize this)
    if (!formData.title || !formData.odometer || !formData.image) {
      setError('Please fill in all the required fields.');
      return;
    }

    dispatch(addCar(formData));

    // Redirect to inventory list or car details page after successful submission
    history.push('/inventory');
  };

  return (
    <div>
      <h1>Add New Car</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter car title"
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label>Odometer (km):</label>
          <input
            type="number"
            name="odometer"
            value={formData.odometer}
            onChange={handleChange}
            placeholder="Enter odometer reading"
          />
        </div>

        <div>
          <label>Scratches:</label>
          <input
            type="number"
            name="scratches"
            value={formData.scratches}
            onChange={handleChange}
            placeholder="Enter number of scratches"
          />
        </div>

        <div>
          <label>Original Paint:</label>
          <input
            type="text"
            name="original_paint"
            value={formData.original_paint}
            onChange={handleChange}
            placeholder="Enter original paint color"
          />
        </div>

        <div>
          <label>Reported Accident:</label>
          <input
            type="checkbox"
            name="reported_accident"
            checked={formData.reported_accident}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Previous Buyer:</label>
          <input
            type="checkbox"
            name="previous_buyer"
            checked={formData.previous_buyer}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Registration Place:</label>
          <input
            type="text"
            name="registration_place"
            value={formData.registration_place}
            onChange={handleChange}
            placeholder="Enter registration place"
          />
        </div>

        <div>
          <label>Description:</label>
          {formData.description.map((desc, index) => (
            <div key={index}>
              <textarea
                value={desc}
                onChange={(e) => handleDescriptionChange(e, index)}
                placeholder="Enter description"
              />
            </div>
          ))}
          <button type="button" onClick={addDescriptionField}>
            Add Description
          </button>
        </div>

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};
