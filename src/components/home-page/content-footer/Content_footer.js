import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./style.css";
import Instagram from "../../../assets/icons/instagram1.png";
import Monogram from "../../../assets/icons/facebook.png";
import Linkedin from "../../../assets/icons/linkedin1.png";
import Twitter from "../../../assets/icons/twitter1.png";
import { Link } from "react-router-dom";

const Content_footer = () => {
  return (
    <>
    <Box className="content_footer_backgroud">
    <Container>
      <Box marginY={2}>
      <Divider variant="horizontal" />
      </Box>
      {/* <hr style={{color:"black"}}/> */}
      <Box className="worecs_main_footer_box">
      <Grid container >
        <Grid item sm={12} md={3} className="worecs_main_box"  paddingTop={2}>
        <Box className="worecs_main_sub_box">
        <Box>
            <Typography variant="h4" className="worecs_main_heading">
              Worecs
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            {/* <Box paddingRight={2.5}></Box>
            <Box paddingRight={2.5}><img className="worecrs_main_heading_icons" src={Linkedin} alt="" /></Box>
            <Box paddingRight={2.5}><img className="worecrs_main_heading_icons" src={Monogram} alt="" /></Box>
            <Box><img className="worecrs_main_heading_icons" src={Twitter} alt="" /></Box> */}
          </Box>
        </Box>
        </Grid>
        <Grid item sm={12} md={9} marginBottom={1}>
          <Box >
          <Grid container spacing={2} className="footer_heading_main_box_data" paddingTop={2}>
            <Grid item md={2}>
              <Box>
                <Box>
                  <Typography variant="h5" className="footer_sub_heading">
                    PAGES
                  </Typography>
                </Box>
                <Box><Link className="footer_sub_heading_para1" to ="/">Home</Link> </Box>
                <Box><Link className="footer_sub_heading_para1" to ="/pricingtable">Pricing</Link> </Box>
                <Box><Link className="footer_sub_heading_para1" to ="/jobs/search">Jobs</Link> </Box>
                {/* <Box><Link className="footer_sub_heading_para1" to ="/dashboard/industry">Industry</Link> </Box> */}
                <Box><Link className="footer_sub_heading_para1" to ="/news">News</Link> </Box>
              </Box>
            </Grid>
            {/* <Grid item md={3}>
              <Box>
                <Box>
                  <Typography variant="h5" className="footer_sub_heading">
                    ABOUT ME
                  </Typography>
                </Box>
                <Box><Typography variant="body1" className="footer_sub_heading_para">About Me</Typography></Box>
                <Box><Typography variant="body1" className="footer_sub_heading_para">Projects</Typography></Box>
                <Box><Typography variant="body1" className="footer_sub_heading_para">Achievements</Typography></Box>
              </Box>
            </Grid> */}
            <Grid item md={5}>
            <Box>
                <Box>
                  <Typography variant="h5" className="footer_sub_heading">
                    GET IN TOUCH
                  </Typography>
                </Box>
                {/* <Box><Typography variant="body1" className="footer_sub_heading_para">+62-8XXX-XXX-XX</Typography></Box> */}
                <Box><a href="mailto:support@worecs.com.au" className="footer_sub_heading_para1">support@worecs.com.au</a> </Box>
              </Box>
            </Grid>
            <Grid item md={5}>
            <Box>
                <Box marginBottom={1}>
                  <Typography variant="h5" className="footer_sub_heading">
                    FOLLOW US
                  </Typography>
                </Box>
                <Box className="worecrs_main_heading_icons_box">
                {/* <Box><img className="worecrs_main_heading_icons" src={Instagram} alt="" /></Box> */}
                <Box><img className="worecrs_main_heading_icons" src={Linkedin} alt="" /></Box>
                <Box><img className="worecrs_main_heading_icons" src={Monogram} alt="" /></Box>
                {/* <Box><img className="worecrs_main_heading_icons" src={Twitter} alt="" /></Box> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
          </Box>
        </Grid>
      </Grid>
      </Box>
    </Container>
    <Grid container className="footer_main_data">
        <Grid item xs={12} className="footer_right">
          <Box>
            <Typography variant="body1" className="footer_main_data_name" align="center">
            © Copyrights  {new Date().getFullYear()} Worecs. All Rights Reserved. Powered by <a href="https://vrtechsol.com/" target="_blank">VRTECHSOL</a>.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>

    </>
  );
};

export default Content_footer;
