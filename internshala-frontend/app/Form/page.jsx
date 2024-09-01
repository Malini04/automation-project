"use client";
import React, { useState } from "react";
import Select from "react-select";

const categoriesArray = [
  { label: "Frontend", value: "Frontend Development" },
  { label: "Backend", value: "Backend Development" },
  { label: "Fullstack", value: "Full Stack Development" },
  { label: "ReactJS", value: "ReactJS Development" },
];

const categories = categoriesArray;

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSelectChange = (selected) => {
    setSelectedCategory(selected); // Update state with selected options
    console.log('Selected categories:', selected); // Log the selected options
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with categories:', selectedCategory); // Debugging statement

    // Logic to trigger the Puppeteer script
    try {
      const response = await fetch('/api/run-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedCategories: selectedCategory }),
      });

      console.log('Response status:', response.status); // Debugging statement

      if (!response.ok) {
        throw new Error('Failed to run script');
      }

      const data = await response.json();
      console.log('Script output:', data); // Debugging statement

      setResponseMessage('Script ran successfully');
    } catch (error) {
      console.error('Error running script:', error); // Debugging statement
      setResponseMessage('Error running script');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <form>
        User Details
        <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="Email"
            id="Email"
            placeholder="Internshala Email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
            placeholder="Internshala Password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
      </form>
      
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
        <Select
          options={categories}
          isMulti
          onChange={handleSelectChange}
          value={selectedCategory} // Use state variable for value
        />
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>

      <div className="text-normal font-normal text-gray-700">
        {responseMessage && (
          <div>
            <h2>{responseMessage}</h2>
          </div>
        )}
        {selectedCategory.length > 0 && (
          <div>
            <h3>Selected Categories:</h3>
            <ul>
              {selectedCategory.map(option => (
                <li key={option.value}>{option.label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
