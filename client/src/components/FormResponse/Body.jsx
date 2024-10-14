import FormQuestions from "./FormQuestions";
import FormTitle from "./FormTitle";

const Body = () => {
  const [formData, setFormData] = useState(null);
  const handleFetchData = async () => {
    const response = await axios.get();
    setFormData(response.data);
  };
  const handleSubmitData = async () => {
    
  }
  return (
    <>
      <FormTitle></FormTitle>
      <FormQuestions></FormQuestions>
    </>
  );
};

export default Body;
