// src/components/HealthifyWorldLogo.js
import  { useState } from 'react';

const HealthifyWorldLogo = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="flex items-center justify-center">
            <svg
                width="200"
                height="200"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleClick}
                className={`cursor-pointer transition-transform duration-300 ${
                    isClicked ? 'transform rotate-180' : ''
                }`}
            >
                <circle cx="50" cy="50" r="40" stroke="#4CAF50" strokeWidth="8" />
                <text x="50" y="50" textAnchor="middle" fontSize="20" fill="#4CAF50">
                    HW
                </text>
            </svg>
            <p className="ml-4 text-xl font-semibold">HealthifyWorld</p>
        </div>
    );
};

export default HealthifyWorldLogo;
