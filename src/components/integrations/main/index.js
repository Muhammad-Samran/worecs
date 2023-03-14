import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import styles from "./styles.module.scss";
// import Integrationlogo from "/src/assets/Integration/Group 3.svg" 
import Firebase from "../../../assets/Integration/firebase.svg";
import Google from "../../../assets/Integration/google.svg";
import Zoom from "../../../assets/Integration/zoom.svg";
import Facebook from "../../../assets/Integration/facebook.svg";
import BULLHorn from "../../../assets/Integration/BULLHorn.svg";
import CV from "../../../assets/Integration/CVCHECK.svg";
import JOBADDER1 from "../../../assets/Integration/JOBADDER1.svg";
import Stripe from "../../../assets/Integration/Stripe.svg";
// import Firebase from "../../../assets/Integration/Group_3.svg";

const Industry = () => {
  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Integrations</Typography>
        <Box className={styles.gridSystem}>
          <Grid container spacing={2}>
            <React.Fragment>
              <Grid item md={6} xs={12} lg={4}>
                <Box className={styles.boxName}>
                  <Box className={styles.imageBox}>
                    <img
                      src={Google}
                      alt={""}
                    />
                  </Box>
                  {/* <Typography variant="h4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography> */}
                </Box>
              </Grid>
              <Grid item md={6} xs={12} lg={4}>
                <Box className={styles.boxName}>
                  <Box className={styles.imageBox}>
                    <img
                      src={Zoom}
                      alt={""}
                    />
                  </Box>
                  {/* <Typography variant="h4" >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography> */}
                </Box>
              </Grid>
              <Grid item md={6} xs={12} lg={4}>
                <Box className={styles.boxName}>
                  <Box className={styles.imageBox}>
                    <img
                      src={BULLHorn}
                      alt={""}
                    />
                  </Box>
                  {/* <Typography variant="h4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography> */}
                </Box>
              </Grid>
              <Grid item md={6} xs={12} lg={4}>
                <Box className={styles.boxName}>
                  <Box className={styles.imageBox}>
                    <img
                      src={CV}
                      alt={""}
                    />
                  </Box>
                  {/* <Typography variant="h4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography> */}
                </Box>
              </Grid>
              <Grid item md={6} xs={12} lg={4}>
                <Box className={styles.boxName}>
                  <Box className={styles.imageBox}>
                    <img
                      src={Stripe}
                      alt={""}
                    />
                  </Box>
                  {/* <Typography variant="h4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography> */}
                </Box>
              </Grid>
              <Grid item md={6} xs={12} lg={4}>
                <Box className={styles.boxName}>
                  <Box className={styles.imageBox}>
                    <img
                      src={JOBADDER1}
                      alt={""}
                    />
                  </Box>
                  {/* <Typography variant="h4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                  </Typography> */}
                </Box>
              </Grid>
              
            </React.Fragment>
          </Grid>
        </Box>
        <></>
      </Box>
    </>
  );
};

export default Industry;
