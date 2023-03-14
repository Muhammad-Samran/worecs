import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import  data from "../blogs/blogpost/Postdata"
import "./style.css";

const ResourceLearn = () => {
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Grid container paddingY={4}>
          <Grid item xs={12} className="contentseven_maingrid">
            <Box main className="contentseven_mainbox">
              <Box paddingBottom={1}>
                <Typography variant="h4" className="resource_heading_h4" align="center">
                Resource & Learning Center
                </Typography>
              </Box>
              <Box>
                <Typography variant="body" className="resource_learn_heading_para" align="center">
                  Our thoughts on recruitment and its future
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
        {data.map((item,i)=>(
          <Grid key={i} item sm={6} md={4}>
            <Box main className="contentseven_maincard">
              <Box className="contentseven_imgbox">
                <img className="contentseven_cardimg"
                  src={item.image}
                  alt=""
                />
                <Box className="contentseven_cardbox">
                <Button size="small" className="contentseven_cardbtn" variant="contained">Recruitment</Button>
              </Box>
              </Box>
              
              <Box paddingX={2}>
              <Box paddingTop={3}>
                <Typography variant="h6" className="resource_learn_heading_h6">
                {item.title}
                </Typography>
              </Box>
              <Box paddingTop={3}>
                <Typography variant="body" className="resource_learn_heading_para">
                {item.blogtitledata1}
                </Typography>
              </Box>
              <Box paddingTop={6} className="contentseven_cardbtn2_box">
                <Box display="flex">
                  <Box>
                  <Button className="contentseven_cardbtn2" endIcon={<BsArrowRight className="contentseven_cardbtn2_icons" />} onClick={() => {navigate('/blogspost',{state:{id:item.id}})}}>Read More</Button>
                  </Box>
                  {/* <Box marginTop={0.5}>
                    <BsArrowRight className="contentseven_cardbtn2_icons" />
                  </Box> */}
                </Box>
                {/* <Button variant="outlined" className="contentseven_cardbtn2">Read More</Button> */}
              </Box>
              </Box>
            </Box>
          </Grid>
          ))}
          
        </Grid>
        <Box paddingTop={10}  className="learn_article_btn_box" >
              {/* <Button variant="contained" className="learn_article_btn">
                More Articles
              </Button> */}
            </Box>
      </Container>
    </>
  );
};

export default ResourceLearn;
