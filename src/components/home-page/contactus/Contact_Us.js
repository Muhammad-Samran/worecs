import { Button, Checkbox, Grid, InputBase, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Content_footer from "../content-footer/Content_footer";
import Navbar from "../navbar/Navbar";
import ContactBtn from "../../../assets/icons/contact_btn.png";
// import Checkbox from '@mui/material/Checkbox';
import "./style.css";

const Contact_Us = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2} marginTop={9}>
          <Grid item xs={12}>
            <Box className="contact_main_page_header">
              <Typography variant="h4" className="contact_main_page_header_h4">
                Schedule a demo
              </Typography>
              <Box marginTop={1}>
                <Typography variant="body1">
                  Have questions? We’re ready to help!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container className="con_main_box_center">
          <Box>
            <Grid item md={12}>
              <Box>
                <Box>
                  <Typography
                    variant="h6"
                    className="contact_main_page_header_h6"
                  >
                    Contact us
                  </Typography>
                </Box>
                <Box paddingY={2}>
                  <Typography
                    variant="body1"
                    className="contact_main_page_header_para"
                  >
                    {/* Need an experienced and skilled hand with custom IT projects? <br/> */}
                    We answer all queries within 24 hours.
                  </Typography>
                </Box>
              </Box>
              <Grid container>
                <Grid item sm={6}>
                  <Box>
                    <Box>
                      <Typography variant="body1">Name</Typography>
                      <InputBase
                        className="contact_form_base_field"
                        type="text"
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1">Company Name</Typography>
                      <InputBase
                        className="contact_form_base_field"
                        type="text"
                      />
                    </Box>
                    {/* <Box>
                  <Typography variant='body1'>
                  Postcode
                    </Typography>
                    <InputBase
                    className='contact_form_base_field'
                    type='text'
                    
                    />
                  </Box> */}
                    <Box>
                      <Typography variant="body1">Email Address</Typography>
                      <InputBase
                        className="contact_form_base_field"
                        type="email"
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {/* Let’s talk about your idea" */}
                      </Typography>
                      <Button className="attach_btn_input" variant="outlined" component="label">
                        Attach File
                        <input hidden accept="image/*" multiple type="file" />
                      </Button>
                      <Box>
                        <Typography
                          variant="body1"
                          className="attach_field_name"
                        >
                          File size of your documents should not exceed 10MB
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <Box>
                          <Checkbox
                            sx={{
                              color: "#00CFC5",
                              "&.Mui-checked": {
                                color: "#00CFC5",
                              },
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="body1"
                            className="attach_field_name_checkbox"
                          >
                            I have reviewed{" "}
                            <a
                              href=""
                              className="contact_form_general_heading_clr"
                            >
                              terms and conditions
                            </a>{" "}
                            and{" "}
                            <a
                              href=""
                              className="contact_form_general_heading_clr"
                            >
                              privacy policy
                            </a>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={6}>
                  <Box>
                    <Box>
                      <Typography variant="body1">
                        Nature of Business
                      </Typography>
                      <InputBase
                        className="contact_form_base_field"
                        type="text"
                      />
                    </Box>
                    <Box>
                      <Typography variant="body1">Contact No.</Typography>
                      <InputBase
                        className="contact_form_base_field"
                        type="text"
                      />
                    </Box>
                    {/* <Box>
                  <Typography variant='body1'>
                  Contact No.
                    </Typography>
                    <InputBase
                    className='contact_form_base_field'
                    type='text'
                    
                    />
                  </Box> */}
                  
                  </Box>
                </Grid>
                <Box
                        marginTop={2}
                        className="contact_form_base_field_btn_box"
                      >
                        <Button
                          className="contact_form_base_field_btn"
                          variant="contained"
                        >
                          Submit
                        </Button>
                      </Box>
              </Grid>
            </Grid>
          </Box>
          {/* <Grid item md={4}>
            <Box marginTop={6}>
              <Box>
                <Typography variant='h6' className='contact_form_general_heading'>
                General questions
                </Typography>
              </Box>
              <Box>
                <Box>
                  <Typography variant='body1' className='contact_form_general_para'>
                  For general queries, including questions about the platform, please email us at <br/><a href="mailto:support@worecs.com.au" className="contact_form_general_heading_clr">support@worecs.com.au</a>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body1' className='contact_form_general_para'>
                  To schedule a demo of Worecs, please email us at <a href="mailto:support@worecs.com.au" className="contact_form_general_heading_clr">support@worecs.com.au</a>
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box marginTop={4}>
                  <Typography variant='h6'>
                  Would you like to join our newsletter?
                  </Typography>
                </Box>
                <Box display="flex" marginTop={2}>
                  <Box>
                    <InputBase
                    className='contact_form_base_field_email'
                    type='text'
                    placeholder='Email'
                    />
                  </Box>
                  <Box>
                    <img className='contact_form_base_field_img' src={ContactBtn} alt="" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid> */}
        </Grid>
        <Grid container marginTop={2}>
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
      <Content_footer />
    </>
  );
};

export default Contact_Us;
