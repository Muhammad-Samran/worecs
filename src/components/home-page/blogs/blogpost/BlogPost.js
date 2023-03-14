import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Content_footer from "../../content-footer/Content_footer";
import "./style.css"
import Navbar from "../../navbar/Navbar";
import data from "./Postdata.js"

const BlogPost = () => {
  const location = useLocation()
  const id = location?.state?.id

  // console.log("!!!!!!!!!!!!!!!",id)
    
  return (
    <>
      {/* <Navbar />
      <Container>
      {data?.map((item,index)=>(
        item?.id == id && 
        <>
       {item?.id}
        {item?.title}
        {item?.blogtitledata1}
    
        </>
      ))}
        </Container> */}
        <Navbar />
        <Container>
        {data?.map((item,index)=>(
        item?.id == id &&
        <>
        <Box marginTop={12} className="blog_post_main_box">
        <Grid container className="blog_post_main_sub_box" >
          <Grid item md={6}>
            <Box className="blog_post_1st_box">
            <Box>
               <Typography variant="h4" className="blog_post_heading_h4">
                {item?.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" className="blog_post_heading_para">
                {item?.blogtitledata1}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box>
            <img className="blog_post_main_img" src={item?.image} />
            </Box>
          </Grid>
        </Grid>
        </Box>
            <Grid container className="blog_post_main_box">
            <Box className="blog_post_main_sub_box">
            <Grid item sx={12}>
              <Box>
                <Typography variant="h4" className="blog_post_heading_h4">
                  {item?.blogtitle2}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" className="blog_post_heading_para">
                {item?.blogtitledata1}
                </Typography>
              </Box>
              <Box marginTop={1.5}>
                <Typography variant="h4" className="blog_post_heading_h4">
                  {item?.blogtitle3}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" className="blog_post_heading_para">
                {item?.blogtitledata3}
                </Typography>
              </Box>
              
            </Grid>
            </Box>
          </Grid>
          </>
          ))}
        </Container>

      <Content_footer />
    </>
  );
};

export default BlogPost;
