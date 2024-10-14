import React from "react";
import { Checkbox, Radio, TextField, Button } from "@mui/material";
import FormTitle from "./FormCreate/FormBuilder/FormTitle";

const DemoForm = ({
    formTitle,
    formDescription,
    questions,
    toggleFormDemoMode,
}) => (
    <div className="mx-auto max-w-3xl mt-10">
        <FormTitle formTitle={formTitle} formDescription={formDescription} />
        {questions.map((question) => (
            <div key={question.id} className="mb-5">
                <p className="font-bold">{question.questionText}</p>

                {question.questionType === "checkbox" &&
                    question.options.map((option, optionIndex) => (
                        <div
                            key={optionIndex}
                            className="flex items-center mb-2"
                        >
                            <Checkbox />
                            <label>{option}</label>
                        </div>
                    ))}

                {question.questionType === "radio" &&
                    question.options.map((option, optionIndex) => (
                        <div
                            key={optionIndex}
                            className="flex items-center mb-2"
                        >
                            <Radio />
                            <label>{option}</label>
                        </div>
                    ))}

                {question.questionType === "text" && (
                    <TextField
                        fullWidth
                        variant="outlined"
                        disabled
                        placeholder="Enter your answer"
                    />
                )}
            </div>
        ))}

        <Button onClick={toggleFormDemoMode}>Back to Edit</Button>
    </div>
);

export default DemoForm;
