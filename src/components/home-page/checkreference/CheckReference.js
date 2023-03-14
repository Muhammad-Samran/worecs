import { Box, Button, Grid, InputBase, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
// import { BsBoxArrowRight } from "react-icons/fa";
import { BsBoxArrowInRight, BsBoxArrowRight, BsList } from "react-icons/bs";
import React from 'react'
import "./style.css"
import template from "../../../assets/icons/home_template.png";
import request from "../../../assets/icons/home_request.png";
import customise from "../../../assets/icons/home_customise.png";
import contact from "../../../assets/icons/home_contact.png";
import reference from "../../../assets/icons/home_reference.png";
import confidence from "../../../assets/icons/home_confidence.png";
import template1 from "../../../assets/icons/home_template1.png";
import request1 from "../../../assets/icons/home_request1.png";
import customise1 from "../../../assets/icons/home_customise1.png";
import contact1 from "../../../assets/icons/home_contact1.png";
import reference1 from "../../../assets/icons/home_reference1.png";
import confidence1 from "../../../assets/icons/home_confidence1.png";
const CheckReference = () => {
  return (
    <>
        <Container >
        <Grid container marginY={5}>
            <Grid item xs={12}>
                <Box>
                <Typography variant='h4' className='level_heading_h4' >
                        Our Work Flow</Typography>
                    {/* <Typography variant='h4' className='level_heading_h4'><b className='level_heading_bold'>Our</b> Work Flow </Typography> */}
                </Box>
            </Grid>
        </Grid>
        <Grid container spacing={3} marginTop={1} marginBottom={3}>
            <Grid item sm={6} md={4}>
            <Box main className='contentfour_box'>
                <Box>
                    {/* < BsBoxArrowRight className='icons_colorss' /> */}
                    <img className='content_four_img' src={template} alt='' />
                </Box>
                <Box paddingBottom={2}>
                <Typography variant='h6' className='contentfour_box_h6_heading'>
                    Set up your business workflow templates (we do this for you).
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='contentfour_box_para_heading'>
                    Our secure system can be accessed by your candidate to enter their reference details.
                    </Typography>
                </Box>
            </Box>
            </Grid>
            {/* ------ */}
            <Grid item sm={6} md={4}>
            <Box main className='contentfour_box'>
                <Box>
                {/* < BsList className='icons_colorss' /> */}
                    <img className='content_four_img' src={request} alt='' />
                    {/* <img className='content_four_img1' src={request1} alt='' /> */}
                </Box>
                <Box paddingBottom={2}>
                <Typography variant='h6' className='contentfour_box_h6_heading'>
                Submit your request
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='contentfour_box_para_heading'>
                    On the train, bus or at the café, it only takes 23 seconds to request a reliable reference check
                    </Typography>
                </Box>
            </Box>
            </Grid>
            {/* ------ */}
            <Grid item sm={6} md={4}>
            <Box main className='contentfour_box'>
                <Box>
                    <img className='content_four_img' src={customise} alt='' />
                </Box>
                <Box paddingBottom={2}>
                <Typography variant='h6' className='contentfour_box_h6_heading'>
                Customise your questions
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='contentfour_box_para_heading'>
                    Our system allows you to customise and send your questionnaire best suited for your candidate and their role.                    </Typography>
                </Box>
            </Box>
            </Grid>
            {/* ------ */}
            <Grid item sm={6} md={4}>
            <Box main className='contentfour_box'>
                <Box>
                    <img  className='content_four_img' src={contact} alt='' />
                </Box>
                <Box paddingBottom={2}>
                <Typography variant='h6' className='contentfour_box_h6_heading'>
                We make contact
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='contentfour_box_para_heading'>
                    Our automated system makes three points of contact with your references in 72 hours
                    </Typography>
                </Box>
            </Box>
            </Grid>
            {/* ------ */}
            <Grid item sm={6} md={4}>
            <Box main className='contentfour_box'>
                <Box>
                    <img className='content_four_img' src={reference} alt='' />
                </Box>
                <Box paddingBottom={2}>
                <Typography variant='h6' className='contentfour_box_h6_heading'>
                Reference responds
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='contentfour_box_para_heading'>
                    You automated workflow is set up and you can implement your automated business workflow into your business
                    </Typography>
                </Box>
            </Box>
            </Grid>
            {/* ------ */}
            <Grid item sm={6} md={4}>
            <Box main className='contentfour_box'>
                <Box>
                    <img className='content_four_img' src={confidence} alt='' />
                 </Box>
                 <Box className='hover_img'>
                 <img className='content_four_img_hover' src={reference} alt='' />
                 </Box>
                <Box paddingBottom={2}>
                <Typography variant='h6' className='contentfour_box_h6_heading'>
                Hire with confidence
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='contentfour_box_para_heading'>
                    Your checks are done, and you can choose the best candidate for the job
                    </Typography>
                </Box>
            </Box>
            </Grid>
            {/* ------ */}
        </Grid>
        </Container>
        
    </>
  )
}

export default CheckReference