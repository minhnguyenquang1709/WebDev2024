import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormBuilderView from "./FormBuilderView";
import axios from "axios";
import DisplaySurveyResponses from "./StatisticsView";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const BodyForm = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [responseData, setResponseData] = useState(null);
  const [statistics, setStatistics] = useState(null); // Store the processed statistics

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterResponse = (data) => {
    const returnData = data.filter(
      (survey) => survey.id.toString() == props.id
    );
    console.log(
      `response data from json-server: ${JSON.stringify(returnData)}`
    );
    return returnData;
  };
  const getResponseData = async () => {
    console.log("start getting response data...");
    try {
      // const url = process.env.REACT_APP_API_RESPONSE + `/${props.id}`;
      const response = await axios.get("http://localhost:3000/responses"); // change with url instead of json-server link when implement real server
      filterResponse(response.data); // remove when using real server
      if (response.status !== 200) {
        console.log("Failed to get responses");
      } else {
        console.log("get response data successful");
        setResponseData(response.data);
        processResponses(response.data);
        console.log(response.data);
      }
    } catch (e) {
      // console.log(e);
      if (e.response) {
        console.error(
          `Failed to get response data, status: ${e.response.status}, ${e.response.data}`
        );
        setResponseData(e.response.status);
      } else {
        console.log("No response received");
      }
    }
  };

  const processResponses = (responses) => {
    console.log("start processing the response data...");
    const stats = props.questions.map((question) => {
      const statsForQuestion = {
        questionId: question.id,
        questionText: question.questionText,
        questionType: question.questionType,
        totalResponses: 0,
        answers: {},
      };

      responses.forEach((response) => {
        const answer = response.responses.find(
          (resp) => resp.questionId.toString() === question.id.toString()
        );

        if (answer) {
          statsForQuestion.totalResponses += 1;

          if (
            question.questionType === "radio" ||
            question.questionType === "checkbox"
          ) {
            const options = Array.isArray(answer.answer)
              ? answer.answer
              : [answer.answer];

            options.forEach((option) => {
              if (!statsForQuestion.answers[option]) {
                statsForQuestion.answers[option] = 0;
              }
              statsForQuestion.answers[option] += 1;
            });
          } else if (question.questionType === "text") {
            if (!statsForQuestion.answers.text) {
              statsForQuestion.answers.text = [];
            }
            statsForQuestion.answers.text.push(answer.answer);
          }
        }
      });

      return statsForQuestion;
    });

    setStatistics(stats); // Store the processed statistics
  };

  useEffect(() => {
    // console.log(`props title: ${props.title}`);

    // fetch responses
    if (tabValue === 1 && !responseData) {
      getResponseData();
    }
  }, [tabValue]);

  return (
    <div>
      <AppBar position="static" className="!bg-white !shadow-none">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          centered
          TabIndicatorProps={{
            style: { backgroundColor: "purple" },
          }}
        >
          <Tab label="Questions" className="!text-purple-500" />
          <Tab label="Responses" className="!text-purple-500" />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        <FormBuilderView
          id={props.id}
          initialTitle={props.title}
          initialDescription={props.description}
          initialQuestions={props.questions}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {statistics ? (
          // [...statistics].map((stat, idx) => (
          //   <>
          //     <p>questionId: {stat.questionId}</p>
          //     <p>question: {stat.questionText}</p>
          //     <p>type: {stat.questionType}</p>
          //     <p>total nb of responses: {stat.totalResponses}</p>
          //     <p>answers: {JSON.stringify(stat.answers)}</p> <br />
          //   </>
          // ))

          <DisplaySurveyResponses statistics={statistics} />
        ) : statistics != 200 ? (
          <p>No response found for this survey.</p>
        ) : (
          <>
            <h2>Responses</h2>
            <p>Here you can manage the responses of your form.</p>
            <p>Fetching data...</p>
          </>
        )}
      </TabPanel>
    </div>
  );
};

export default BodyForm;
