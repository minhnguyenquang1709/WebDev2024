import React from "react";
import { IconButton, MenuItem, Select, Switch } from "@mui/material";
import { Delete } from "@mui/icons-material";
import OptionList from "./OptionList";

const Question = ({
  question,
  questionIndex,
  questions,
  setQuestions,
  deleteQuestion,
}) => {
  const handleQuestionTextChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionText = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].questionType = e.target.value;
    setQuestions(updatedQuestions);
  };

  const toggleRequired = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].required =
      !updatedQuestions[questionIndex].required;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="mb-5 p-6 border rounded-lg group focus-within:border-l-8 focus-within:border-l-blue-700 transition-all duration-300">
      <div className="flex justify-between items-center text-base">
        <input
          type="text"
          className="max-w-md w-full p-4 group-focus-within:border-b-4 group-focus-within:border-b-slate-400  group-focus-within:bg-slate-100 focus:border-b-2 focus:border-b-purple-600 outline-none transition-all duration-300 mb-2"
          value={question.questionText}
          onChange={handleQuestionTextChange}
        />

        <Select
          value={question.questionType}
          onChange={handleQuestionTypeChange}
          className="mb-2 max-w-44 w-full"
        >
          <MenuItem value="checkbox">Checkbox</MenuItem>
          <MenuItem value="radio">Radio</MenuItem>
          <MenuItem value="text">Text Input</MenuItem>
        </Select>
      </div>

      <OptionList
        question={question}
        questionIndex={questionIndex}
        questions={questions}
        setQuestions={setQuestions}
      />

      <div className="flex items-center justify-end border-t-2 mt-4">
        <div className="mt-2">
          <label>Required</label>
          <Switch checked={question.required} onChange={toggleRequired} />
        </div>
        <IconButton onClick={() => deleteQuestion(question.id)}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default Question;
