import { Checkbox, Radio, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormUserTitle from "./FormUserTitle";

const FormUserInput = () => {
  const { idForm } = useParams();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/questions");
        const allForms = response.data;
        const form = allForms.find((f) => f.id === idForm);
        if (form) {
          setFormData(form);
        }
      } catch (error) {
        alert("Something went wrong while fetching form data.");
      }
    };

    fetchFormData();
  }, [idForm]);

  const handleInputChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/responses", {
        formId: idForm,
        responses,
      });
      alert("Form submitted successfully!");
    } catch (error) {
      alert("Something went wrong while submitting the form.");
    }
  };

  if (!formData) {
    return <p>Loading form data...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <FormUserTitle
        formTitle={formData.formTitle}
        formDescription={formData.formDescription}
      />
      {formData.questions.map((question) => (
        <div key={question.id} className="mb-5">
          <p className="font-bold">{question.questionText}</p>

          {question.questionType === "checkbox" &&
            question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <Checkbox
                  checked={responses[question.id]?.includes(option) || false}
                  onChange={(e) => {
                    const selectedOptions = responses[question.id] || [];
                    if (e.target.checked) {
                      handleInputChange(question.id, [
                        ...selectedOptions,
                        option,
                      ]);
                    } else {
                      handleInputChange(
                        question.id,
                        selectedOptions.filter((opt) => opt !== option)
                      );
                    }
                  }}
                />
                <label>{option}</label>
              </div>
            ))}

          {question.questionType === "radio" &&
            question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <Radio
                  checked={responses[question.id] === option}
                  onChange={() => handleInputChange(question.id, option)}
                />
                <label>{option}</label>
              </div>
            ))}

          {question.questionType === "text" && (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your answer"
              value={responses[question.id] || ""}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default FormUserInput;
