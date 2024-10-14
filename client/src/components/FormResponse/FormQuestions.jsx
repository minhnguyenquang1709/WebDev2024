import Question from "./Question";

const FormQuestions = (props) => {
  return (
    <>
      {props.questions.length > 0 ? (
        props.questions.map((question, index) => <Question></Question>)
      ) : (
        <h1>No question</h1>
      )}
    </>
  );
};

export default FormQuestions;
