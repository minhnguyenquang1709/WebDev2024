import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormBuilderView from "./FormBuilderView";

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

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        console.log(`props title: ${props.title}`)
    })

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
                    id={props._id}
                    initialTitle={props.title}
                    initialDescription={props.description}
                    initialQuestions={props.questions}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <h2>Responses</h2>
                <p>Here you can manage the responses of your form.</p>
            </TabPanel>
        </div>
    );
};

export default BodyForm;
