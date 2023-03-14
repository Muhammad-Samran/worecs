import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Welcome from "../../components/login/Welcome";
import ImageSection from "../../components/login/ImageSection";
import SEO from "../../components/meta-tags";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { routes } from "../../routes";
import { resetCompany } from "../../store/actions/companyActions";
import { resetModel } from "../../store/actions/industryActions";

const Login = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("User");
    localStorage.removeItem("section-no");
    localStorage.removeItem("invite-person");
  }, []);
  const auth = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token")) || "";
  const userType = JSON.parse(localStorage.getItem("user")) || "";

  useEffect(() => {}, [token, userType]);
  useEffect(() => {
    dispatch(resetCompany);
    dispatch(resetModel);
    dispatch(resetCompany);
  }, []);

  if (token && userType) {
    return (
      <Navigate
        to={
          userType && userType !== "recruitment"
            ? routes.CANDIDATE_DASHBOARD
            : routes.DASHBOARD
        }
        replace
      />
    );
  }
  return (
    <>
      <SEO title="Login Page" />
      <Box
        sx={{
          "@media screen and (max-width:992px)": {
            padding: "20px",
          },
        }}
      >
        <Grid container>
          <Grid item lg={6} xs={12}>
            <Welcome />
          </Grid>
          <Grid item lg={6} xs={12}>
            <ImageSection />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
