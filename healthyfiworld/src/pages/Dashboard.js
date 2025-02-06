import { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4 text-teal-300">Welcome to Your Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {/* Free Tier */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold mb-2">Free</h2>
                    <p className="text-gray-400">Basic features for getting started.</p>
                    <ul className="mt-4 space-y-2">
                        <li>Access to basic food tracking</li>
                        <li>Limited calorie analysis</li>
                    </ul>
                    <button className="mt-4 bg-teal-500 hover:bg-teal-700 text-black font-bold py-2 px-4 rounded">
                        Select
                    </button>
                </div>

                {/* Basic Tier */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold mb-2">Basic</h2>
                    <p className="text-gray-400">Enhanced features for serious users.</p>
                    <ul className="mt-4 space-y-2">
                        <li>Advanced food tracking</li>
                        <li>Detailed calorie analysis</li>
                        <li>Customizable meal plans</li>
                    </ul>
                    <button className="mt-4 bg-teal-500 hover:bg-teal-700 text-black font-bold py-2 px-4 rounded">
                        Select
                    </button>
                </div>

                {/* Advanced Tier */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold mb-2">Advanced</h2>
                    <p className="text-gray-400">Premium features for optimal results.</p>
                    <ul className="mt-4 space-y-2">
                        <li>All Basic features</li>
                        <li>AI-powered food recommendations</li>
                        <li>Personalized fitness tracking</li>
                        <li>Priority support</li>
                    </ul>
                    <button className="mt-4 bg-teal-500 hover:bg-teal-700 text-black font-bold py-2 px-4 rounded">
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
}
