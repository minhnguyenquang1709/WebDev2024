import React, { useState } from "react";
import HeaderForm from "./HeaderForm";
import FormBuilder from "./FormBuilder/FormBuilder";
const Form = () => {
    const [formTitle, setFormTitle] = useState("Untitled Form");
    return (
        <div>
            <HeaderForm formTitle={formTitle}></HeaderForm>
            <FormBuilder formTitle={formTitle} setFormTitle={setFormTitle} />
        </div>
    );
};

export default Form;
