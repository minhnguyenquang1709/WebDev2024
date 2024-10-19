import React, { useState } from "react";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import FormTitle from "./FormTitle";
import Question from "./Question";
import DemoForm from "../../DemoForm";
import axios from "axios";

const baseQuestion = [
  {
    id: uuidv4(),
    questionText: "Untitled Question",
    questionType: "checkbox",
    options: ["Option 1"],
    required: false,
  },
];

const FormBuilder = ({ formTitle, setFormTitle }) => {
  const [formDescription, setFormDescription] = useState("Form description");
  const [questions, setQuestions] = useState(baseQuestion);
  const [isFormDemoMode, setIsFormDemoMode] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        questionText: "Untitled Question",
        questionType: "checkbox",
        options: ["Option 1"],
        required: false,
      },
    ]);
  };

  const deleteQuestion = (id) =>
    setQuestions(questions.filter((q) => q.id !== id));

  const saveForm = async (formData) => {
    // const url = process.env.REACT_APP_API_SURVEYS;
    const response = await axios.post("http://localhost:3000/questions", formData);
    return response.data;
  };

  const handleSubmit = async () => {
    try {
      const response = await saveForm({
        title: formTitle,
        description: formDescription,
        questions,
      });
      alert("Form saved successfully!");
    } catch (error) {
      alert("Failed to save the form.");
    }
  };

  const toggleFormDemoMode = () => setIsFormDemoMode(!isFormDemoMode);

  return (
    <div>
      {isFormDemoMode ? (
        <DemoForm
          questions={questions}
          formTitle={formTitle}
          formDescription={formDescription}
          toggleFormDemoMode={toggleFormDemoMode}
        />
      ) : (
        <div className="mx-auto max-w-screen-lg mt-10">
          <FormTitle
            formTitle={formTitle}
            formDescription={formDescription}
            setFormTitle={setFormTitle}
            setFormDescription={setFormDescription}
          />
          {questions.map((question, index) => (
            <Question
              key={question.id}
              question={question}
              questionIndex={index}
              questions={questions}
              setQuestions={setQuestions}
              deleteQuestion={deleteQuestion}
            />
          ))}
          <div className="mt-4 flex justify-center items-center">
            <Button onClick={addQuestion} variant="outlined" className="!mr-5">
              New Question
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className="!mr-5"
            >
              Create Form
            </Button>
            <Button
              onClick={toggleFormDemoMode}
              variant="outlined"
              color="secondary"
            >
              Show Demo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
