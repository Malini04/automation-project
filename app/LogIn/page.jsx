"use client";
import { useState } from "react";
import {signIn} from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisibilityChange = (event) => {
    setPasswordVisible(event.target.checked);
  };

  const [gmail, setGmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username, 
        gmail, 
        password,
        redirect: false,
      });

      console.log(res);

      if(res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/Form");
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    }

  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            id="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="gmail"
            className="block text-sm font-medium text-gray-700"
          >
            Gmail
          </label>
          <input
            type="email"
            onChange={(e) => setGmail(e.target.value)}
            name="gmail"
            id="gmail"
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
            onChange={(e) => setPassword(e.target.value)}
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
            <label
              htmlFor="togglePasswordVisibility"
              className="text-sm text-gray-600"
            >
              Show Password
            </label>
          </div>
        </div>

        <div>

        {error && <div className="text-red-500 text-sm">{error}</div>} 

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
};

export default Page;
