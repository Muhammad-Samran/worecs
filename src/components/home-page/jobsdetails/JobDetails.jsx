import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import Navbar from "../navbar/Navbar";
import style from "./style.module.scss";
import Content_footer from "../content-footer/Content_footer";
import JOBS from "../../../assets/icons/jobsposticon.svg";
import phone from "../../../assets/icons/job_location.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getHomeJobs,
  getSingleJob,
} from "../../../store/actions/homeJobActions";
import { useLocation } from "react-router-dom";
import ModeCustom from "./model/index";
import LoginModel from "./login/index";
import ApplyModel from "./confirmBox/index";
import { ShowAlert } from "../../../store/actions/alertActions";
import SEO from "../../meta-tags";

const JobDetails = () => {
  const location = useLocation();
  const id = location?.state?.id;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  // console.log(location);
  const dispatch = useDispatch();
  const homeJobs = useSelector((state) => state?.hjob);
  const auth = useSelector((state) => state?.auth);
  const reqJobs = useSelector((state) => state?.rjobs);
  useEffect(() => {
    dispatch(getSingleJob(location?.state?.slug));
  }, []);
  const [showMore, setShowMore] = useState({
    cata: false,
    exp: false,
    salary: false,
    type: false,
  });
  // console.log(homeJobs)
  const handleSubmit = () => {
    if (auth?.results?.access_token) {
      if (homeJobs?.singleJob?.results?.user_apply === 1) {
        return dispatch(ShowAlert("User already applied", "error"));
      }
      setOpen2(true);
      return;
    }
    setOpen(true);
  };
  return (
    <>
      <SEO title="Job Detail"></SEO>
      <ApplyModel open={open2} setOpen={setOpen2} />
      <ModeCustom open={open} setOpen={setOpen}>
        <LoginModel open={open} setOpen={setOpen} />
      </ModeCustom>
      <Navbar />
      <Container>
        <Box className={style.parent}>
          <Grid container>
            <Grid item xs={12}>
              <Box className={style.main_heading}>
                <Typography variant="h4">
                  Find The Best Way For Yourself
                </Typography>
                <Typography variant="h6">
                  Automated reference checking service for professionals, by
                  professionals
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box className={style.job_box_main}>
            <Grid container className={style.job_box}>
              <Grid item xs={12} sm={3}>
                <Box className={style.job_box_img}>
                  <img
                    src={`${process.env.REACT_APP_URL}${homeJobs?.singleJob?.results?.logo}`}
                    alt=""
                  />
                </Box>
              </Grid>
              <Grid item sm={9} className={style.job_box_right}>
                <Box>
                  <Grid container>
                    <Grid item xs={12} className={style.job_box_right_head}>
                      <Box>
                        <Typography variant="h6">
                          {homeJobs?.singleJob?.results?.company_name}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container className={style.job_box_heading}>
                    <Grid item xs={12} sm={6}>
                      <Box className={style.job_box_left}>
                        <Typography variant="h5">
                          {homeJobs?.singleJob?.results?.job_title}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box className={style.job_box_heading_right}>
                        <Typography variant="h5">
                          $5000<span>/</span>Monthly
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container className={style.job_btn_box}>
                    <Grid item xs={12} sm={6}>
                      <Grid container className={style.job_btn_box_heading}>
                        <Grid item xs={12} sm={6}>
                          <Box
                            main
                            sx={{ display: "flex" }}
                            className={style.job_btn_box_heading}
                          >
                            <Box paddingRight={1}>
                              <img src={location} alt="" />
                            </Box>
                            <Box>
                              <Typography variant="h6">Sydney, AU</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item sm={12} md={6}>
                          <Box
                            main
                            sx={{ display: "flex" }}
                            className={style.job_btn_box_heading_left}
                          >
                            <Box paddingRight={1}>
                              <img src={phone} alt="" />
                            </Box>
                            <Box>
                              <Typography variant="h6">
                                +88 456 796 457
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <Box className={style.job_btn}>
                        {auth?.results?.type !== "recruitment" && (
                          <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={
                              homeJobs?.singleJob?.results?.user_apply === 1
                            }
                          >
                            {homeJobs?.singleJob?.results?.user_apply === 1
                              ? "Applied"
                              : "Apply Now"}
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container spacing={4}>
              <Grid item sm={8}>
                <Box className={style.jobs_details_left_box}>
                  <Box marginTop={3}>
                    <Typography variant="h5">Description</Typography>
                  </Box>
                  <Box>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: homeJobs?.singleJob?.results?.job_description,
                      }}
                    >
                      {/* It is a long established fact that a reader will be
                      distracted the readable content of page when looking atits
                      layout. The point of using is that has more-or-less normal
                      a distribution of letters, as opposed to usin content
                      publishing packages web page editors. It is a long
                      established fact that a reader will be distracts by the
                      readable content of a page when looking at its layout. The
                      point of using Lorem Ipsum is that has look like readable
                      publishing packages and web page editors.
                      <br />
                      <br />
                      It is a long established fact that a reader will be
                      distracted the readable content of a page when looking
                      atits layout. The point of using is that has more-or-less
                      normal a distribution of letters, as opposed to usin
                      content publishing packages web page editors. */}
                    </p>
                  </Box>
                  <Box marginY={2}>
                    <Box>
                      <Typography variant="h5">Responsibilities</Typography>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>
                          Developing custom themes (WordPress.org & ThemeForest
                          Standards)
                        </p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Creating reactive website designs</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Working under strict deadlines</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Develop page speed optimized themes</p>
                      </Box>
                    </Box>
                  </Box>

                  <Box marginY={2}>
                    <Box>
                      <Typography variant="h5">Responsibilities</Typography>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>
                          Having approved theme/s on ThemeForest will be given
                          high preference.
                        </p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Strong knowledge of WordPress Theme Standards</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>
                          Ability to convert HTML templates into fully
                          functional WordPress themes.
                        </p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>
                          Good knowledge in O OP PHP and front-end stuffs like
                          HTML, CSS, JS, jQuery, etc.
                        </p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>
                          Moderate knowledge in WordPress Core APIs like
                          options, metadata, REST, hooks, settings, etc.
                        </p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>
                          Ability to debug and fix bugs arising from other
                          developer’s code.
                        </p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Sense of humor</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>
                          Hard worker and passionate – we are growing super fast
                        </p>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h5">
                      Educational Requirements
                    </Typography>
                  </Box>
                  <Box marginBottom={2}>
                    <p>
                      It doesn’t matter where you went to college or what your
                      CGPA was as long as you are smart, passionate, ready to
                      work hard, and have fun.
                    </p>
                  </Box>
                  <Box marginBottom={2}>
                    <Box>
                      <Typography variant="h5">Working Hours</Typography>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>8:00 AM - 5:00 PM</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Weekly: 5 days.</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Weekend: Saturday, Sunday.</p>
                      </Box>
                    </Box>
                  </Box>
                  <Box marginBottom={2}>
                    <Box>
                      <Typography variant="h5">Statement</Typography>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>8:00 AM - 5:00 PM</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Weekly: 5 days.</p>
                      </Box>
                    </Box>
                    <Box display="flex">
                      <Box paddingRight={1}>
                        <img src={JOBS} alt="" />
                      </Box>
                      <Box>
                        <p>Weekend: Saturday, Sunday.</p>
                      </Box>
                    </Box>
                    {auth?.results?.type !== "recruitment" && (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={
                          homeJobs?.singleJob?.results?.user_apply === 1
                        }
                      >
                        {homeJobs?.singleJob?.results?.user_apply === 1
                          ? "Applied"
                          : "Apply Now"}
                      </Button>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={4}>
                <Box marginTop={3} className={style.jobs_details_right_box}>
                  <Box>
                    <Typography variant="h2">Summary</Typography>
                    {/* <Divider /> */}
                  </Box>
                  <Box>
                    <p>
                      <Grid container spacing={2}>
                        <Grid item sx={6}>
                          Job Type{" "}
                          <span style={{ paddingLeft: "40px" }}>:</span>{" "}
                          {homeJobs?.singleJob?.results?.job_type?.name}
                        </Grid>
                        <Grid item sx={6}>
                          Category{" "}
                          <span style={{ paddingLeft: "40px" }}>:</span>{" "}
                          {homeJobs?.singleJob?.results?.job_category?.name}
                        </Grid>
                        <Grid item sx={6}>
                          Posted <span style={{ paddingLeft: "60px" }}>:</span>{" "}
                          {homeJobs?.singleJob?.results?.created_at}
                        </Grid>
                        {/* <Grid item sx={6}>
                          Category{" "}
                          <span style={{ paddingLeft: "40px" }}>:</span>{" "}
                          Development
                        </Grid> */}
                        <Grid item sx={6}>
                          Salary <span style={{ paddingLeft: "65px" }}>:</span>{" "}
                          {homeJobs?.singleJob?.results?.job_salary_type?.name}
                        </Grid>
                        <Grid item sx={6}>
                          Gender <span style={{ paddingLeft: "55px" }}>:</span>{" "}
                          Male or Female
                        </Grid>
                        <Grid item sx={6}>
                          Qualification{" "}
                          <span style={{ paddingLeft: "15px" }}>:</span> BSC,
                          MSC
                        </Grid>
                        <Grid item sx={6}>
                          Experience{" "}
                          <span style={{ paddingLeft: "40px" }}>:</span>{" "}
                          {homeJobs?.singleJob?.results?.job_experience?.name}
                        </Grid>
                        <Grid item sx={6}>
                          Applied <span style={{ paddingLeft: "60px" }}>:</span>{" "}
                          26 Applicant
                        </Grid>
                        <Grid item sx={6}>
                          Application End <span>:</span> 20 November, 2021
                        </Grid>
                      </Grid>
                    </p>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Content_footer />
    </>
  );
};

export default JobDetails;
