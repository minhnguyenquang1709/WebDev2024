import React from "react";

const FormTitleView = ({
    formTitle,
    formDescription,
    setFormTitle,
    setFormDescription,
}) => (
    <div className="w-full flex flex-col border border-t-8 border-t-purple-600 rounded-lg p-6 mb-3 group focus-within:border-l-8 focus-within:border-l-blue-700 transition-all duration-300">
        <input
            type="text"
            className="text-2xl border-b mb-5 outline-none focus:border-b-2 focus:border-purple-600"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
        />
        <input
            type="text"
            defaultValue={"Form description"}
            className="text-xs border-b outline-none focus:border-b-2 focus:border-purple-600"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
        />
    </div>
);

export default FormTitleView;
