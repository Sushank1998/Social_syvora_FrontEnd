import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../features/authSlice";
import axios from "axios";

export default function SignupForm({ setLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const selecter = useSelector((state) => state.auth.user);
  console.log("selecter", selecter);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login());
      fetch();
    } else {
      alert("Please enter email and password");
    }
  };

  console.log(email, name, password);

  const fetch = async () => {
    const res = await axios.post(
      "http://localhost:5432/api/v1/register",
      {
        username: name,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res=====",res)
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">
          Create Account
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => setLogin(true)}
            className="text-indigo-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
