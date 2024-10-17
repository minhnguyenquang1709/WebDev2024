import React from "react";
import speaker from "../../../assets/image/Illustration.png";
const IntroSection = () => (
    <section className="flex items-center justify-between mt-20 mx-auto max-w-6xl">
        <div className="">
            <h1 className="text-4xl font-bold">
                Create online <br /> forms & surveys <br /> to your liking!
            </h1>
            <p className="mt-4 text-lg">
                Get better insights faster—an all-in-one platform for surveys,
                forms, and market research. Convenient ways to reach more
                people!
            </p>
            <button className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-green-600">
                Make a Survey!
            </button>
        </div>
        <img src={speaker} alt="Speaker" className="max-w-md" />
    </section>
);

export default IntroSection;
