import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import styles from "./styles.module.scss";

import { Link, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../common/TextInput";
import { routes } from "../../../routes";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";
import { loginApi, LoginUser } from "../../../store/actions/authActions";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Welcome = () => {
  const { userNewId } = useParams();
  const auth = useSelector((state) => state.auth);
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newuser, setUser] = useState(
    JSON.parse(localStorage.getItem("invite-person")) || {}
  );

  useEffect(() => {
    const acceptUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/new-user/request/accept/${userNewId}`
        );

        const result = await response.data;

        if (result.success) {
          if (result?.results?.invitation_type === "exist_candidate") {
            return navigate(routes?.LOGIN);
          }
          if (result?.results?.response === "completed") {
            return navigate(routes?.LOGIN);
          }
          console.log(result);

          localStorage.setItem(
            "invite-person",
            JSON.stringify(result?.results)
          );

          setUser({
            email: result?.results?.email,
            token: result?.results?.token,
          });
        }
      } catch (e) {
        dispatch(ShowAlert("Something went wrong", "error"));
      }
    };
    acceptUser();
  }, [userNewId]);

  const initialValues = {
    email: newuser.email,
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const SignupSchema = Yup.object().shape({
    // email: Yup.string().email("Invalid email").required("Required"),
    current_password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum"),
    new_password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 6 chars minimum"),
    confirm_password: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });
  const onSubmit = async (values) => {
    isLoading(true);
    try {
      const data = JSON.stringify({ ...values, email: newuser?.email });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/new-user/change-password/${newuser?.token}`,
        data,
        config
      );
      const results = await request.data;

      if (results?.success === true) {
        dispatch(ShowAlert("New password created", "success"));
        isLoading(false);
        navigate(routes.LOGIN);
      } else {
        if (typeof results?.message === "object") {
          Object.entries(results?.message)?.map(([key, value], i) =>
            dispatch(ShowAlert(value, "error"))
          );
          isLoading(false);
        } else {
          dispatch(ShowAlert(results?.message, "error"));
          // console.log();
          isLoading(false);
        }
      }
    } catch (e) {
      // console.log("Error");
      dispatch(ShowAlert("Something went wrong", "error"));
      isLoading(false);
    }
  };

  // const Alert = () => {
  //   dispatch(ShowAlert("Login Success", "success"));
  //   // dispatch(
  //   //   loginApi({
  //   //     email: "zainawan99@gmail.com",
  //   //     password: "admin123***",
  //   //   })
  //   // );

  //   dispatch(LoginUser(false));
  //   if (auth?.candidatLogin) {
  //     navigate(routes.CANDIDATE_DASHBOARD);
  //   } else {
  //     navigate(routes.PROFILE);
  //   }
  // };

  return (
    <Box className={styles.leftBox}>
      <Box className={styles.content}>
        <Typography variant="h2">
          Welcome to <span> Worecs! </span>
        </Typography>
        {/* <Typography variant="h3">
          Log In to Worecs to join the largest job portal and gain valuable
          inormation on the palm of your hand
        </Typography> */}

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
                  value={newuser?.email || ""}
                  disabled
                />
                {/* <span>{errors.email && touched.email && errors.email}</span> */}
              </Box>
              <Box className={styles.parentInput}>
                <TextInput
                  label="Current Password"
                  type="password"
                  name="current_password"
                  placeholder="Enter verified password here. "
                  onChange={handleChange}
                  value={values.current_password}
                />
                <span>
                  {errors.current_password &&
                    touched.current_password &&
                    errors.current_password}
                </span>
              </Box>
              <Box className={styles.parentInput}>
                <TextInput
                  label="New Password"
                  type="password"
                  name="new_password"
                  placeholder="Enter verified password here. "
                  onChange={handleChange}
                  value={values.new_password}
                />
                <span>
                  {errors.new_password &&
                    touched.new_password &&
                    errors.new_password}
                </span>
              </Box>

              <Box className={styles.parentInput}>
                <TextInput
                  label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  placeholder="Enter verified password here. "
                  onChange={handleChange}
                  value={values.confirm_password}
                />
                <span>
                  {errors.confirm_password &&
                    touched.confirm_password &&
                    errors.confirm_password}
                </span>
              </Box>

              <Box className={"button-primary"}>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Welcome;
