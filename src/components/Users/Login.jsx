import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { loginAPI } from '../../apis/user/usersAPI';

const validationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const [captchaToken, setCaptchaToken] = useState('');

    const mutation = useMutation({
        mutationFn: loginAPI,
        onSuccess: () => {
            toast.success('Login successful!');
            navigate('/dashboard');
        },
        onError: (err) => {
            toast.error(err.message || 'Login failed. Please try again.');
        },
    });

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: (values) => {
            if (!captchaToken) {
                toast.warning("Please verify you're not a robot.");
                return;
            }
            mutation.mutate({ ...values, captchaToken });
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign in to your account</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                            placeholder="you@example.com"
                            autoComplete="off"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onPaste={(e) => e.preventDefault()}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* CAPTCHA */}
                    <div className="flex justify-center">
                        <ReCAPTCHA sitekey={SITE_KEY} onChange={setCaptchaToken} />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-200 shadow"
                    >
                        {mutation.isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
