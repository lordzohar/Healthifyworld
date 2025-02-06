import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        dob: '', gender: '', address: '', postCode: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateField = (name, value) => {
        let tempErrors = { ...errors };
        switch (name) {
            case 'name':
                if (!value.trim()) tempErrors.name = 'Name is required';
                else delete tempErrors.name;
                break;
            case 'email':
                if (!value.includes('@')) tempErrors.email = 'Valid email required';
                else delete tempErrors.email;
                break;
            case 'password':
                if (value.length < 10) tempErrors.password = 'Password must be at least 10 characters';
                else delete tempErrors.password;
                break;
            case 'confirmPassword':
                if (value !== formData.password) tempErrors.confirmPassword = 'Passwords do not match';
                else delete tempErrors.confirmPassword;
                break;
            case 'dob':
                if (!value) tempErrors.dob = 'Date of birth is required';
                else delete tempErrors.dob;
                break;
            case 'gender':
                if (!value) tempErrors.gender = 'Gender is required';
                else delete tempErrors.gender;
                break;
            case 'address':
                if (!value) tempErrors.address = 'Address is required';
                else delete tempErrors.address;
                break;
            case 'postCode':
                if (!value) tempErrors.postCode = 'Post code is required';
                else delete tempErrors.postCode;
                break;
            default:
                break;
        }
        setErrors(tempErrors);
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.includes('@')) tempErrors.email = 'Valid email required';
        if (formData.password.length < 10) tempErrors.password = 'Password must be at least 10 characters';
        if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';
        if (!formData.dob) tempErrors.dob = 'Date of birth is required';
        if (!formData.gender) tempErrors.gender = 'Gender is required';
        if (!formData.address) tempErrors.address = 'Address is required';
        if (!formData.postCode) tempErrors.postCode = 'Post code is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const { email, password, name, dob, gender, address, postCode } = formData;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name, email, dob, gender, address, postCode
            });
            navigate('/dashboard');
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-green-500">
                        Sign Up
                    </h2>
                </div>
                <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
                    {errors.submit && (
                        <div className="mb-4 text-sm text-red-600">
                            {errors.submit}
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-green-500">
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-green-500">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-green-500">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-green-500">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-green-500">
                                Date of Birth
                            </label>
                            <div className="mt-1">
                                <input
                                    id="dob"
                                    name="dob"
                                    type="date"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.dob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.dob && (
                                    <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-green-500">
                                Gender
                            </label>
                            <div className="mt-1">
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.gender}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-green-500">
                                Address
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="address"
                                    name="address"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.address && (
                                    <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="postCode" className="block text-sm font-medium text-green-500">
                                Post Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="postCode"
                                    name="postCode"
                                    type="text"
                                    required
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.postCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                                    value={formData.postCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.postCode && (
                                    <p className="text-xs text-red-500 mt-1">{errors.postCode}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition duration-200"
                                disabled={loading}
                            >
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
