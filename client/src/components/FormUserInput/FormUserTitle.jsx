import React from "react";

const FormUserTitle = ({ formTitle, formDescription }) => {
    return (
        <div className="w-full flex flex-col border border-t-8 border-t-purple-600 rounded-lg p-6 mb-3 group focus-within:border-l-8 focus-within:border-l-blue-700 transition-all duration-300">
            <div className="text-2xl border-b mb-5">{formTitle}</div>
            <div className="text-xs border-b">{formDescription}</div>
        </div>
    );
};

export default FormUserTitle;
