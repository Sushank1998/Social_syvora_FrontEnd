import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import axios from "axios";

export default function LoginForm({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5432/api/v1/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Response:", res.data);
      if (res.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        dispatch(login(res.data)); 
      } else {
        alert("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => setLogin(false)}
            className="text-indigo-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
