import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface SignUpFormProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export const SignUpForm = ({ onSuccess, onError }: SignUpFormProps) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        acceptTerms: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.acceptTerms) {
            onError?.('Please accept the terms and conditions');
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
                email: formData.email,
                password: formData.password
            });

            if (response.data?.token) {
                // Store the token
                localStorage.setItem('token', response.data.token);
                onSuccess?.();
            }
        } catch (error: any) {
            onError?.(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div>
                <label className="block text-gray-400 mb-2">Email*</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2A2A2A]/50 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-teal-500"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-400 mb-2">Password*</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#2A2A2A]/50 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-teal-500"
                        placeholder="Enter your password"
                        required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <img onClick={() => setShowPassword(prev => !prev)} className={`cursor-pointer transition-opacity ${showPassword ? 'opacity-80' : 'opacity-100'}`}
                            src="images/eye.svg" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="terms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="rounded bg-[#2A2A2A]/50 border-gray-700 text-teal-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                    I have read and agree to the <Link to="/" className="text-teal-400">terms of use</Link> and <Link to="/" className="text-teal-400">privacy policy</Link>
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1E1E1E] text-gray-400">OR</span>
                </div>
            </div>

            <button
                type="button"
                className="w-full py-3 px-4 bg-[#2A2A2A]/50 hover:bg-[#2A2A2A]/70 text-white rounded-lg border border-gray-700 flex items-center justify-center gap-3"
            >
                <img src="/images/google.svg" alt="google" />
                Continue with Google
            </button>
        </form>
    );
};