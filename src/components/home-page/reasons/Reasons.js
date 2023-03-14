import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./style.css";
import profile from "../../../assets/icons/home_profile.png";
import message from "../../../assets/icons/home_msg.png";
import fast from "../../../assets/icons/home_fast.png";
import reasonImg from "../../../assets/HomePageImages/reasons.png";

const Reasons = () => {
  return (
    <>
      <Container>
        <Grid container paddingY={4}>
          <Grid item xs={12}>
            <Box className="reason_heading">
              <Box>
                <Typography
                  variant="h4"
                  className="reason_heading_h4"
                  align="center"
                >
                  We Are Better </Typography>
              </Box>
              <Box paddingTop={1}>
                <Typography
                  variant="body"
                  className="reason_heading_para"
                  align="center"
                >
                  Automated reference checking service for professionals, by
                  professionals
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item md={6}>
            <Box>
              <img className="content_two_img" src={reasonImg} alt="" />
            </Box>
          </Grid>
          <Grid item md={6} className="main_box_grid">
            <Box main className="main_box">
              <Box className="box_heading">
                <Typography variant="h4" className="box_heading_header">
                  Reduce admin cost
                </Typography>
              </Box>
              <Box>
                <Typography variant="body" className="reason_heading_para">
                  Worecs is integrated with automations reducing admin cost by
                  giving more control to owner for performing their
                  recruitment tasks.
                </Typography>
              </Box>
              <Box>
                <Box className="image_box">
                  <img className="pro_img" src={profile} alt="" />
                </Box>
              </Box>
            </Box>
            {/* ----- */}
            <Box main className="main_box">
              <Box className="box_heading">
                <Typography variant="h6" className="box_heading_header">
                  Get the answers you need
                </Typography>
              </Box>
              <Box>
                <Typography variant="body" className="reason_heading_para">
                  Worecs enables automated reference checks, files sharing,
                  electronic signatures, letter of offers and applications.
                </Typography>
              </Box>
              <Box>
                <Box className="image_box">
                  <img className="pro_img" src={message} alt="" />
                </Box>
              </Box>
            </Box>
            {/* ------ */}
            <Box main className="main_box">
              <Box className="box_heading">
                <Typography variant="h6" className="box_heading_header">
                  Fast turnaround
                </Typography>
              </Box>
              <Box>
                <Typography variant="body" className="reason_heading_para">
                Real time forms submission and receiving. Background license and certification checks and much more.
                </Typography>
              </Box>
              <Box>
                <Box className="image_box">
                  <img className="pro_img" src={fast} alt="" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Reasons;
