import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import PhoneFeild from "../../common/phoneFeild";
import TextInput from "../../common/TextInput";

// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import styles from "./style.module.scss";
import { ShowAlert } from "../../../store/actions/alertActions";
import { useDispatch } from "react-redux";
import { BsChevronRight } from "react-icons/bs";
import axios from "axios";

const Section2 = ({ data, setData, active, setActive }) => {
  const REGEXEMAIL =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const dispatch = useDispatch();
  const [customError, setError] = useState({
    phone: "",
    email: "",
    taken: true,
  });
  const variableSave = localStorage.getItem("User");
  const user = JSON.parse(variableSave);

  const verifyEmail = async (value) => {
    if (value.toString().trim() === "") return;
    const body = JSON.stringify({ email: value });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/checkemail`,
      body,
      config
    );
    const result = await response.data;
    if (result?.success === false) {
      return;
    }
    if (result.msg === "true") {
      setError({ ...customError, email: "true", taken: true });
    } else {
      setError({ ...customError, email: "false", taken: false });
    }
  };

  const ChangeEvent = useCallback(
    async (callFuntion) => {
      if (active === 1) {
        await callFuntion();
        if (data?.email) {
          verifyEmail(data?.email);
          if (customError.email === "true" || customError?.taken) {
            dispatch(ShowAlert("Please change the email its taken", "error"));
            setTimeout(() => {
              setError({ ...customError, email: "", taken: "" });
            }, 2000);
            return;
          }
        }
        if (
          !data?.first_name ||
          !data?.last_name ||
          !data?.email ||
          !data?.password ||
          !data?.contact_number ||
          !data?.password_confirmation
        ) {
          return dispatch(
            ShowAlert(
              "Please fill all the required fields to go further",
              "error"
            )
          );
        }
        setActive((prev) => prev + 1);
        dispatch(ShowAlert("Data submited", "success"));
      }
    },
    [data]
  );

  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: "",
    password: "",
    contact_number: "",
    password_confirmation: "",
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
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum"),
    contact_number: Yup.string()
      .required("Phone Required")
      .min(11, "Phone Should be more then 11 digits"),
    password_confirmation: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const [country_code, setCountryCode] = useState("");

  const onSubmit = async (values) => {
    setData({
      ...data,
      ...values,
      country_code: country_code.trim() === "" ? "AU" : country_code,
    });
    localStorage.setItem(
      "User",
      JSON.stringify({
        first_name: data.first_name,
        last_name: data?.last_name,
      })
    );
  };
  console.log(data);
  return (
    <Box className={styles.innerContent}>
      <>
        <Typography variant="h3">Step 2: Tell us about yourself</Typography>
        <Typography></Typography>
      </>
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
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Box className={styles.parentInput}>
                  <TextInput
                    customClass={styles.input}
                    name="first_name"
                    type="text"
                    placeholder={"Enter First Name"}
                    label="First Name"
                    onChange={(e) => {
                      handleChange(e);
                      setData({ ...data, ...values });
                    }}
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
              <Grid item lg={6} xs={12}>
                <Box className={styles.parentInput}>
                  <TextInput
                    customClass={styles.input}
                    name="last_name"
                    type="text"
                    placeholder={"Enter Last Name"}
                    label="Last Name"
                    onChange={(e) => {
                      handleChange(e);
                      setData({ ...data, ...values });
                    }}
                    // onBlur={handleBlur}
                    value={values.last_name}
                  />
                  <span>
                    {errors.last_name && touched.last_name && errors.last_name}
                  </span>
                </Box>
              </Grid>

              <Grid item lg={6} xs={12}>
                <Box className={styles.parentInput}>
                  <PhoneFeild
                    customClass={styles.input}
                    name="contact_number"
                    type="tel"
                    placeholder={"+614 234 678"}
                    label="Contact Number"
                    country="AU"
                    onCountryChange={(e) => setCountryCode(e)}
                    onChange={(e) => {
                      handleChange(e);
                      setData({
                        ...data,
                        ...values,
                      });
                    }}
                    onBlur={handleBlur}
                  />
                  <span>
                    {" "}
                    {errors.contact_number &&
                      touched.contact_number &&
                      errors.contact_number}
                  </span>
                </Box>
                {/* <Box className={styles.parentInput}>
                  <TextInput
                    customClass={styles.input}
                    name="contact_number"
                    type="tel"
                    onChange={(e) => {
                      handleChange(e);
                      setData({
                        ...data,
                        ...values,
                      });
                    }}
                    // onBlur={handleBlur}
                    value={values.contact_number}
                    placeholder={"041 234 678"}
                    label="Contact Number"
                  />
                  <span>
                    {" "}
                    {errors.contact_number &&
                      touched.contact_number &&
                      errors.contact_number}
                  </span>
                </Box> */}
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box className={styles.parentInput}>
                  <TextInput
                    customClass={styles.input}
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    onBlur={(e) => {
                      setData({ ...data, email: values.email });
                      verifyEmail(values.email);
                    }}
                    onChange={(e) => {
                      handleChange(e);
                      setData({ ...data, ...values });
                    }}
                    // onBlur={handleBlur}
                    value={values.email}
                  />
                  {customError?.email === "true" && (
                    <span>Email is Already taken</span>
                  )}
                  <span>{errors.email && touched.email && errors.email}</span>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box className={styles.parentInput}>
                  <TextInput
                    customClass={styles.input}
                    name="password"
                    type="password"
                    placeholder={"Enter Strong Password"}
                    label="Password"
                    onChange={(e) => {
                      handleChange(e);
                      setData({ ...data, ...values });
                    }}
                    // onBlur={handleBlur}
                    value={values.password}
                  />
                  <span>
                    {errors.password && touched.password && errors.password}
                  </span>
                </Box>
              </Grid>
              <Grid item lg={6} xs={12}>
                <Box className={styles.parentInput}>
                  <TextInput
                    customClass={styles.input}
                    name="password_confirmation"
                    type="password"
                    placeholder={"Re-Enter Strong Password"}
                    label="Confirm Password"
                    onChange={(e) => {
                      handleChange(e);
                      setData({ ...data, ...values });
                    }}
                    onBlur={() => {
                      setData({ ...data, ...values });
                    }}
                    value={values.password_confirmation}
                  />
                  <span>
                    {errors.password_confirmation &&
                      touched.password_confirmation &&
                      errors.password_confirmation}
                  </span>
                </Box>
              </Grid>
            </Grid>
            <Box className={styles.buttonNext}>
              <Button onClick={() => ChangeEvent(handleSubmit)}>
                <BsChevronRight />
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Section2;
