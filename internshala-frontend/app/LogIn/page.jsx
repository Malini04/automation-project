"use client"
import React from 'react'
import { useState } from 'react';

const page = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibilityChange = (event) => {
    setPasswordVisible(event.target.checked);
  };


  return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <form className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
                </label>
                <input
                type="text"
                name="username"
                id="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                />
            </div>
          <div>
            <label htmlFor="gmail" className="block text-sm font-medium text-gray-700">
              Gmail
            </label>
            <input
              type="email"
              name="gmail"
              id="gmail"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <div className="mt-2">
              <input
                type="checkbox"
                id="togglePasswordVisibility"
                className="mr-2"
                checked={passwordVisible}
                onChange={handlePasswordVisibilityChange}
              />
              <label htmlFor="togglePasswordVisibility" className="text-sm text-gray-600">
                Show Password
              </label>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-950 hover:bg-stone-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
  );
}

export default page
