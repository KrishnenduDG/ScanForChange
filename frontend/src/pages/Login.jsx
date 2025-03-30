import React, { useEffect, useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ defaultTab = 'login' }) => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            if (activeTab === "login") {
                const { data } = await axios.post("https://scanforchange.onrender.com/api/auth/login", {
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem("token", data.token);
                alert("Login Successful");
                setLoading(false);
                navigate("/dashboard");
            } else {
                if (formData.password !== formData.confirmPassword) {
                    return alert("Passwords do not match!");
                }
                await axios.post("https://scanforchange.onrender.com/api/auth/signup", {
                    email: formData.email,
                    password: formData.password
                });
                alert("Registration Successful");
                setLoading(false);
                setActiveTab("login");
            }
        } catch (error) {
            setLoading(false);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-8 pt-8">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                            Welcome to ScanForChange
                        </h1>
                        <p className="text-center text-gray-600 mb-6">
                            Join our community of eco-warriors
                        </p>

                        <div className="flex mb-8 justify-center gap-5">
                            <button
                                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'login' ? "border-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveTab('login')}>
                                Sign In
                            </button>
                            <button
                                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'register' ? "border-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                                onClick={() => setActiveTab('register')}>
                                Create Account
                            </button>
                        </div>
                    </div>

                    <div className="p-8 pt-0">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {activeTab === 'register' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'login' && (
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                        <span className="ml-2 text-gray-600">Remember me</span>
                                    </label>
                                    <a href="#" className="text-green-600 hover:text-green-500">
                                        Forgot password?
                                    </a>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                            >
                                {loading ? 'Loading...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;