import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function Tracker() {
    const [result, setResult] = useState(null);
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const analyzeImage = async (file) => {
        if (!auth.currentUser) {
            console.error('User not authenticated!');
            return;
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const prompt = "Identify food and estimate calories. Return JSON: {food: string, calories: number}";

        try {
            const result = await model.generateContent([prompt, file]);
            const response = await result.response;
            const data = JSON.parse(response.text());
            await setDoc(doc(db, 'calories', auth.currentUser.uid), data);
            setResult(data);
        } catch (error) {
            console.error("Error analyzing image:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Food Tracker</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <p>Upload an image of your food to track calories and nutritional information.</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                <button
                                    onClick={() => analyzeImage(file)} // Correctly pass 'file'
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={!file}
                                >
                                    Analyze Image
                                </button>
                                {result && (
                                    <div className="mt-6">
                                        <h2 className="text-xl font-semibold text-gray-900">Analysis Result:</h2>
                                        <p>Food: {result.food}</p>
                                        <p>Calories: {result.calories}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
