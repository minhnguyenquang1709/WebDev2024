import axios from "axios";
import Question from "./Question";
import { useEffect, useState } from "react";

const FormQuestions = ({ id, title, description, questions }) => {
  const [data, setData] = useState(null);
  const getFormData = async (id) => {
    try {
      const url = process.env.REACT_APP_API_SURVEYS + `/${id}`;
      const response = axios.get(url, { withCredentials: true });
      if (response.status !== 200) {
        alert("Unable to get data");
      } else {
        console.log(`data: ${response.data}`);
        setData(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFormData(id);
  });

  return (
    <>
      {{ id, title, description, questions }.questions.length > 0 ? (
        { id, title, description, questions }.questions.map(
          (question, index) => <Question></Question>
        )
      ) : (
        <h1>No question</h1>
      )}
    </>
  );
};

export default FormQuestions;
