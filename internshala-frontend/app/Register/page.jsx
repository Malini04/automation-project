"use client";
import { NextResponse } from "next/server";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [gmail, setGmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handlePasswordVisibilityChange = (event) => {
    setPasswordVisible(event.target.checked);
  };

  const handleConfirmPasswordVisibilityChange = (event) => {
    setConfirmPasswordVisible(event.target.checked);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if(!gmail || !username || !password || !confirmPassword) {
      setError("All fields are mandatory to fill");
      return;
    }

    try {
      const res = await fetch("api/userExists", {
        method: "POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({gmail})
      })

      const {existingUser} = await res.json();

      if(existingUser) {
        setError("User already exists");
        setGmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        return;
      }

      //Register the new user
      const response = await fetch("api/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gmail,
          username,
          password,
          confirmPassword,
        }),
      });


      if (response.ok) {
        console.log("Form submission successful, resetting form...");
        setGmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        // form.reset();
        console.log("Form reset...")
        router.push("/Form");
      } else {
        const result = await response.json();
        setError(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 mb-8 mt-0 mx-auto space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="gmail"
            className="block text-sm font-medium text-gray-700"
          >
            Gmail
          </label>
          <input
            type="email"
            name="gmail"
            id="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <label
              htmlFor="togglePasswordVisibility"
              className="text-sm text-gray-600"
            >
              Show Password
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <div className="mt-2">
            <input
              type="checkbox"
              id="toggleConfirmPasswordVisibility"
              className="mr-2"
              checked={confirmPasswordVisible}
              onChange={handleConfirmPasswordVisibilityChange}
            />
            <label
              htmlFor="toggleConfirmPasswordVisibility"
              className="text-sm text-gray-600"
            >
              Show Confirm Password
            </label>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">          
          {error}
        </div>
        
        )}
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-950 hover:bg-stone-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit / Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
