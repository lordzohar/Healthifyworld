import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/dashboard'); // Redirect to dashboard after successful sign-up
        } catch (err) {
            setError(err.message);
        }
    };
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-white">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSignUp}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-700 bg-gray-700 text-white p-2 rounded w-full mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-700 bg-gray-700 text-white p-2 rounded w-full mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-teal-500 hover:bg-teal-700 text-black font-bold py-2 rounded-lg transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center w-full bg-teal-500 hover:bg-teal-700 text-black font-bold py-2 rounded-lg transition duration-200 mt-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;
