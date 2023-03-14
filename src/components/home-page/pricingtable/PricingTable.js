import { Button, Container, Divider, Grid, InputBase, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Content_footer from '../content-footer/Content_footer'
import Navbar from '../navbar/Navbar'
import "./style.css"
import TrueIcon from "../../../assets/icons/trueicon.png";
import { useNavigate } from 'react-router-dom'
import pricing_img from "../../../assets/HomePageImages/pricing_img.png";

const PricingTable = () => {
    const navigate = useNavigate()
  return (
    <>
    <Navbar />
        <Container>
        <Box marginTop={14}>
            <Grid container>
                <Grid item xs={12}>
                    <Box className="pricing_main_box">
                    <Box marginBottom={2}>
                        <Typography variant='h4' className='pricing_main_box_h4heading'>
                        Plan Your Next Move
                        </Typography>
                    </Box>
                    <Box align="center">
                        <Typography variant='body1' className='pricing_main_box_paragraph'>
                        Have questions? We’re ready to help!
                        </Typography>
                    </Box>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={7} marginTop={5}>
                    <Box>
                        <Box>
                            <Typography className='pricing_heading_h5' variant='h4'>Pricing</Typography>
                        </Box>
                        <Box>
                            <Typography className='pricing_heading_h6' variant='h6'>Our custom calculator allows you to spend as per your requirements.</Typography>
                        </Box>
                        <Box>
                            <img className='pricing_img' src={pricing_img} alt="" />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box className="customsolution_box_header" marginY={5} >
                    <Box className="customsolution_box_main" >
                        <Box>
                            <Typography variant='h4' className='customsolution_h4_heading'>
                            Custom Solutions
                            </Typography>
                        </Box>
                        <Box marginBottom={2}>
                            <InputBase 
                            type='text'
                            placeholder='What You’ll Get'
                            />
                        </Box>
                        <Box marginBottom={3}>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                Automated Reference Checks
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                Custom Forms
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                Email and Text Alerts
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                Team Collaboration
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                License Checks
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                100 Points Identification
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                Candidate Forms Processing
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex">
                            <Box paddingRight={1}>
                                <img src={TrueIcon} alt="" />
                            </Box>
                            <Box>
                                <Typography variant='h5' className="pricingtable_liststyle">
                                Live Notifications
                                </Typography>
                            </Box>
                        </Box>
                        </Box>
                        <Divider />
                        <Box marginY={3}>
                            <Typography variant='h4' className='customsolution_h4_heading_info'>
                                For Further Information
                            </Typography>
                        </Box>
                        <Box className="customsolution_btn_box" >
                            <Box marginRight={2}>
                            <Button className='customsolution_btn_signin' variant='outlined' onClick={()=>navigate("/login")}>Sign In</Button>
                            </Box>
                            <Box>
                            <Button className='customsolution_btn' variant='contained' onClick={()=>navigate("/sign-up")}>Sign Up</Button>
                            </Box>
                        </Box>
                    </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </Container>
        <Content_footer />
    </>
  )
}

export default PricingTable