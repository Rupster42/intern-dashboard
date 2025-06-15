import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import api from "../../../api";

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const Register = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [departments, setDepartments] = useState([]);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOptions() {
            try {
                const depResponse = await fetch('http://127.0.0.1:8000/api/departments/options/');
                const countryResponse = await fetch('http://127.0.0.1:8000/api/countries/options/');

                const depData = await depResponse.json();
                const countryData = await countryResponse.json();

                setDepartments(depData);
                setCountries(countryData);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        }
        fetchOptions();
    }, []);

    const onSubmit = async (data) => {
        try {
            const cleanedData = {
                username: data.username,
                email: data.email,
                password: data.password,
                department: data.department,
                country: data.country
            };

            const res = await api.post('/api/users/create/', cleanedData);
            alert("Registration successful! Please log in.");
            navigate('/login');
        } catch (error) {
            console.error("Error during registration:", error);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <motion.div
                    className="flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <div className="relative">
                        <Globe className="w-20 h-20 text-black" />
                        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-ping" />
                    </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Username */}
                    <div>
                        <input
                            {...register("username", {
                                required: "Username is required",
                                maxLength: { value: 20, message: "Max 20 characters" },
                                minLength: { value: 3, message: "Min 3 characters" }
                            })}
                            placeholder="Username"
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Enter a valid email"
                                }
                            })}
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Min 8 characters" }
                            })}
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Department */}
                    <div>
                        <select
                            {...register("department", { required: "Please select a department" })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep.id} value={dep.id}>{dep.name}</option>
                            ))}
                        </select>
                        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
                    </div>

                    {/* Country */}
                    <div>
                        <select
                            {...register("country", { required: "Please select your country" })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.value || country}>
                                    {country.label || country}
                                </option>
                            ))}
                        </select>
                        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
