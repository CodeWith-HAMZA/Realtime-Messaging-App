"use client";
import Link from "next/link";
import React, { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", formData.username);
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("confirmPassword", formData.confirmPassword);
    console.log(form);

    // try {
    //   // Make a fetch or Axios request to send the form data to your server
    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     body: form,
    //   });

    //   if (response.ok) {
    //     // Registration was successful, handle the response
    //     const data = await response.json();
    //     console.log("Registration successful:", data);
    //   } else {
    //     // Registration failed, handle the error
    //     console.error("Registration failed");
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error);
    // }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-semibold mb-6 text-center text-black">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-gray-800 font-medium text-black"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-gray-800 font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-800 font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-gray-800 font-medium text-black"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md bg-gray-200 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-4 flex justify-between items-center">
          <hr className="w-1/4 border-t border-gray-300" />
          <span className="text-gray-600 text-black">OR</span>
          <hr className="w-1/4 border-t border-gray-300" />
        </div>
        <div className="mt-4 space-y-2">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300">
            Register with Facebook
          </button>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md transition duration-300">
            Register with Google
          </button>
        </div>
        <p className="text-gray-600 mt-6 text-center text-black">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        <p className="text-gray-600 mt-4 text-center text-black">
          By registering, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
