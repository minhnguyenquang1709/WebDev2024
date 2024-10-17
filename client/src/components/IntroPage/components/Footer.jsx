import React from "react";
import proposal from "../../../assets/image/proposal.png";

const Footer = () => (
    <footer className="flex items-center justify-between px-12 py-12 bg-gray-100 rounded-xl mt-10 mx-auto max-w-6xl">
        <div className="max-w-lg">
            <h1 className="text-4xl font-bold">Let's make things happen</h1>
            <p className="mt-4 text-lg">
                Get better insights faster—an all-in-one platform for surveys,
                forms, and market research. Convenient ways to reach more
                people!
            </p>
            <button className="mt-6 px-8 py-4 bg-black text-white rounded hover:bg-green-600">
                Get your free proposal
            </button>
        </div>
        <img src={proposal} alt="Proposal" className="max-w-md" />
    </footer>
);

export default Footer;
