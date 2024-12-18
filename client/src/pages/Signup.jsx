import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/signup`, formData);
      if (res?.data?.success) {
        alert(res?.data?.message);
        navigate("/login");
      } else {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(220,220,220,1) 35%, rgba(255,255,255,1) 100%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col border border-gray-300 rounded-lg p-4 w-72 h-fit gap-4 sm:w-[320px] bg-white bg-opacity-80 shadow-md">
          <h1 className="text-3xl text-center font-semibold text-gray-800">
            Signup
          </h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="font-semibold text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="p-2 rounded border border-gray-300 bg-gray-100"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="p-2 rounded border border-gray-300 bg-gray-100"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="p-2 rounded border border-gray-300 bg-gray-100"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold text-gray-700">
              Address:
            </label>
            <textarea
              maxLength={200}
              type="text"
              id="address"
              className="p-2 rounded border border-gray-300 resize-none bg-gray-100"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold text-gray-700">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              className="p-2 rounded border border-gray-300 bg-gray-100"
              onChange={handleChange}
            />
          </div>
          <p className="text-gray-600 text-sm hover:underline">
            <Link to={`/login`}>Have an account? Login</Link>
          </p>
          <button className="p-3 text-white bg-gray-600 rounded hover:opacity-90">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
