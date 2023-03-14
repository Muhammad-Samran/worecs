import * as React from "react";

import { Grid, Box } from "@mui/material";

import Main from "../../components/signup/main";
import ImageSection from "../../components/signup/ImagaSection";
import SEO from "../../components/meta-tags";

export default function HorizontalLabelPositionBelowStepper() {
  const [active, setActive] = React.useState(0);

  return (
    <>
      <SEO title="SignUp page" />
      <Box
        sx={{
          "@media screen and (max-width:992px)": {
            padding: "20px",
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <Main active={active} setActive={setActive} />
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
            sx={{
              "@media screen and (max-width:1200px)": {
                display: "none",
              },
            }}
          >
            <ImageSection active={active} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
