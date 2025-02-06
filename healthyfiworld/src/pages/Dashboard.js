import  { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import VisualsSection from '../components/VisualsSection'; // Import the VisualsSection component
import Footer from '../components/Footer'; // Import the Footer component

export default function Dashboard() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
            if (!user) {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <div>
            {isLoggedIn && (
                <div>
                    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                                <div className="max-w-md mx-auto">
                                    <div>
                                        <h1 className="text-2xl font-semibold text-gray-900">Welcome to Your Dashboard!</h1>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                            <p>Explore your food tracking and calorie analysis tools.</p>
                                            <p>Stay on track with your health and fitness goals.</p>
                                        </div>
                                        <div className="pt-6 text-base font-medium leading-6 sm:text-lg sm:leading-7">
                                            <a href="/tracker" className="text-green-600 hover:text-green-800">
                                                Go to Tracker &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <VisualsSection /> {/* Render the VisualsSection */}
                </div>
            )}
            <Footer />
        </div>
    );
}
