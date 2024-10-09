import React from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const OptionList = ({ question, questionIndex, questions, setQuestions }) => {
    const handleOptionTextChange = (optionIndex, text) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = text;
        setQuestions(updatedQuestions);
    };

    const addOption = () => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push(
            `Option ${updatedQuestions[questionIndex].options.length + 1}`
        );
        setQuestions(updatedQuestions);
    };

    const removeOption = (optionIndex) => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[questionIndex].options.length > 1) {
            updatedQuestions[questionIndex].options.splice(optionIndex, 1);
            setQuestions(updatedQuestions);
        }
    };

    return (
        <div>
            {question.questionType !== "text" &&
                question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                        <TextField
                            variant="outlined"
                            label={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) =>
                                handleOptionTextChange(optionIndex, e.target.value)
                            }
                            className="flex-grow mr-2"
                        />
                        <IconButton onClick={() => removeOption(optionIndex)}>
                            <Delete />
                        </IconButton>
                    </div>
                ))}
            <Button onClick={addOption} disabled={question.questionType === "text"}>
                Add Option
            </Button>
        </div>
    );
};

export default OptionList;
