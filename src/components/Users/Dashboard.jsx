import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUserProfileAPI } from "../../apis/user/usersAPI";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: getUserProfileAPI,
        queryKey: ["profile"],
    });

    useEffect(() => {
        if (isError) {
            toast.error(error?.response?.data?.message || "Failed to fetch user profile");
        }
    }, [isError, error]);

    if (isLoading) {
        toast.info("Loading profile...");
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="mx-auto p-4 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">User Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* === Profile Section === */}
                <div className="bg-white text-gray-900 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <p><strong>Username:</strong> {data?.user?.username}</p>
                    <p><strong>Email:</strong> {data?.user?.email}</p>
                </div>

                {/* === Credit Section === */}
                <div className="bg-white text-gray-900 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Credit Usage</h2>
                    <p>Monthly Credit: {data?.user?.monthlyRequestCount}</p>
                    <p>Used: {data?.user?.apiRequestCount}</p>
                    <p>Remaining: {data?.user?.monthlyRequestCount - data?.user?.apiRequestCount}</p>
                </div>

                {/* === Subscription Plan === */}
                <div className="bg-white text-gray-900 p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Subscription Plan</h2>
                    <p>Plan: {data?.user?.subscriptionPlan}</p>
                    <Link to="/plans" className="text-blue-600 underline mt-2 inline-block">Upgrade Plan</Link>
                </div>

                {/* === Payment History === */}
                <div className="bg-white text-gray-900 p-6 rounded shadow md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Payment History</h2>
                    {data?.user?.payments?.length > 0 ? (
                        <ul>
                            {data.user.payments.map((payment, i) => (
                                <li key={i} className="mb-2 border-b pb-2">
                                    <p>Plan: {payment.subscriptionPlan}</p>
                                    <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
                                    <p>Status: {payment.status}</p>
                                    <p>Amount: ${payment.amount}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No payment history found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
