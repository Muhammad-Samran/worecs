import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import styles from "./styles.module.scss";

import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../common/TextInput";
import { routes } from "../../../routes";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";
import {
  googleAuthSucces,
  googleLogin,
  loginApi,
  LoginUser,
} from "../../../store/actions/authActions";
import jwt_decode from "jwt-decode";

import HomeBack from "../../../assets/icons/home-back.svg";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import ModelOpen from "./model";

import ModelChildren from "./googleLogin/index";

const Welcome = () => {
  const [open, setOpen] = useState(false);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [store, setStore] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };
  const token = JSON.parse(localStorage.getItem("token"));
  const userType = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (auth?.verfiy?.msg === "true") {
      setOpen(false);
      dispatch(
        googleLogin({
          email: auth?.results?.email,
          is_sociallogin: 1,
        })
      );
    } else if (auth?.verfiy?.msg === "false") {
      setOpen(true);
    }
  }, [auth?.verfiy, auth?.verfiy?.msg]);

  useEffect(() => {
    if (auth?.results?.is_verified === 0) {
      return navigate(routes.RESEND_VERIFICATION, {
        state: {
          email: store,
        },
      });
    }
  }, [auth?.results?.is_verified]);

  useEffect(() => {
    if (
      auth?.results &&
      !auth?.isNewUser &&
      auth?.results?.is_verified !== 0 &&
      auth?.googleAuth === false
    ) {
      if (auth?.results?.type === "recruitment" && !auth?.isNewUser) {
        return navigate(
          userType !== "recruitment"
            ? routes.CANDIDATE_DASHBOARD
            : routes.DASHBOARD
        );
      }
    }
  }, [auth?.results?.type, navigate, auth?.isNewUser, auth?.results, userType]);
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum"),
  });
  const onSubmit = (values) => {
    dispatch(loginApi(values));
    setStore(values?.email);
  };

  return (
    <>
      <ModelOpen open={open} setOpen={setOpen}>
        <ModelChildren open={open} setOpen={setOpen} />
      </ModelOpen>

      <Box className={styles.leftBox}>
        <Box className={styles.content}>
          <Box className={styles.backbtnbox}>
            <Link to="/">
              <img className={styles.backbtn} src={HomeBack} />
              Back
            </Link>
          </Box>
          <Typography variant="h2">Welcome to Worecs!</Typography>
          <Typography variant="h3">
            Join the number 1 business administration workflow platform. <br />{" "}
            Log in now as businesses and companies require a simple way of
            managing their business administration workflow for their
            consultants in an easy way.
          </Typography>
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
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className={styles.formsBox}>
                <Box className={styles.parentInput}>
                  <TextInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter verified email here."
                    onChange={handleChange}
                    value={values.email}
                  />
                  <span>{errors.email && touched.email && errors.email}</span>
                </Box>
                <Box className={styles.parentInput}>
                  <TextInput
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter verified password here. "
                    onChange={handleChange}
                    value={values.password}
                  />
                  <span>
                    {errors.password && touched.password && errors.password}
                  </span>
                </Box>
                <Box className={styles.forget}>
                  <Link to={routes.FORGET_PASSWORD}>Forgot Password?</Link>
                </Box>
                <Box className={"button-primary"}>
                  <Button
                    onClick={handleSubmit}
                    disabled={auth?.isLoading}
                    sx={{ marginBottom: "10px" }}
                  >
                    {auth?.isLoading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <GoogleOAuthProvider
                    clientId={process.env.REACT_APP_CLIENT_GOTH_CLIENT}
                  >
                    {" "}
                    <GoogleLogin
                      size={"small"}
                      onSuccess={(credentialResponse) => {
                        dispatch(googleAuthSucces(credentialResponse));
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </GoogleOAuthProvider>
                </Box>

                <Box className={styles.bottom}>
                  <Typography variant="h5">Don’t have an account?</Typography>
                  <Link to={routes.SIGNUP}>Sign Up Now</Link>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Welcome;
