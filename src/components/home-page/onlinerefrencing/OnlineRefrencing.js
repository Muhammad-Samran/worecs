import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import "./style.css";
import refrencing1img from "../../../assets/HomePageImages/refrencing1.png";
import refrencing2img from "../../../assets/HomePageImages/refrencing2.png";
import refrencing3img from "../../../assets/HomePageImages/refrencing3.png";


const OnlineRefrencing = () => {
  return (
    <>
        <Container>
            <Grid container paddingTop={4}>
            <Grid item md={12} className='icon_thre_heading' align="center">
                <Box >
                <Box>
                    <Typography variant='h4' className='refrencing_heading' marginBottom={2}>
                        Online Referencing Made Easy
                    </Typography>
                </Box>
                <Box>
                    <Typography align='center' variant='p' className='refrencing_heading_paragraph'>
                    Worecs will end your mundane data entry and downtime due <br/> to automated reference checking. No more writing and following up emails
                    </Typography>
                </Box>
                </Box>
            </Grid>

            <Grid container spacing={2}>
            <Grid item md={4} sm={6}>
                <Box className="online_refrencing_cards">
                <Box>
                    <img className='card_one' src={refrencing1img} alt="" />
                </Box>
              <Box paddingY={2} className="content_three_para_box">
              <Box>
                    <Typography variant='h6' className='content_three_para_heading'>
                    1. Enter Candidate Information
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='refrencing_heading_paragraph'>
                    Here you will add your candidates and we'll gather everything else for you.
                    </Typography>
                </Box>
              </Box>
              </Box>
            </Grid>
            {/* ------ */}
            {/* <Grid item md={4}>
                <Box className="online_refrencing_cards">
                <Box>
                    <img className='card_one' src={refrencing1img} alt="" />
                </Box>
              <Box paddingY={2} className="content_three_para_box">
              <Box>
                    <Typography variant='h6' className='content_three_para_heading'>
                    1. Enter Candidate Information
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='p' className='content_three_para_paragraph'>
                    Here you will add your candidates and we'll gather everything else for you.
                    </Typography>
                </Box>
              </Box>
              </Box>
            </Grid>
            ----- */}
            <Grid item md={4} sm={6}>
                <Box className="online_refrencing_cards">
                <Box>
                    <img className='card_one' src={refrencing2img} alt="" />
                </Box>
              <Box paddingY={2} className="content_three_para_box">
              <Box>
                    <Typography variant='h6' className='content_three_para_heading'>
                    2. Select forms to send to reference
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='body' className='refrencing_heading_paragraph' align='center'>
                    Once we have the references from the candidates, you can send a default questionnaire or create your own.
                    </Typography>
                </Box>
              </Box>
              </Box>
            </Grid>
            {/* ------ */}
            <Grid item md={4} sm={6}>
                <Box className="online_refrencing_cards">
                <Box>
                    <img className='card_one' src={refrencing3img} alt="" />
                </Box>
                <Box paddingY={2} className="content_three_para_box">
                <Box>
                    <Typography variant='h6' className='content_three_para_heading'>
                    3. Literally do anything else
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='p' className='refrencing_heading_paragraph' align='center'>
                    At this point, we're taking over the rest of the process. So you can get back to what you do best
                    </Typography>
                </Box>
                </Box>
                </Box>
            </Grid>
            </Grid>
        </Grid>
        </Container>
    </>
  )
}

export default OnlineRefrencing