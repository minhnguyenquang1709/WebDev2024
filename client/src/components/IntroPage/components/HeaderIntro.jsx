import React from "react";
import { Link } from "react-router-dom";

const HeaderIntro = () => (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-24 py-4 bg-white shadow-md z-50">
        <div className="text-2xl font-bold">Something</div>
        <div className="flex justify-between items-center">
            <nav className="flex space-x-10 mr-6">
                {["Services", "Use Cases", "Pricing"].map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className="text-gray-800 font-medium"
                    >
                        {item}
                    </a>
                ))}
            </nav>
            <Link
                to="/login"
                className="px-6 py-3 bg-white text-black border-2 border-black rounded-lg hover:bg-black hover:text-white"
            >
                Log in
            </Link>
        </div>
    </header>
);

export default HeaderIntro;
