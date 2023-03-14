import { Box, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { SignupUser } from "../../../store/actions/authActions";

import styles from "./style.module.scss";

const Section3 = ({ data, setData }) => {
  const auth = useSelector((state) => state?.auth);
  const [show, isShow] = useState(false);
  const dispatch = useDispatch();
  const [erros, setErrors] = useState(false);
  const navigate = useNavigate();
  const onChange = (e) => {
    if (e?.target.checked) {
      setData({ ...data, [e.target.name]: e.target.checked });
      setErrors(false);
    } else {
      delete data[e?.target.name];
      setErrors(true);
    }
  };

  const submitData = async () => {
    if (!data.terms) {
      return setErrors(true);
    }
    setErrors(false);
    dispatch(SignupUser({ ...data })).then(() => {
      isShow(true);
    });
  };

  useEffect(() => {
    if (show && auth?.newSignup?.results?.token) {
      return navigate(
        `${routes.verify_token}/${auth?.newSignup?.results?.token}`,
        {
          state: {
            email: data?.email,
          },
        }
      );
    }
  }, [show, auth?.newSignup?.results?.token, navigate]);
  return (
    <Box className={styles.innerContent}>
      <>
        <Typography variant="h3">
          Registration Successfully Completed
        </Typography>
        <Typography>
          Click Sign Up, then check your email for the confirmation link.
        </Typography>
        <Box sx={{ marginTop: "16px;" }}>
          <Box className={styles.customCheckBox}>
            <label className="labelContainer">
              I have read and agree to the{" "}
              <span className="text-primary">Privacy Policy</span> &{" "}
              <span className="text-primary">Terms of Service</span>
              <input type="checkbox" name="terms" onChange={onChange} />
              <span className="checkmark"></span>
            </label>
            {/* <Box
              className={`${styles.circle} ${circle ? styles.active : ""}`}
            ></Box>
            <Box className={styles.text}>
              I have read and agree to the{" "}
              <span className="text-primary">Privacy Policy</span> &{" "}
              <span className="text-primary">Terms of Service</span>
            </Box> */}
          </Box>
          {erros && (
            <span className="error-class">
              Please Accept the Terms And Conditions
            </span>
          )}
        </Box>

        <Box className={"button-primary"}>
          <Button onClick={submitData} disabled={auth?.isLoading}>
            {auth?.isLoading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Sign Up"
            )}
          </Button>
        </Box>
      </>
    </Box>
  );
};

export default Section3;
