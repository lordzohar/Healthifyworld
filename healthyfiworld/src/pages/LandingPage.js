// src/pages/LandingPage.js
// import React from 'react';
import HealthifyWorldLogo from '../components/HealthifyWorldLogo'; // Create this component
import CalorieTracker from '../components/CalorieTracker'; // Create this component
import StepTracker from '../components/StepTracker'; // Create this component
import VisualsSection from '../components/VisualsSection'; // Create this component
import RunningMan from '../components/RunningMan';
import ImageCarousel from '../components/ImageCarousel';

const LandingPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Healthify World!</h1>
                </div>
            </header>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <HealthifyWorldLogo />
                        <RunningMan/>
                        <ImageCarousel/>
                        <CalorieTracker />
                        <StepTracker />
                        <VisualsSection />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
