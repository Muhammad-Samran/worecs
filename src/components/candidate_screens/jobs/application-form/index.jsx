import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import styles from "./styles.module.scss";
import TextInput from "../../../common/TextInput";
import CustomSelect from "../../../common/Select";

const Index = () => {
  const options = [
    { value: "Part Time", label: "Part Time" },
    { value: "Full Time", label: "Full Time" },
    { value: "Remote", label: "Remote" },
  ];
  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Application Form</Typography>
        <Typography component="p">
          Please Fill the following form with required information
        </Typography>
        <Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: "200px" }}
          >
            <Grid item xs={12} md={6}>
              <TextInput type="text" name="jobtitle" label="Job Title" />
              <CustomSelect
                options={options}
                sx={{ maxWidth: "initial" }}
                placeholder="Part Time"
                label="Employment type"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                type="text"
                name="shift-avail"
                label="Shift available"
              />
              <TextInput
                type="text"
                name="notice-period"
                label="Notice period"
              />
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h4" sx={{ mt: 5, mb: 4 }}>
          Personal Details
        </Typography>
        <Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: "200px" }}
          >
            <Grid item xs={12} md={6}>
              <TextInput type="text" name="name" label="Name" />
              <TextInput type="email" name="email" label="Email address" />
              <TextInput type="text" name="address" label="Street address" />
              <CustomSelect
                options={options}
                sx={{ maxWidth: "initial" }}
                placeholder="State"
                label="State"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput type="text" name="dob" label="Date of birth" />
              <TextInput
                type="text"
                name="contact-number"
                label="Contact number"
              />
              <TextInput type="text" name="suburb" label="Suburb" />
              <TextInput type="text" name="country" label="Country" />
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h4" sx={{ mt: 5, mb: 4 }}>
          Additional Questions
        </Typography>
        <Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: "200px" }}
          >
            <Grid item xs={12} md={6}>
              <CustomSelect
                options={options}
                sx={{ maxWidth: "initial" }}
                placeholder="Yes"
                label="1. Are you an Australia Citizen or Resident?"
              />
              <TextInput
                type="text"
                name="name"
                label="2. If you have holidays booked, Select Date? (Optional Date)"
              />
              <TextInput
                type="email"
                name="email"
                label="3. Do you have your own transport? (Optional Date)"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Index;
