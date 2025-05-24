import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { registerAPI } from '../../apis/user/usersAPI';
import ReCAPTCHA from "react-google-recaptcha";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    username: Yup.string().required("Username is required"),
});

const Register = () => {
    const navigate = useNavigate();
    const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const [captchaToken, setCaptchaToken] = React.useState("");

    const mutation = useMutation({
        mutationFn: registerAPI,
        onSuccess: () => {
            toast.success("Registration successful! Please login.");
            navigate("/login");
        },
        onError: () => toast.error("Registration failed. Try again."),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
        },
        validationSchema,
        onSubmit: (values) => {
            if (!captchaToken) {
                toast.warn("Please verify you're not a robot.");
                return;
            }
            mutation.mutate({ ...values, captchaToken });
        },
    });

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
                    Create Your Account
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Get free 3-day access — no credit card required.
                </p>

                {mutation.isPending && (
                    <p className="text-center text-indigo-500 mb-4 font-semibold">Registering...</p>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            {...formik.getFieldProps("username")}
                            placeholder="JohnDoe"
                            className={`block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                formik.touched.username && formik.errors.username
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className="text-sm text-red-600 mt-1">{formik.errors.username}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...formik.getFieldProps("email")}
                            placeholder="you@example.com"
                            autoComplete="off"
                            className={`block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                formik.touched.email && formik.errors.email
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...formik.getFieldProps("password")}
                            placeholder="********"
                            onPaste={(e) => e.preventDefault()}
                            className={`block w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                formik.touched.password && formik.errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex justify-center">
                        <ReCAPTCHA
                            sitekey={SITE_KEY}
                            onChange={(token) => setCaptchaToken(token)}
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className={`w-full py-3 rounded-md text-white font-semibold transition-colors duration-300
                            ${mutation.isPending
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500"}
                        `}
                    >
                        {mutation.isPending ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-700 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Login here
                    </Link>
                </p>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default Register;
