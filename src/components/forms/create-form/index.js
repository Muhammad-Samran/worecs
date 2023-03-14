import React, { useState } from "react";

import TextInput from "../../common/TextInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";
import { Box, Typography, Button } from "@mui/material";
import CustomSelect from "../../common/Select";

const InterviewPopup = () => {
  const [selectValue, setSelectValue] = useState(0);

  const options = [
    { value: "Office", label: "Office" },
    { value: "Online", label: "Online" },
  ];
  return (
    <Box className="interviewParrent">
      <Typography variant="h3">Create Form</Typography>

      <TextInput
        type="text"
        name="time"
        placeholder="Form Name"
        customClass={"inputInterview"}
      />
      <CustomSelect
        options={[]}
        customClass={"interviewSelect"}
        placeholder="Choose Form Type"
        onChange={(location) => setSelectValue(location.value)}
      />

      <Box className="button-primary buttoninterview">
        <Button className="secondary-btn">Cancel</Button>
        <Button>Create Now</Button>
      </Box>
    </Box>
  );
};

export default InterviewPopup;
