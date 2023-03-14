import React, { useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import styles from "./styles.module.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";
import TextInput from "../../../common/TextInput";
import { routes } from "../../../../routes";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../../store/actions/alertActions";
import { loginApi, LoginUser } from "../../../../store/actions/authActions";
import HomeBack from "../../../../assets/icons/home-back.svg";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getSingleJob } from "../../../../store/actions/homeJobActions";

const Welcome = ({ open, setOpen }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const initialValues = {
    email: "",
    password: "",
  };
  const token = JSON.parse(localStorage.getItem("token"));
  const userType = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (auth?.results && !auth?.isNewUser) {
      if (auth?.results?.access_token && !auth?.isNewUser) {
        setOpen(false);
        dispatch(getSingleJob(location?.state?.slug));
      }
    }
  }, [
    auth?.results?.access_token,
    navigate,
    auth?.isNewUser,
    auth?.results,
    userType,
  ]);
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum"),
  });
  const onSubmit = (values) => {
    dispatch(loginApi(values));
  };

  return (
    <Box className={styles.leftBox}>
      <Box className={styles.content}>
        <Typography variant="h2">Login to contiune</Typography>
        {/* <Typography>SignIn! to contiune</Typography> */}
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
              {/* <Box className={styles.forget}>
                <Link to={routes.FORGET_PASSWORD}>Forgot Password?</Link>
              </Box> */}
              <Box className={"button-primary"}>
                <Button onClick={handleSubmit} disabled={auth?.isLoading}>
                  {auth?.isLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    "Sign In"
                  )}
                </Button>
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
  );
};

export default Welcome;
