import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import "./style.css";
import Blog_card_1 from "../../../assets/Blogs-images/blog-card-1.png";
import Blog1 from "../../../assets/HomePageImages/blogs-images/blog_1.png";
import Blog2 from "../../../assets/HomePageImages/blogs-images/blog_2.png";
import Blog3 from "../../../assets/HomePageImages/blogs-images/blog_3.png";
import Blog4 from "../../../assets/HomePageImages/blogs-images/blog_4.jpg";
import Blog5 from "../../../assets/HomePageImages/blogs-images/blog_5.png";
import Line from "../../../assets/icons/line.png";
import Linearrow from "../../../assets/icons/linearrow.png";
import Content_footer from "../content-footer/Content_footer";
import { BsArrowRight} from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import data from "./blogpost/Postdata"
const Blog = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Container>     
       <Grid container marginTop={14} marginBottom={2}>
          <Grid item xs={12} className="contentseven_maingrid">
            <Box className="contentseven_mainbox_headingg">
            <Box main className="contentseven_mainbox">
              <Box paddingBottom={1}>
                <Typography variant="h4" className="resource_heading_h4" align="center">
                  Resource & learning center
                </Typography>
              </Box>
              <Box align="center">
                <Typography
                  variant="body"
                  className="resource_learn_heading_para"
                  align="center"
                >
                  Automated reference checking service for professionals, by
                  professionals
                </Typography>
              </Box>
            </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} marginBottom={4}>
          <Grid item xs={12}>
            <Box main className="blogs_card_first">
              <Box display="flex">
                <Box>
                  <Typography
                    className="blogs_card_first_name_btn"
                    variant="h6"
                  >
                    Latest News
                  </Typography>
                </Box>
                <Box paddingLeft={1}>
                  <img src={Line} alt="" />
                </Box>
              </Box>
              <Box display="flex">
                <Box>
                  <Typography
                    className="blogs_card_first_name_btn"
                    variant="h6"
                  >
                    Next
                  </Typography>
                </Box>
                <Box paddingLeft={1}>
                  <img src={Linearrow} alt="" />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} marginBottom={6}>
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
              <Box paddingTop={3}>
              <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Dasteen"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Jan 10, 2022     ∙     3 min read
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
              </Box>
              <Box paddingTop={2} className="contentseven_cardbtn2_box">
                <Box display="flex">
                  <Box>
                    {/* <Link to = "/blogspost">Read More</Link> */}
                    <Button className="contentseven_cardbtn2" endIcon={<BsArrowRight className="contentseven_cardbtn2_icons" />} onClick={() => {navigate('/blogspost',{state:{id:item.id}})}}>Read More</Button>
                    {/* <a className="contentseven_cardbtn2" href="" >Read More</a> */}
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
       

        
      </Container>
      <Content_footer />
    </>
  );
};

export default Blog;
