import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Question from "../FormCreate/FormBuilder/Question";
import DemoForm from "../DemoForm";
import axios from "axios";
import FormTitleView from "./FormTitleView";

const FormBuilderView = ({
  id,
  initialformTitle = "Untitled Form",
  initialformDescription = "",
  initialQuestions = [],
}) => {
  const [formTitleState, setFormTitleState] = useState(initialformTitle);
  const [formDescription, setFormDescription] = useState(
    initialformDescription
  );
  const [questions, setQuestions] = useState(initialQuestions);
  const [isFormDemoMode, setIsFormDemoMode] = useState(false);

  useEffect(() => {
    setFormTitleState(initialformTitle);
    setFormDescription(initialformDescription);
    setQuestions(initialQuestions);
  }, [initialformTitle, initialformDescription, initialQuestions]);

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

  const deleteQuestion = (id) => {
    console.log(`question.id: ${id}`)
    setQuestions(questions.filter((q) => q._id !== id));
  };

  const saveForm = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/surveys/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error saving form", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    const formData = {
      formTitle: formTitleState,
      formDescription: formDescription,
      questions,
    };
    try {
      await saveForm(formData);
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
          formTitle={formTitleState}
          formDescription={formDescription}
          toggleFormDemoMode={toggleFormDemoMode}
        />
      ) : (
        <div className="mx-auto max-w-screen-lg">
          <FormTitleView
            formTitle={formTitleState}
            formDescription={formDescription}
            setFormTitle={setFormTitleState}
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
              Add New Question
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className="!mr-5"
            >
              Save Form
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

export default FormBuilderView;
