import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./style.css";
import CustomModel from "../model/index";
import ContactPopUp from "../contactpopup/ContactPopUp";


const SaveTime = () => {
  const [open, setOpen] = React.useState(false);
const [open2, setOpen2] = React.useState(false);
const handleOpen = (set) => set(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Grid container paddingY={3}>
            <Box className='blog_box' >
            {/* <img className="blog_box_img" src={MaskGroup} alt=""/> */}
                <Container>
                  <Box>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                      <Box className="content_five_save_heading_box">
                        
                      <Box marginBottom={1}>
                          <Typography variant="h4" className="content_five_save_heading">
                          Start Saving Time Now
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1" className="content_five_save_bodyheading" align="left">
                          And get back to what you do best.
                          </Typography>
                        </Box>
                      </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Box className="content_five_save_btn_box">
                          <Box>
                          <Button variant="outlined" className="content_five_save_btn" onClick={() => handleOpen(setOpen)}>Book a Demo</Button>
                          <CustomModel open={open} setOpen={setOpen}>
              <ContactPopUp setOpen2={setOpen2} setOpen={setOpen} />
            </CustomModel>
            <CustomModel open={open2} setOpen={setOpen2}>
              <ContactPopUp setOpen={setOpen2} />
            </CustomModel>
                          </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                {/* <Box >
                  <Grid container marginTop={4}>
                    <Grid item sx={6}>
                    <Box className="content_five_save_heading_box" align="right">
                      <Typography variant="h4" className="content_five_save_heading">
                        Start Saving Time Now
                      </Typography>
                    </Box>
                    <Box marginLeft={27}>
                      <Typography variant="body" className="content_five_save_bodyheading" align="right">
                      And get back to what you do best.
                      </Typography>
                    </Box>
                    
                    </Grid>
                    <Grid item xs={6} className="blog_box_cont" >
                    <Box >
                    <Box className="content_five_save_box">
                      <Button variant="outlined" className="content_five_save_btn">Book a Demo</Button>
                    </Box>
                    </Box>
                  </Grid>
                  </Grid>
                </Box> */}
                </Container>
            </Box>
        </Grid>
      <Container>
        {/* <Grid container spacing={3}>
          <Grid item md={4}>
            <Box main className="contentfive_box">
              <Box>
                <img
                  className="contentfive_img"
                  src={saverefrencing1img}
                  alt=""
                />
              </Box>
              <Box >
                <Button className="contentfive_blog_btn" size="small" variant="contained">BLOG | 27 SEP 2022</Button>
              </Box>
              <Box>
                <Typography variant="h6" className="contentfive_blog_heading">
                  Why certainty of identity is more important than ever before <br/>
                </Typography>
              </Box>
              <Box>
                <Typography variant="body" className="contentfive_blog_heading_para">
                As employers continue to embrace remote work, talent pools no longer have geographic boundaries. 
                </Typography>
              </Box>
              <Box >
                <a className="contentfive_readmore_btn" href="" >Read More </a>
              </Box>
            </Box>
          </Grid>
          
          <Grid item md={4}>
            <Box main className="contentfive_box">
              <Box>
                <img
                  className="contentfive_img"
                  src={saverefrencing2img}
                  alt=""
                />
              </Box>
              <Box>
              <Button className="contentfive_blog_btn" size="small" variant="contained">BLOG | 20 SEP 2022</Button>
              </Box>
              <Box>
                <Typography variant="h6" className="contentfive_blog_heading">
                  UK Right to Work checks are changing. Here’s what you need to
                  know
                </Typography>
              </Box>
              <Box>
                <Typography variant="body" className="contentfive_blog_heading_para">
                As employers continue to embrace remote work, talent pools no longer have geographic boundaries. 
                </Typography>
              </Box>
              <Box >
                <a className="contentfive_readmore_btn" href="" >Read More </a>
              </Box>
            </Box>
          </Grid>

          <Grid item md={4}>
            <Box main className="contentfive_box">
              <Box>
                <img
                  className="contentfive_img"
                  src={saverefrencing3img}
                  alt=""
                />
              </Box>
              <Box>
                <Button className="contentfive_blog_btn" size="small" variant="contained">BLOG | 22 NOV 2021</Button>
              </Box>
              <Box>
                <Typography variant="h6" className="contentfive_blog_heading">
                Three ways online reference checking can improve recruitment.
                </Typography>
              </Box>
              <Box>
                <Typography variant="body" className="contentfive_blog_heading_para">
                As employers continue to embrace remote work, talent pools no longer have geographic boundaries. 
                </Typography>
              </Box>
              <Box >
                <a className="contentfive_readmore_btn" href="" >Read More </a>
              </Box>
            </Box>
          </Grid>
          
        </Grid> */}
      </Container>
    </>
  );
};

export default SaveTime;
