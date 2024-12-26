// pages/dashboard.tsx (form example)

'use client'

import React, { useState } from 'react';



const DashboardPage = () => {
  const [property, setProperty] = useState({
    name: '',
    location: '',
    price: '',
    description: ''
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(property),
      });

      if (response.ok) {
        alert('Property added successfully!');
        // Optionally, you could refetch the properties here to update the list
      } else {
        throw new Error('Failed to add property');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-green-200'>
      <h1>Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={property.description}
            onChange={handleChange}
            required
          />
        </div>
        <button className='rounded-md hover:border-l-amber-400' type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default DashboardPage;
