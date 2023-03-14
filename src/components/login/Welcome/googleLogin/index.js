import React, { useEffect, useState } from "react";

import TextInput from "../../../common/TextInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";
import { Box, Typography, Button, CircularProgress, Grid } from "@mui/material";
import CustomSelect from "../../../common/Select";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneFeild from "../../../common/phoneFeild";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../../store/actions/alertActions";
import { googleSingup } from "../../../../store/actions/authActions";

const InterviewPopup = ({ setOpen, open }) => {
  const [selectValue, setSelectValue] = useState("recruitment");
  const auth = useSelector((state) => state?.auth);
  const member = useSelector((state) => state?.member);

  const dispatch = useDispatch();

  const initialValues = {
    first_name: auth?.results?.first_name,
    last_name: auth?.results?.last_name,
    email: auth?.results?.email,
    contact_number: "",
    profile_image: auth?.results?.profile_image,
    password: "",
    confirm_password: "",
  };

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    contact_number: Yup.string()
      .required("Phone Required")
      .min(11, "Phone Should be more then 11 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum"),
    confirm_password: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const [country_code, setCountryCode] = useState("");

  const onSubmit = async (values, { resetForm }) => {
    const local_data = {
      ...values,
      password_confirmation: values?.confirm_password,
      type: selectValue,
      country_code: country_code.trim() === "" ? "AU" : country_code,
      terms: 1,
      social_type: "google",
    };
    dispatch(googleSingup(local_data));
  };

  const options = [
    { value: "recruitment", label: "Recruiter" },
    { value: "candidate", label: "Candidate" },
  ];

  return (
    <Box className="googlebox">
      <Box className="interviewParrent ">
        <Typography variant="h3"> User Details</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} lg={6}>
                  <Box className={"box-parent-textInput"}>
                    <CustomSelect
                      options={options}
                      customClass={"interviewSelect"}
                      placeholder="Type"
                      label={<>Type</>}
                      // value={values.invitation}
                      // onChange={setFieldValue}
                      // onBlur={setFieldTouched}
                      defaultValue={options[0]}
                      onChange={(location) => setSelectValue(location.value)}
                    />
                    {/* <span>
           
                {errors.invitation && touched.invitation && errors.invitation}
              </span> */}
                  </Box>
                </Grid>

                <Grid item md={12} xs={12} lg={6}>
                  <Box className={"box-parent-textInput"}>
                    <TextInput
                      autoComplete="off"
                      label={"First Name"}
                      disabled={true}
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      customClass={"inputInterview"}
                      onChange={handleChange}
                      // onBlur={handleBlur}

                      value={values.first_name}
                    />
                    <span>
                      {errors.first_name &&
                        touched.first_name &&
                        errors.first_name}
                    </span>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} lg={6}>
                  <Box className={"box-parent-textInput"}>
                    <TextInput
                      autoComplete="off"
                      label={"Last Name"}
                      disabled={true}
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      customClass={"inputInterview"}
                      onChange={handleChange}
                      // onBlur={handleBlur}

                      value={values.last_name}
                    />
                    <span>
                      {errors.last_name &&
                        touched.last_name &&
                        errors.last_name}
                    </span>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} lg={6}>
                  <Box className={"box-parent-textInput"}>
                    <TextInput
                      autoComplete="off"
                      label={"Email"}
                      disabled={true}
                      type="text"
                      name="email"
                      placeholder="Email"
                      customClass={"inputInterview"}
                      onChange={handleChange}
                      // onBlur={handleBlur}

                      value={values.email}
                      // disabled={member?.editedMember?.results?.email && true}
                    />
                    <span>{errors.email && touched.email && errors.email}</span>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} lg={6}>
                  <Box className={"box-parent-textInput"}>
                    <PhoneFeild
                      autoComplete={"off"}
                      customClass={"inputInterview maxHeight"}
                      name="contact_number"
                      type="tel"
                      label="Contact Number"
                      // labelFalse={true}
                      placeholder={"+614 234 678"}
                      country="AU"
                      onCountryChange={(e) => setCountryCode(e)}
                      value={values.contact_number}
                      onChange={(e) => handleChange(e)}
                      onBlur={handleBlur}

                      // onBlur={handleBlur}
                    />
                    <span>
                      {" "}
                      {errors.contact_number &&
                        touched.contact_number &&
                        errors.contact_number}
                    </span>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} lg={6}>
                  <Box className={"box-parent-textInput"}>
                    <TextInput
                      autoComplete="off"
                      customClass={"inputInterview"}
                      name="password"
                      type="password"
                      placeholder={"Enter Strong Password"}
                      label="Password"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      // onBlur={handleBlur}
                      value={values.password}
                    />
                    <span>
                      {errors.password && touched.password && errors.password}
                    </span>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} lg={6}>
                  <Box className={"box-parent-textInput"}>
                    <TextInput
                      autoComplete="off"
                      customClass={"inputInterview"}
                      name="confirm_password"
                      type="password"
                      placeholder={"Re-Enter Strong Password"}
                      label="Confirm Password"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={values.confirm_password}
                    />
                    <span>
                      {errors.confirm_password &&
                        touched.confirm_password &&
                        errors.confirm_password}
                    </span>
                  </Box>
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <Box className="button-primary buttoninterview">
                    <Button
                      onClick={() => setOpen(false)}
                      className="secondary-btn"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={auth?.loading}>
                      {auth?.loading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        "  Submit"
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default InterviewPopup;
