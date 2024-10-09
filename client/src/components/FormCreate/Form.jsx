import React, { useState } from "react";
import HeaderForm from "./HeaderForm";
import BodyForm from "./BodyForm";

const Form = () => {
    const [formTitle, setFormTitle] = useState("Untitled Form");
    return (
        <div>
            <HeaderForm formTitle={formTitle}></HeaderForm>
            <BodyForm
                formTitle={formTitle}
                setFormTitle={setFormTitle}
            ></BodyForm>
        </div>
    );
};

export default Form;
