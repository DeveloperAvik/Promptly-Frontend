import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PublicNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const navigation = [
        { name: t("nav.home"), href: "/" },
        { name: t("nav.legal_rights"), href: "/rights" },
        { name: t("nav.ask_lawyer"), href: "/ask" },
        { name: t("nav.resources"), href: "/resources" },
        { name: t("nav.about"), href: "/about" },
    ];

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        console.log("Language switched to:", lang);
    };

    return (
        <div className="bg-gray-900">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    {/* Logo */}
                    <div className="flex lg:flex-1">
                        <Link to="/" className="text-white text-2xl font-bold">
                            Promptly
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden lg:flex lg:gap-x-10">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="text-sm font-semibold leading-6 text-white hover:text-yellow-400"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Language & Login */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
                        <select
                            onChange={handleLanguageChange}
                            className="text-sm text-gray-800 bg-white rounded px-2 py-1"
                        >
                            <option value="en">EN</option>
                            <option value="hi">हिंदी</option>
                            <option value="bn">বাংলা</option>
                        </select>

                        <Link
                            to="/login"
                            className="text-sm font-semibold leading-6 text-white hover:text-yellow-400"
                        >
                            {t("nav.login")} <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>

                {/* Mobile menu dialog */}
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50 bg-black/50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gray-900 px-6 py-6 sm:ring-1 sm:ring-white/10">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5 text-white text-xl font-bold">
                                🔱 DharmaNet
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-800"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <select
                                onChange={handleLanguageChange}
                                className="w-full bg-white text-gray-800 rounded px-2 py-2 text-sm mt-2"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिंदी</option>
                                <option value="bn">বাংলা</option>
                            </select>

                            <Link
                                to="/login"
                                className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-800"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t("nav.login")}
                            </Link>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    );
}
