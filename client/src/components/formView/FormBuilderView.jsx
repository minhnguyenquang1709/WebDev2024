import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Question from "../FormCreate/FormBuilder/Question";
import DemoForm from "../DemoForm";
import axios from "axios";
import FormTitleView from "./FormTitleView";
import { useNavigate } from "react-router-dom";

const FormBuilderView = ({
  id,
  initialTitle,
  initialDescription = "",
  initialQuestions = [],
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(`initialTitle: ${initialTitle}`);
    setTitle(initialTitle);
    setDescription(initialDescription);
    setQuestions(initialQuestions);
  }, [initialTitle, initialDescription, initialQuestions]);

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
    // console.log(`question.id: ${id}`);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // const deleteFormData = async () => {
  //   try {
  //     const url = process.env.REACT_APP_API_SURVEYS + `/${id}`;
  //     await axios.delete(url);
  //     navigate("/main");
  //   } catch (error) {
  //     alert("Failed to delete form data.");
  //   }
  // };

  const deleteFormData = async () => {
    try {
      console.log(`trying to delete form with id: ${id}`);
      await axios.delete(`http://localhost:3000/questions/${id}`);
      navigate("/main");
    } catch (error) {
      alert("Failed to delete form data.");
    }
  };

  // const saveForm = async (data) => {
  //   try {
  //     console.log(`Start saving form`);
  //     const url = process.env.REACT_APP_API_SURVEYS + `/${id}`;
  //     // console.log(`url: ${url}`);
  //     await axios.put(url, data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const saveForm = async (data) => {
    try {
      await axios.put(`http://localhost:3000/questions/${id}`, data);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async () => {
    const data = {
      title: title,
      description: description,
      questions,
    };
    try {
      await saveForm(data);
      alert("Form saved successfully!");
    } catch (error) {
      alert("Failed to save the form.");
    }
  };

  const toggleDemoMode = () => setIsDemoMode(!isDemoMode);

  return (
    <div>
      {isDemoMode ? (
        <DemoForm
          questions={questions}
          formTitle={title}
          formDescription={description}
          toggleFormDemoMode={toggleDemoMode}
        />
      ) : (
        <div className="mx-auto max-w-screen-lg">
          <FormTitleView
            formTitle={title}
            formDescription={description}
            setFormTitle={setTitle}
            setFormDescription={setDescription}
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
              onClick={toggleDemoMode}
              variant="outlined"
              color="secondary"
              className="!mr-5"
            >
              Show Demo
            </Button>
            <Button onClick={deleteFormData} variant="outlined" color="error">
              Delete Form
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBuilderView;
