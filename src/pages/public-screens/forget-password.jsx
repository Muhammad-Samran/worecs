import React from "react";
import Main from "../../components/forget-password/resent-verification/index";
import { Container, Grid, Box } from "@mui/material";

import ImageSection from "../../components/signup/ImagaSection";
import SEO from "../../components/meta-tags";

const ForgetPassword = () => {
  return (
    <>
      <SEO title={"Forget Password"} />
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
