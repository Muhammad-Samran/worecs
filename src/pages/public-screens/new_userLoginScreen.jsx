import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Welcome from "../../components/login/newUser";
import ImageSection from "../../components/login/ImageSection";
import SEO from "../../components/meta-tags";
import { useSelector } from "react-redux";

const newUserLogin = () => {
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

export default newUserLogin;
