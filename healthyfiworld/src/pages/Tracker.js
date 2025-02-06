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

    const analyzeImage = async () => {
        if (!auth.currentUser) {
            console.error('User not authenticated!');
            return;
        }

        if (!file) {
            console.error('No file selected!');
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4 text-teal-300">Food Tracker</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 bg-gray-800 text-white p-2 rounded"
            />

            <button
                onClick={analyzeImage}
                className="bg-teal-500 hover:bg-teal-700 text-black font-bold py-2 px-4 rounded"
                disabled={!file}
            >
                Analyze Image
            </button>

            {result && (
                <div className="mt-8 p-4 bg-gray-800 shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-2 text-teal-300">Analysis Result:</h2>
                    <p>
                        <span className="font-semibold text-teal-300">Food:</span> {result.food}
                    </p>
                    <p>
                        <span className="font-semibold text-teal-300">Calories:</span> {result.calories}
                    </p>
                </div>
            )}
        </div>
    );
}
