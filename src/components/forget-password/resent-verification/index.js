import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./styles.module.scss";
import TextInput from "../../common/TextInput";
import MailModel from "../MailConfirmationModel/index";
import { ShowAlert } from "../../../store/actions/alertActions";
import { routes } from "../../../routes";

const Main = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [showpassFeild, setFeilds] = useState(false);
  const [loading, isLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  // const [diabled, isDisabled] = React.useState(false);
  // const ChangeEvent = () => {
  //   if (active === steps.length - 1) {
  //     isDisabled(true);
  //     navigation("/login");
  //   }
  //   setActive((prev) => prev + 1);
  // };
  const passwordShow = () => {
    setOpen(true);
  };
  const navigationPass = () => {
    showpassFeild ? setFeilds(false) : navigation("/login");
  };

  const initialValues = {
    email: "",
  };
  const initialValues2 = {
    password: "",
    password_confirmation: "",
  };

  const forgetEmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const forgetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum"),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const onSubmitEmail = async (values, { resetForm }) => {
    isLoading(true);
    const body = JSON.stringify(values);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reset-password-request`,
        body,
        config
      );
      const getResponse = await response.data;
      if (getResponse.success === true) {
        dispatch(ShowAlert(getResponse?.message, "success"));
        isLoading(false);

        resetForm();
        navigation(
          `${routes.verify_email_forget_password}/${getResponse?.results?.token}`,
          {
            state: {
              email2: values?.email,
            },
          }
        );
      }
      if (getResponse.success === false) {
        if (typeof getResponse?.message === "object") {
          Object.entries(getResponse?.message)?.map(([key, value], i) =>
            dispatch(ShowAlert(value, "error"))
          );
        } else {
          dispatch(ShowAlert(getResponse?.message, "error"));
        }

        isLoading(false);
        resetForm();
      }
    } catch (e) {
      dispatch(ShowAlert("Something went wrong", "error"));
      isLoading(false);
    }

    return;
  };

  return (
    <Box className={styles.mainHead}>
      <MailModel open={open} setOpen={setOpen} setFeilds={setFeilds} />
      <Box className={styles.content}>
        <Typography variant="h2">Welcome to Worecs!</Typography>
        <Typography variant="h3">
          {" "}
          {showpassFeild ? "Reset Password" : "Forgot Password?"}{" "}
        </Typography>
        <Typography>
          {showpassFeild
            ? "Enter the new password here so we can Update your password"
            : `Enter your email address and we'll send you a link to reset it.`}
        </Typography>
        {showpassFeild ? (
          <></>
        ) : (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={forgetEmailSchema}
              onSubmit={onSubmitEmail}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={styles.boxparent}>
                  <Box className={styles.parentInput}>
                    <TextInput
                      name="email"
                      placeholder="Enter Email Address"
                      label="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                      customClass={styles.input}
                    />
                    <span>{errors.email && touched.email && errors.email}</span>
                  </Box>
                  <Box className="button-primary">
                    <Button disabled={isSubmitting} onClick={handleSubmit}>
                      {loading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        " Submit"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </>
        )}
      </Box>
      <Box className={styles.buttonNext}>
        <Button onClick={navigationPass}>
          <BsChevronLeft />
        </Button>
      </Box>
    </Box>
  );
};

export default Main;
