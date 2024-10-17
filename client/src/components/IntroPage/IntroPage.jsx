import React from "react";
import HeaderIntro from "./components/HeaderIntro";
import IntroSection from "./components/IntroSection";
import ServiceRow from "./components/ServiceRow";
import Footer from "./components/Footer";

import smileImg from "../../assets/image/smile.png";
import sendImg from "../../assets/image/send.png";
import contentImg from "../../assets/image/content.png";
import analyticsImg from "../../assets/image/analytics.png";
import icon from "../../assets/image/Icon.png";
import icon1 from "../../assets/image/Icon1.png";
const data = [
    {
        title: "Social Media Marketing",
        imageSrc: smileImg,
        iconSrc: icon,
        bgColor: "bg-black",
        markColor: "bg-white text-black",
        textColor: "text-white",
        linkColor: "text-gray-200",
    },
    {
        title: "Email Marketing",
        imageSrc: sendImg,
        iconSrc: icon1,
        bgColor: "bg-gray-100",
        markColor: "bg-green-300 text-black",
        textColor: "text-black",
        linkColor: "text-black",
    },
    {
        title: "Content Creation",
        imageSrc: contentImg,
        iconSrc: icon1,
        bgColor: "bg-green-300",
        markColor: "bg-white text-black",
        textColor: "text-black",
        linkColor: "text-black",
    },
    {
        title: "Analytics and Tracking",
        imageSrc: analyticsImg,
        iconSrc: icon,
        bgColor: "bg-black",
        markColor: "bg-green-300 text-black",
        textColor: "text-white",
        linkColor: "text-gray-200",
    },
];
const IntroPage = () => {
    return (
        <div>
            <HeaderIntro />
            <IntroSection />
            <div className="flex flex-col mx-auto max-w-6xl">
                <ServiceRow services={data} />
            </div>
            <Footer />
        </div>
    );
};

export default IntroPage;
