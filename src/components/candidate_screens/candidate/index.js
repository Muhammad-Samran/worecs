import { Grid, Box, Typography, Button } from "@mui/material";

import React, { useState } from "react";
import SelectSection from "../../common/single-candidate";
import styles from "./styles.module.scss";
import { ReactComponent as Girl } from "../../../assets/candidates/girl.svg";
import SingleCandidateTabel from "./single-candidate-table";

const Candidate = () => {
  const [open, setOpen] = useState(false);
  const information = [
    {
      label: `Email Address`,
      ans: `aymun.dar@vrtechsol.com`,
    },
    {
      label: `Contact #`,
      ans: `+61 4312 535 31`,
    },
    {
      label: `Country`,
      ans: `Austrailia`,
    },
    {
      label: `Organization`,
      ans: `VRTECHSOL`,
    },
    {
      label: `Job Role`,
      ans: `Full Stack Developer`,
    },
    {
      label: `Sector`,
      ans: `Information Technology`,
    },
  ];
  return (
    <Box className={styles.candidate}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={styles.header}>
            <Typography variant="h4">Graphics Designer</Typography>
            <Typography>W-#1234</Typography>
            <Box className={styles.viewText}>
              <Typography variant="h3">Application Form</Typography>
              <Typography component="p">
                <span>Click here to view offer letter</span>
                <br />
                You have recived an application form <span>click here</span> to
                view it
              </Typography>
            </Box>
            <Box className={styles.viewText}>
              <Typography variant="h3">Job Offer Letter</Typography>
              <Typography component="p">
                <span>Click here to view offer letter</span>
                <br />
                You have recived an offer letter, <span>click here</span> to
                view it
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box className={styles.tabelSection}>
        <Box className={styles.table1}>
          <Typography variant="h4">References</Typography>
          <SingleCandidateTabel
            titles={[
              " Name",
              "Phone Number",
              "Email Address",
              " Form Title",
              " Status",
              "  Action",
            ]}
            rows={[
              {
                id: `Jack Effron`,
                name: `+6123456781`,
                status: `jackeffron@gmail.com`,
                reff: `Application Form`,
                lof: `Not Responded Yet`,
              },
              {
                id: `Jack Effron`,
                name: `+6123456781`,
                status: `jackeffron@gmail.com`,
                reff: `Application Form`,
                lof: `Not Responded Yet`,
              },
              {
                id: `Jack Effron`,
                name: `+6123456781`,
                status: `jackeffron@gmail.com`,
                reff: `Application Form`,
                lof: `Not Responded Yet`,
              },
              {
                id: `Jack Effron`,
                name: `+6123456781`,
                status: `jackeffron@gmail.com`,
                reff: `Application Form`,
                lof: `Not Responded Yet`,
              },
            ]}
          />
        </Box>
        <Box className={styles.table1}>
          <Typography variant="h4">Licenses & Certification</Typography>
          <SingleCandidateTabel
            titles={[
              " Industry Name",
              "License Name",
              "Date",
              "Status",

              "  Action",
            ]}
            rows={[
              {
                id: `Real Estate`,
                name: `Driving license`,
                status: `20-02-2022`,
                reff: `Not Responded Yet`,
              },
              {
                id: `Real Estate`,
                name: `Driving license`,
                status: `20-02-2022`,
                reff: `Not Responded Yet`,
              },
              {
                id: `Real Estate`,
                name: `Driving license`,
                status: `20-02-2022`,
                reff: `Not Responded Yet`,
              },
              {
                id: `Real Estate`,
                name: `Driving license`,
                status: `20-02-2022`,
                reff: `Not Responded Yet`,
              },
            ]}
          />
        </Box>
      </Box>
      {/* <Box className={styles.list}>
        <Box className={styles.selectBox1}>
          <SelectSection
            title={"Induction Form"}
            des={
              "select any one application form from the options below. if the relevant form is Not Available, kindly go back to forms tab & create or upload a new one."
            }
          />
        </Box>
      </Box> */}
    </Box>
  );
};

export default Candidate;
