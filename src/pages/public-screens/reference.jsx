import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../src/assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import TextInput from "../../../src/components/common/TextInput";
import CustomSelect from "../../../src/components/common/Select";
import Checkbox from "../../../src/components/common/checkbox";
import styles from "./styles.module.scss";
import { Button, Grid, Container } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  addReferences,
  guestReferenceAccept,
  guestReferenceStore,
} from "../../../src/api/candidate/candidate.class";
import PhoneFeild from "../../../src/components/common/phoneFeild";
import { ShowAlert } from "../../../src/store/actions/alertActions";
import Alerts from "../../../src/components/common/Alert";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export const GuestReference = () => {
  const dispatch = useDispatch();
  // const candidateId = useSelector((state) => state?.auth?.results?.candidate_id);
  const navigate = useNavigate();
  const { Token } = useParams();
  const [value, setValue] = useState();

  useEffect(() => {
    const API = async () => {
      try {
        const response = await guestReferenceAccept(Token);
        // console.log(response?.data?.results);
        setValue(response?.data?.results);
      } catch (e) {
        console.log("Error: " + e);
      }
    };
    API();
  }, [Token]);

  const initialValues = {
    full_name: value?.full_name || "",
    job_title: value?.job_title || "",
    email: value?.email || "",
    contact_number: value?.contact_number || "",
    reference_relationship: value?.reference_relationship || "",
    reference_company_name: value?.reference_company_name || "",
    company_specialty_title: value?.company_specialty_title || "",
    reference_signature: value?.reference_signature || "",
    company_start_date: value?.company_start_date
      ? moment(value?.company_start_date).format("yyyy-MM")
      : "",
    company_end_date: value?.company_end_date
      ? moment(value?.company_end_date).format("yyyy-MM")
      : "",
    punctuality: value?.punctuality || "",
    attendance: value?.attendance || "",
    workspace_presentation: value?.workspace_presentation || "",
    communicate_team_member: value?.communicate_team_member || "",
    strongest_attribute: value?.strongest_attribute || "",
    signature: value?.signature || "",
    feedback: value?.feedback || "",
  };
  const referenceSchema = Yup.object().shape({
    full_name: Yup.string().required("Required"),
    job_title: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contact_number: Yup.string().required("Required"),
    reference_relationship: Yup.string().required("Required"),
    reference_company_name: Yup.string().required("Required"),
    // company_specialty_title: Yup.string().required("Required"),
    // reference_signature: Yup.string().required("Required"),
    company_start_date: Yup.string().required("Required"),
    company_end_date: Yup.string().required("Required"),
  });
  const [country_code, setCountryCode] = useState(value?.country_code || "");

  const onSubmit = async (values) => {
    try {
      const payload = {
        candidate_references: {
          reference_0: {
            ...values,
            country_code: country_code.trim() === "" ? "AU" : country_code,
            // request_type: "candidate",
          },
        },
      };
      console.log(payload);
      const response = await guestReferenceStore(value?.uuid, {
        ...payload,
        uuid: value?.uuid,
      });
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Alerts />
      {value ? (
        <Container>
          <Box className="pt-4 pb-4">
            <Box className={styles.modalwapper}>
              <Typography variant="h4" className={styles.heading}>
                Reference
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={referenceSchema}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  handleBlur,
                }) => (
                  <form onSubmit={handleSubmit} className={styles.formsBox}>
                    <Box className={styles.statusbox}>
                      <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="full_name"
                            label="Full Name"
                            sx={{ minWidth: "auto" }}
                            value={values.full_name}
                            onChange={handleChange}
                          />
                          <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="job_title"
                            label="Job Title"
                            sx={{ minWidth: "auto" }}
                            value={values.job_title}
                            onChange={handleChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <TextInput
                            customClass={styles.boxForm}
                            type="email"
                            name="email"
                            label="Email address"
                            sx={{ minWidth: "auto" }}
                            value={values.email}
                            onChange={handleChange}
                          />
                          <PhoneFeild
                            customClass={styles.input}
                            name="contact_number"
                            type="tel"
                            placeholder={"+614 234 678"}
                            label="Contact Number"
                            country="AU"
                            onCountryChange={(e) => setCountryCode(e)}
                            value={values.contact_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="reference_relationship"
                            label="Relationship"
                            sx={{ minWidth: "auto" }}
                            value={values.reference_relationship}
                            onChange={handleChange}
                          />
                          <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="reference_company_name"
                            label="Company Name"
                            sx={{ minWidth: "auto" }}
                            value={values.reference_company_name}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          {/* <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="company_specialty_title"
                            label="Company Specialty Title"
                            sx={{ minWidth: "auto" }}
                            value={values.company_specialty_title}
                            onChange={handleChange}
                          /> */}
                          <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="reference_signature"
                            label="Referee Signature"
                            sx={{ minWidth: "auto" }}
                            value={values.reference_signature}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextInput
                            customClass={styles.boxForm}
                            type="date"
                            sx={{ maxWidth: "initial" }}
                            label="Start Date*"
                            name="company_start_date"
                            onChange={handleChange}
                            value={values.company_start_date}
                          />
                          <span>
                            {errors.company_start_date &&
                              touched.company_start_date &&
                              errors.company_start_date}
                          </span>
                        </Grid>
                        <Grid item xs={6}>
                          <TextInput
                            customClass={styles.boxForm}
                            type="date"
                            sx={{ maxWidth: "initial" }}
                            label="End Date*"
                            name="company_end_date"
                            onChange={handleChange}
                            value={values.company_end_date}
                          />
                          <span>
                            {errors.company_end_date &&
                              touched.company_end_date &&
                              errors.company_end_date}
                          </span>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Punctuality
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="punctuality"
                              onChange={handleChange}
                            >
                              <span className="p-2 text-uppercase fw-bold">
                                Poor
                              </span>
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="N/A"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio />}
                                label="4"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio />}
                                label="5"
                              />
                              <span className="p-2 text-uppercase fw-bold">
                                Excellent
                              </span>
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              How did you find this presentation in the
                              workspace?
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="workspace_presentation"
                              onChange={handleChange}
                            >
                              {/* <span className="p-2 text-uppercase fw-bold">
                              Poor
                            </span> */}
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="N/A"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio />}
                                label="4"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio />}
                                label="5"
                              />
                              {/* <span className="p-2 text-uppercase fw-bold">
                              Excellent
                            </span> */}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              Attendance
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="attendance"
                              onChange={handleChange}
                            >
                              <span className="p-2 text-uppercase fw-bold">
                                Poor
                              </span>
                              <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="N/A"
                              />
                              <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="1"
                              />
                              <FormControlLabel
                                value="2"
                                control={<Radio />}
                                label="2"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio />}
                                label="3"
                              />
                              <FormControlLabel
                                value="4"
                                control={<Radio />}
                                label="4"
                              />
                              <FormControlLabel
                                value="5"
                                control={<Radio />}
                                label="5"
                              />
                              <span className="p-2 text-uppercase fw-bold">
                                Excellent
                              </span>
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              How would you discribe your ability to organise,
                              prioritise and manage time?
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="feedback"
                              onChange={handleChange}
                            >
                              {/* <span className="p-2 text-uppercase fw-bold">
                              Poor
                            </span> */}
                              <FormControlLabel
                                value="great"
                                control={<Radio />}
                                label="Great"
                              />
                              <FormControlLabel
                                value="average"
                                control={<Radio />}
                                label="Average"
                              />
                              <FormControlLabel
                                value="room"
                                control={<Radio />}
                                label="Room for improvement"
                              />
                              <FormControlLabel
                                value="horrible"
                                control={<Radio />}
                                label="Horrible"
                              />
                              {/* <span className="p-2 text-uppercase fw-bold">
                              Excellent
                            </span> */}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="communicate_team_member"
                            label="How did you relate with other team members?"
                            sx={{ minWidth: "auto" }}
                            value={values.communicate_team_member}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextInput
                            customClass={styles.boxForm}
                            type="text"
                            name="strongest_attribute"
                            label="How did you say are XXX's strongest attributes?"
                            sx={{ minWidth: "auto" }}
                            value={values.strongest_attribute}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>

                      <Box className={`${styles.button} button-primary `}>
                        <Box className="d-flex flex-colomn justify-content-center p-3">
                          {" "}
                          <Button className="secondary-btn w-25 m-1">
                            Cancel
                          </Button>
                          <Button className="m-1 w-25" type="submit">
                            Save
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Box>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};
