import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { FiLogOut } from "react-icons/fi";
import { FaCreativeCommonsShare } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "../../apis/user/usersAPI";
import { useAuth } from "../../AuthContext/AuthContext";
import { toast } from "react-toastify";

export default function PrivateNavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const { logout } = useAuth();

    const mutation = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            logout();
            toast.success("Logged out successfully");
            navigate("/login");
        },
        onError: () => {
            toast.error("Logout failed. Please try again.");
        },
    });

    const handleLogout = () => {
        mutation.mutate();
    };

    const navigation = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Pricing", href: "/plans" },
    ];

    const classNames = (...classes) => classes.filter(Boolean).join(" ");

    return (
        <Disclosure as="nav" className="bg-gray-900">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            {/* Logo & Nav */}
                            <div className="flex items-center">
                                <Link to="/" className="text-white mr-6">
                                    <FaCreativeCommonsShare className="h-8 w-8" />
                                </Link>

                                <div className="hidden md:flex space-x-4">
                                    {navigation.map((item) => {
                                        const isActive = location.pathname === item.href;
                                        return (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    isActive
                                                        ? "bg-gray-800 text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "px-3 py-2 rounded-md text-sm font-medium"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/generate-content"
                                    className="animate-bounce inline-flex items-center gap-1.5 rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-400"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                    Generate
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-red-700"
                                >
                                    <FiLogOut className="h-5 w-5" />
                                    Logout
                                </button>
                            </div>

                            {/* Mobile button */}
                            <div className="flex md:hidden">
                                <Disclosure.Button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">
                                    {open ? (
                                        <XMarkIcon className="h-6 w-6" />
                                    ) : (
                                        <Bars3Icon className="h-6 w-6" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <Disclosure.Panel className="md:hidden bg-gray-800">
                        <div className="space-y-1 px-4 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        location.pathname === item.href
                                            ? "bg-gray-700 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-red-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
