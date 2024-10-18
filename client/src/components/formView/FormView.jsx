import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderForm from "../FormCreate/HeaderForm";
import BodyFormView from "./BodyFormView";

const FormView = () => {
  const { idForm } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchFormData = async () => {
      // let form = null;
      try {
        // const url = process.env.REACT_APP_API_SURVEYS + `/${idForm}`;
        // const response = await axios.get(url, { withCredentials: true });

        const response = await axios.get("http://localhost:3000/questions");
        // form = response.data;
        // if (form) {
        //   // console.log(`formData: ${JSON.stringify(form)}`)
        //   setFormData(form);
        // }

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
  // console.log(formData);

  return (
    <div>
      {formData ? (
        <>
          <HeaderForm formTitle={formData.title} />
          <BodyFormView {...formData} />
        </>
      ) : (
        <p>Loading form data...</p>
      )}
    </div>
  );
};

export default FormView;
