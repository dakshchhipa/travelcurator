import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      dispatch(loginStart());
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data?.success) {
        dispatch(loginSuccess(data?.user));
        alert(data?.message);
        navigate("/");
      } else {
        dispatch(loginFailure(data?.message));
        alert(data?.message);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
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
        <div className="flex flex-col border border-gray-300 rounded-lg p-4 w-72 h-fit gap-5 sm:w-[320px] bg-white bg-opacity-80 shadow-md">
          <h1 className="text-3xl text-center font-semibold text-gray-800">Login</h1>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="p-3 rounded border border-gray-300 bg-gray-100"
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
              className="p-3 rounded border border-gray-300 bg-gray-100"
              onChange={handleChange}
            />
          </div>
          <p className="text-gray-600 text-sm hover:underline">
            <Link to={`/signup`}>Don't have an account? Signup</Link>
          </p>
          <button
            disabled={loading}
            className="p-3 text-white bg-gray-600 rounded hover:opacity-90"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
