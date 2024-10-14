import { useState } from "react";
import Body from "./Body";
import Header from "./Header";
import axios from "axios";

const FormResponse = () => {
  const [formData, setFormData] = useState(null);
  const handleFetchData = async () => {
    const response = await axios.get();
    setFormData(response.data);
  };
  const handleSubmitData = async () => {
    
  }
  return (
    <div>
      <Header></Header>
      <Body></Body>
    </div>
  );
};

export default FormResponse;
