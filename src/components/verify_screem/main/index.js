import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { BsChevronLeft } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import TextInput from "../../common/TextInput";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ShowAlert } from "../../../store/actions/alertActions";
import { routes } from "../../../routes";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Main = ({ forgetPass }) => {
  const { token } = useParams();
  const API_PATH = forgetPass
    ? `check-reset-password-code`
    : `user/verify/${token}`;
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [loading, isLoading] = useState(false);
  const [loading2, isLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [pass, setPass] = useState(false);
  const [verification_code, setId] = useState("");

  const verificationRequest = async (verification_code) => {
    if (verification_code === "") {
      return dispatch(ShowAlert("Field is empty", "error"));
    }
    isLoading(true);
    const body = forgetPass
      ? JSON.stringify({
          code: verification_code,
          token,
        })
      : JSON.stringify({
          verification_code: verification_code,
        });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/${API_PATH}`,
      body,
      config
    );

    const response = await request.data;
    if (response.success === true) {
      isLoading(false);
      dispatch(ShowAlert("Verified ", "success"));

      forgetPass ? setPass(true) : navigation(routes.LOGIN);
    }
    if (response.success === false) {
      isLoading(false);
      forgetPass
        ? dispatch(ShowAlert("Verification code not matched", "error"))
        : typeof response?.message === "object"
        ? Object.entries(response?.message)?.map(([key, value], i) =>
            dispatch(ShowAlert(value, "error"))
          )
        : dispatch(ShowAlert(response?.message, "error"));
      // console.log();
    }
  };

  const initialValues2 = {
    password: "",
    confirm_password: "",
  };
  const forgetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum"),
    confirm_password: Yup.string()
      .required("Confirm password Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  const onSubmitPassword = async (values) => {
    isLoading(true);
    const body = JSON.stringify({
      ...values,
      code: verification_code,
      token: token,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/change-password`,
        body,
        config
      );
      const getResponse = await response.data;
      if (getResponse.success === true) {
        dispatch(ShowAlert(getResponse?.message, "success"));
        navigation(routes.LOGIN);
        isLoading(false);
      }
      if (getResponse.success === false) {
        typeof getResponse?.message === "object"
          ? Object.entries(getResponse?.message)?.map(([key, value], i) =>
              dispatch(ShowAlert(value, "error"))
            )
          : dispatch(ShowAlert(getResponse?.message, "error"));

        isLoading(false);
      }
    } catch (e) {
      dispatch(ShowAlert("Something went wrong", "error"));
      isLoading(false);
    }

    return;
  };

  const onSubmitEmail = async (values) => {
    isLoading2(true);
    const body = JSON.stringify({ email: values });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/resend/verification`,
        body,
        config
      );
      const getResponse = await response.data;
      console.log(getResponse);
      if (getResponse.success === true) {
        dispatch(ShowAlert(getResponse?.message, "success"));
        isLoading2(false);

        // navigation(`${routes.verify_token}/${getResponse?.results}`);
        // resetForm();
        // `${routes.verify_token}/${auth?.newSignup?.results?.token}`
        // navigation(
        //   `${routes.verify_email_forget_password}/${getResponse?.results?.token}`
        // );
      }
      if (getResponse.success === false) {
        if (typeof getResponse?.message === "object") {
          Object.entries(getResponse?.message)?.map(([key, value], i) =>
            dispatch(ShowAlert(value, "error"))
          );
        } else {
          dispatch(ShowAlert(getResponse?.message, "error"));
        }

        isLoading2(false);
        // resetForm();
      }
    } catch (e) {
      dispatch(ShowAlert("Something went wrong", "error"));
      isLoading2(false);
    }

    return;
  };

  const onSubmitEmail2 = async (values) => {
    isLoading2(true);
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
        isLoading2(false);
      }
      if (getResponse.success === false) {
        if (typeof getResponse?.message === "object") {
          Object.entries(getResponse?.message)?.map(([key, value], i) =>
            dispatch(ShowAlert(value, "error"))
          );
        } else {
          dispatch(ShowAlert(getResponse?.message, "error"));
        }

        isLoading2(false);
      }
    } catch (e) {
      dispatch(ShowAlert("Something went wrong", "error"));
      isLoading2(false);
    }

    return;
  };

  return (
    <Box className={styles.mainHead}>
      {/* <MailModel open={open} setOpen={setOpen} setfieldss={setFeilds} /> */}
      <Box className={styles.content}>
        <Typography variant="h2">
          Welcome to <span> Worecs! </span>
        </Typography>
        <Typography variant="h3">
          {forgetPass ? "Reset Password" : "Email Verification Code"}
        </Typography>
        {pass ? (
          <Formik
            initialValues={initialValues2}
            validationSchema={forgetPasswordSchema}
            onSubmit={onSubmitPassword}
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
                    name="password"
                    type="password"
                    placeholder="Enter new Password"
                    label="New Password"
                    value={values?.password}
                    customClass={styles.input}
                    onChange={handleChange}
                  />
                  <span>
                    {errors.password && touched.password && errors.password}
                  </span>
                </Box>
                <Box className={styles.parentInput}>
                  <TextInput
                    name="confirm_password"
                    type="password"
                    placeholder="Enter Confirm Password"
                    label="Confrim Password"
                    value={values.confirm_password}
                    customClass={styles.input}
                    onChange={handleChange}
                  />
                  <span>
                    {errors.confirm_password &&
                      touched.confirm_password &&
                      errors.confirm_password}
                  </span>
                </Box>
                <Box className="button-primary">
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      " Reset"
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        ) : (
          <Box>
            <TextInput
              name="verification_code"
              placeholder="Please enter the 6-digits code sent to your email"
              label="Enter Code"
              type="text"
              value={verification_code}
              onKeyPress={(e) =>
                verification_code?.length > 5 && e.preventDefault()
              }
              onChange={(e) => {
                setId(e?.target?.value);
              }}
              customClass={styles.input}
            />
            <Box className={`button-primary ${styles.button}`}>
              <Button
                className={"secondary-btn"}
                onClick={() =>
                  location?.state?.email2
                    ? onSubmitEmail2({ email: location?.state?.email2 })
                    : onSubmitEmail(location?.state?.email)
                }
                disabled={loading2}
              >
                {loading2 ? (
                  <CircularProgress style={{ color: "black" }} />
                ) : (
                  "Resend"
                )}
              </Button>
              <Button
                onClick={() => verificationRequest(verification_code)}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Main;
