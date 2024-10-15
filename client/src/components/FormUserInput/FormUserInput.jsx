import { Checkbox, Radio, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormUserTitle from "./FormUserTitle";

const FormUserInput = () => {
  const { formToken } = useParams();
  const [formId, setFormId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      let data = null;
      try {
        const url = process.env.REACT_APP_AUTH_JOIN + `/${formToken}`;
        const response = await axios.get(url, { withCredentials: true });
        if (response.status !== 200) {
          alert("Failed to get data");
          return;
        }
        data = response.data;
      } catch (e) {
        console.log(e);
        alert("Something went wrong while fetching data.");
      }

      if (data != null) {
        console.log(`get data successful: ${JSON.stringify(data)}`);
        setFormData(data);
      }
    };

    fetchFormData();
  }, [formToken]);

  const handleInputChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const url = process.env.REACT_APP_API_SURVEYS;
      await axios.post("http://localhost:3000/responses", {
        formId: formToken,
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
        <div key={question._id} className="mb-5">
          <p className="font-bold">{question.questionText}</p>

          {question.questionType === "checkbox" &&
            question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <Checkbox
                  checked={responses[question._id]?.includes(option) || false}
                  onChange={(e) => {
                    const selectedOptions = responses[question._id] || [];
                    if (e.target.checked) {
                      handleInputChange(question._id, [
                        ...selectedOptions,
                        option,
                      ]);
                    } else {
                      handleInputChange(
                        question._id,
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
                  checked={responses[question._id] === option}
                  onChange={() => handleInputChange(question._id, option)}
                />
                <label>{option}</label>
              </div>
            ))}

          {question.questionType === "text" && (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your answer"
              value={responses[question._id] || ""}
              onChange={(e) => handleInputChange(question._id, e.target.value)}
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
