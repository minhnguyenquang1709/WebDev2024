import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderForm from "../FormCreate/HeaderForm";
import FormBuilderView from "./FormBuilderView";

const FormView = () => {
  const { idForm } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      let form = null;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/surveys/${idForm}`,
          { withCredentials: true }
        );
        form = response.data;
        if (form) {
          setFormData(form);
        }
      } catch (error) {
        alert("Something went wrong while fetching form data.");
      }
    };

    fetchFormData();
  }, [idForm]);

  console.log("formData: ", formData);

  return (
    <div>
      <HeaderForm />
      {formData ? (
        <FormBuilderView
          id={formData._id}
          initialformTitle={formData.title}
          initialformDescription={formData.description}
          initialQuestions={formData.questions}
        />
      ) : (
        <p>Loading form data...</p>
      )}
    </div>
  );
};

export default FormView;
