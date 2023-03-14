import React, { useEffect } from "react";
import Main from "../../components/forget-password/main";
import { Container, Grid, Box } from "@mui/material";

import ImageSection from "../../components/signup/ImagaSection";
import SEO from "../../components/meta-tags";
import { useDispatch } from "react-redux";
import { resetAuth } from "../../store/actions/authActions";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAuth());
  }, []);
  return (
    <>
      <SEO title={"Email Confirmation"} />
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Main />
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
            sx={{
              "@media screen and (max-width:1100px)": {
                display: "none",
              },
            }}
          >
            <ImageSection active={3} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgetPassword;
