import React from "react";

const ServiceBlock = ({
    title,
    imageSrc,
    iconSrc,
    bgColor,
    markColor,
    textColor,
    linkColor,
}) => (
    <section
        className={`flex justify-between items-center p-10 w-full rounded-lg shadow-lg ${bgColor} max-w-lg`}
    >
        <div className="flex flex-col">
            <h3 className={`text-2xl font-bold mb-4 ${textColor} mb-10`}>
                <mark className={`p-1 ${markColor} rounded-lg`}>{title}</mark>
            </h3>
            <div className="flex items-center mb-8 ">
                <img src={iconSrc} alt="Icon" className="w-10 mr-4" />
                <a
                    href="#"
                    className={`text-lg font-semibold ${linkColor} hover:underline`}
                >
                    Learn more
                </a>
            </div>
        </div>
        <img src={imageSrc} alt={title} className="mt-4" />
    </section>
);

export default ServiceBlock;
