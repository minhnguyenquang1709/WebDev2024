import React from "react";
import { PieChart, BarChart } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

const DisplaySurveyResponses = ({ statistics }) => {
  return (
    <div>
      {statistics.map((stat, idx) => (
        <Box key={stat.questionId} sx={{ mb: 5 }}>
          <Typography variant="h6">{stat.questionText}</Typography>

          {/* For text-based questions */}
          {stat.questionType === "text" && (
            <Box>
              <Typography variant="body1">
                Total Responses: {stat.totalResponses}
              </Typography>
              {stat.answers.text.map((answer, index) => (
                <Typography key={index} variant="body2">
                  {index + 1}. {answer}
                </Typography>
              ))}
            </Box>
          )}

          {/* For radio-type questions (Pie Chart) */}
          {stat.questionType === "radio" && (
            <Box>
              <Typography variant="body1">
                Total Responses: {stat.totalResponses}
              </Typography>
              <PieChart
                series={[
                  {
                    data: Object.entries(stat.answers).map(([label, value]) => ({
                      id: label,
                      label: label,
                      value: value,
                    })),
                  },
                ]}
                height={300}
              />
            </Box>
          )}

          {/* For checkbox-type questions (Bar Chart) */}
          {stat.questionType === "checkbox" && (
            <Box>
              <Typography variant="body1">
                Total Responses: {stat.totalResponses}
              </Typography>
              <BarChart
                xAxis={[
                  {
                    data: Object.keys(stat.answers),
                    scaleType: "band",
                    label: "Options",
                  },
                ]}
                series={[
                  {
                    data: Object.values(stat.answers),
                    label: "Number of Responses",
                  },
                ]}
                width={500}
                height={300}
              />
            </Box>
          )}
        </Box>
      ))}
    </div>
  );
};

export default DisplaySurveyResponses;
