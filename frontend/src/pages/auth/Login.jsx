import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../constants";
import api from "../../../api";

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await api.post('/api/token/', {
                username: data.username,
                password: data.password
            });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate('/company');
            alert("Login successful!");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
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
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
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

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <Link to="/register" className="text-purple-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
