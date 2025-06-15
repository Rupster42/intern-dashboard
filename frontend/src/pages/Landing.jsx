import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white flex flex-col items-center justify-center px-4">
            <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <div className="relative">
                    <Globe className="w-20 h-20 text-blue-100" />
                    <div className="absolute inset-0 bg-blue-200 rounded-full opacity-20 animate-ping" />
                </div>
            </motion.div>
            <motion.h1
                className="text-5xl font-bold mb-4 text-center"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                GlobePulse
            </motion.h1>

            <motion.p
                className="text-lg text-center mb-10 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Empower your workforce. Track company progress. Connect with your team.
            </motion.p>

            <motion.div
                className="flex gap-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <Link
                    to="/register"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition"
                >
                    Register
                </Link>
                <Link
                    to="/login"
                    className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-xl font-semibold transition"
                >
                    Login
                </Link>
            </motion.div>
        </div>
    );
}

