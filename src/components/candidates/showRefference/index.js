import React, { useState } from "react";

import TextInput from "../../common/TextInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import CustomSelect from "../../common/Select";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";
import {
  createSingleInterviewFunc,
  resetSingleCandidateReff,
} from "../../../store/actions/singleCandidateScreenActions";
import { useEffect } from "react";
import Stars from "../../common/ratting";
import { date } from "yup";

const InterviewPopup = ({ opne, setOpen, data, name, certificate }) => {
  console.log(data);
  const [selectValue, setSelectValue] = useState(0);
  const [startDate, setStartDate] = useState("");
  const candidateID = JSON.parse(localStorage.getItem("candidateID"));

  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const candidate = useSelector((state) => state?.rcandidate);
  const singleCandidate = useSelector((state) => state?.singleCandidate);

  return (
    <Box className="interviewParrent">
      <Typography variant="h3">{name || "Reference Data"}</Typography>
      {certificate ? (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="First Name"
              value={data?.candidate_license?.first_name}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Last Name"
              value={data?.candidate_license?.last_name}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Email"
              value={data?.candidate_license?.email}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Phone Number"
              value={data?.candidate_license?.contact_number}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Date Of Birth"
              value={data?.candidate_license?.dob}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Passport Number"
              value={data?.candidate_license?.passport_number}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Visa"
              value={data?.candidate_license?.visa_number}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Industry Certificate Name"
              value={data?.industry_certification_license?.name}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextInput
              disabled={true}
              label="Recruiter Industry"
              value={data?.recruiter_industry?.name}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextInput
              disabled={true}
              label="Address"
              textarea={true}
              value={data?.candidate_license?.address}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Issue Date"
              value={data?.issue_date}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Expiry Date"
              value={data?.expiry_date}
              customClass={"inputReffShow"}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Licensing Institution"
              value={data?.licensing_body}
              customClass={"inputReffShow"}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Document Number"
              value={data?.document_number}
              customClass={"inputReffShow"}
            />
          </Grid>

          <Grid item xs={6} lg={6}>
            <Box className="stars-form">
              <label>Front Image</label>
              <img
                src={`${process.env.REACT_APP_URL}${data?.front_image}`}
                width={70}
                height={70}
              />
            </Box>
          </Grid>
          <Grid item xs={6} lg={6}>
            <Box className="stars-form">
              <label>Back Image</label>
              <img
                src={`${process.env.REACT_APP_URL}${data?.back_image}`}
                width={70}
                height={70}
              />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Full Name"
              value={data?.full_name}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Job Title"
              value={data?.job_title}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Email"
              value={data?.email}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Phone Number"
              value={data?.contact_number}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Reference Relationship"
              value={data?.reference_relationship}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Reference Company Name"
              value={data?.reference_company_name}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Company Speciality Title"
              value={data?.company_specialty_title}
              customClass={"inputReffShow"}
            />
          </Grid>
          {/* <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Company Start Date"
              value={data?.company_start_date}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Company End Date"
              value={data?.company_end_date}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextInput
              disabled={true}
              textarea
              label="Feedback"
              value={data?.feedback}
              customClass={"inputReffShow"}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Attendance"
              value={data?.attendance}
              customClass={"inputReffShow"}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label="Present Workspace"
              value={data?.present_workspace}
              customClass={"inputReffShow"}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label=" Strongest Attribute"
              value={data?.strongest_attribute}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextInput
              disabled={true}
              label=" Signature"
              style={{ fontStyle: "italic" }}
              value={data?.reference_signature}
              customClass={"inputReffShow"}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box className="stars-form">
              <label>Punctuality</label>
              <Stars num={Number(data?.punctuality)} />
            </Box>
        
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box className="stars-form">
              <label>Workspace Presentation</label>
              <Stars num={Number(data?.workspace_presentation)} />
            </Box>
          
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box className="stars-form">
              <label>Communicate Team Members</label>
              <Stars num={Number(data?.communicate_team_member)} />
            </Box>
        
          </Grid> */}
        </Grid>
      )}
    </Box>
  );
};

export default InterviewPopup;
