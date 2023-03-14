import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputBase,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./style.css";
import arrow from "../../../assets/icons/categories_arrow.png";
import JobIcon1 from "../../../assets/icons/jobs_icon1.png";
import JobIcon2 from "../../../assets/icons/jobs_icon2.png";
import Administration from "../../../assets/icons/Administration.svg";
import Architecture from "../../../assets/icons/Architecture.svg";
import Arts from "../../../assets/icons/Arts.svg";
import Location from "../../../assets/icons/location.png";
import Search from "../../../assets/icons/search.png";
import Content_footer from "../content-footer/Content_footer";
import { useDispatch, useSelector } from "react-redux";
import { getHomeJobs } from "../../../store/actions/homeJobActions";
import {
  jobCateFunc,
  jobExpFunc,
  jobSalaryFunc,
  jobTypeFunc,
} from "../../../store/actions/recruiterJobsActions";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Latest_job = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const homeJobs = useSelector((state) => state?.hjob);
  const reqJobs = useSelector((state) => state?.rjobs);
  const [showMore, setShowMore] = useState({
    cata: false,
    exp: false,
    salary: false,
    type: false,
  });

  useEffect(() => {
    dispatch(getHomeJobs());
    dispatch(jobCateFunc());
    dispatch(jobExpFunc());
    dispatch(jobSalaryFunc());
    dispatch(jobTypeFunc());
  }, []);
  const [values, setValues] = useState({
    job_experience: [],
    job_category: [],
    job_types: [],
    job_salary_type: [],
  });
  const [search, setSearch] = useState("");

  const handleChange = (e, item) => {
    const { value, type, checked, name } = e?.target;
    if (type === "checkbox") {
      return setValues({
        ...values,
        [name]: checked
          ? [...values[name], item?.id]
          : values[name]?.filter((e) => e !== item?.id),
      });
    }
    setSearch(value);
  };
  useEffect(() => {
    dispatch(getHomeJobs(values));
  }, [values]);

  const handleSubmit = (e) => {
    if (search?.trim() === "") return;
    dispatch(getHomeJobs({ search }));
  };

  return (
    <>
      <Navbar />
      <Box
        marginTop={14}
        marginBottom={3}
        className="latest_jobs_main_box_heading"
      >
        <Box className="latest_jobs_main_box">
          <Box>
            <Typography
              align="center"
              variant="h4"
              className="latest_jobs_main_box_search_headingh4"
            >
              Find The Best Way For Yourself
            </Typography>
          </Box>
          <Box paddingTop={2}>
            <Typography
              align="center"
              variant="body1"
              className="latest_jobs_main_box_search_headingpara"
            >
              Automated reference checking service for professionals, by
              professionals
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container>
        <Grid container marginTop={2}>
          <Grid item md={4} marginTop={3} paddingRight={5}>
            <Box className="categories_box">
              <Box>
                <Box marginBottom={3}>
                  <Typography variant="h4" className="checkbox_heading">
                    Categories
                  </Typography>
                </Box>
                {reqJobs?.jobCata?.results?.map((e, i) =>
                  showMore?.cata ? (
                    <Box key={i}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="job_category"
                            onChange={(el) => handleChange(el, e)}
                            sx={{
                              color: "#00CFC5",
                              "&.Mui-checked": {
                                color: "#00CFC5",
                              },
                            }}
                          />
                        }
                        label={e?.text}
                      />
                    </Box>
                  ) : (
                    i < 4 && (
                      <Box key={i}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="job_category"
                              onChange={(el) => handleChange(el, e)}
                              sx={{
                                color: "#00CFC5",
                                "&.Mui-checked": {
                                  color: "#00CFC5",
                                },
                              }}
                            />
                          }
                          label={e?.text}
                        />
                      </Box>
                    )
                  )
                )}
                {/* <Box display="flex">
                  <Box>
                    <img src={Administration} alt="" />
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      className="categories_box_name"
                      style={{ color: "#00CFC5" }}
                    >
                      Administration
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box>
                    <img src={Architecture} alt="" />
                  </Box>
                  <Box>
                    <Typography variant="body1" className="categories_box_name">
                      Architecture & Engineering
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box>
                    <img src={Arts} alt="" />
                  </Box>
                  <Box>
                    <Typography variant="body1" className="categories_box_name">
                      Arts & Sports
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex">
                  <Box></Box>
                  <Box paddingBottom={4}>
                    <a className="categories_box_namesee" href=" ">
                      See More
                    </a>
                  </Box>
                </Box> */}
                <Box display="flex">
                  <Box></Box>
                  <Box paddingBottom={4}>
                    <span
                      onClick={() =>
                        setShowMore({
                          ...showMore,
                          cata: !showMore?.cata,
                        })
                      }
                      className="categories_box_namesee"
                    >
                      {showMore?.cata ? "See Less" : "     See More"}
                    </span>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Box marginBottom={3}>
                  <Typography variant="h4" className="checkbox_heading">
                    Job Type
                  </Typography>
                </Box>
                {reqJobs?.jobType?.results?.map((e, i) =>
                  showMore?.type ? (
                    <Box key={i}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="job_types"
                            onChange={(el) => handleChange(el, e)}
                            sx={{
                              color: "#00CFC5",
                              "&.Mui-checked": {
                                color: "#00CFC5",
                              },
                            }}
                          />
                        }
                        label={e?.text}
                      />
                    </Box>
                  ) : (
                    i < 4 && (
                      <Box key={i}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="job_types"
                              onChange={(el) => handleChange(el, e)}
                              sx={{
                                color: "#00CFC5",
                                "&.Mui-checked": {
                                  color: "#00CFC5",
                                },
                              }}
                            />
                          }
                          label={e?.text}
                        />
                      </Box>
                    )
                  )
                )}
                {reqJobs?.jobType?.results?.length > 4 && (
                  <Box display="flex">
                    <Box></Box>
                    <Box paddingBottom={4}>
                      <span
                        onClick={() =>
                          setShowMore({
                            ...showMore,
                            type: !showMore?.type,
                          })
                        }
                        className="categories_box_namesee"
                      >
                        {showMore?.type ? "See Less" : "      See More"}
                      </span>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* <Box>
                <Box marginBottom={3}>
                  <Typography variant="h4" className="checkbox_heading">
                    Experience Level
                  </Typography>
                </Box>
                {reqJobs?.jobExp?.results?.map((e, i) =>
                  showMore?.exp ? (
                    <Box key={i}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="job_experience"
                            onChange={(el) => handleChange(el, e)}
                            sx={{
                              color: "#00CFC5",
                              "&.Mui-checked": {
                                color: "#00CFC5",
                              },
                            }}
                          />
                        }
                        label={e?.text}
                      />
                    </Box>
                  ) : (
                    i < 4 && (
                      <Box key={i}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="job_experience"
                              onChange={(el) => handleChange(el, e)}
                              sx={{
                                color: "#00CFC5",
                                "&.Mui-checked": {
                                  color: "#00CFC5",
                                },
                              }}
                            />
                          }
                          label={e?.text}
                        />
                      </Box>
                    )
                  )
                )}
                {reqJobs?.jobExp?.results?.length > 4 && (
                  <Box display="flex">
                    <Box></Box>
                    <Box paddingBottom={4}>
                      <span
                        onClick={() =>
                          setShowMore({
                            ...showMore,
                            exp: !showMore?.exp,
                          })
                        }
                        className="categories_box_namesee"
                      >
                        {showMore?.exp ? "See Less" : "      See More"}
                      </span>
                    </Box>
                  </Box>
                )}
              </Box> */}
              <Box>
                <Box marginBottom={3}>
                  <Typography variant="h4" className="checkbox_heading">
                    Job Salary
                  </Typography>
                </Box>
                {reqJobs?.jobSalary?.results?.map((e, i) =>
                  showMore?.salary ? (
                    <Box key={i}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="job_salary_type"
                            onChange={(el) => handleChange(el, e)}
                            sx={{
                              color: "#00CFC5",
                              "&.Mui-checked": {
                                color: "#00CFC5",
                              },
                            }}
                          />
                        }
                        label={e?.text}
                      />
                    </Box>
                  ) : (
                    i < 4 && (
                      <Box key={i}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="job_salary_type"
                              onChange={(el) => handleChange(el, e)}
                              sx={{
                                color: "#00CFC5",
                                "&.Mui-checked": {
                                  color: "#00CFC5",
                                },
                              }}
                            />
                          }
                          label={e?.text}
                        />
                      </Box>
                    )
                  )
                )}
                {reqJobs?.jobSalary?.results?.length > 4 && (
                  <Box display="flex">
                    <Box></Box>
                    <Box paddingBottom={4}>
                      <span
                        onClick={() =>
                          setShowMore({
                            ...showMore,
                            salary: !showMore?.salary,
                          })
                        }
                        className="categories_box_namesee"
                      >
                        {showMore?.salary ? "See Less" : "      See More"}
                      </span>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item md={8} marginTop={2}>
            <Box className="latestjobs_field_main_box">
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <Box display="flex">
                    <Box paddingTop={2.7} paddingLeft={1}>
                      <img src={Search} alt="" />
                    </Box>
                    <Box>
                      <InputBase
                        name="search"
                        value={search}
                        onChange={(e) => handleChange(e)}
                        className="latestjobs_field"
                        sx={{ height: 80, width: "100%" }}
                        type="text"
                        placeholder="Field"
                      />
                    </Box>
                    {/* <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        bgcolor: "#00CFC5",
                        display: { xs: "none", sm: "block" },
                      }}
                    /> */}
                  </Box>

                  {/* <Divider orientation="vertical" sx={{color:"#00CFC5"}} /> */}
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                  <Box display="flex">
                    <Box paddingTop={2.7} paddingLeft={1}>
                      <img src={Location} alt="" />
                    </Box>
                    <Box>
                      <InputBase
                        className="latestjobs_field"
                        sx={{ height: 80 }}
                        type="text"
                        placeholder="Location"
                      />
                    </Box>
                  </Box>
                </Grid> */}
                <Grid item xs={12} sm={4}>
                  <Box paddingY={2.3} className="latestjob_btn_search">
                    <Button
                      onClick={(e) => handleSubmit(e)}
                      size="large"
                      className="latestjob_btn"
                      variant="contained"
                    >
                      Search
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {/* <Box className="latest_job_main_btns_location" marginY={3}>
              <Box display="flex">
              <Box display="flex">
                <Box paddingTop={2.7} paddingLeft={1}>
                  <img src={Search} alt="" />
                </Box>
                <Box>
                    <InputBase
                    className="latestjobs_field"
                    sx={{ height:80}}
                    type="text"
                    placeholder="Field"
                    />
                </Box>
                <Divider orientation="vertical" sx={{color:"#00CFC5"}} />
              </Box>
              <Box display="flex">
                <Box paddingTop={2.7} paddingLeft={1}>
                <img src={Location} alt="" />
                </Box>
                <Box>
                    <InputBase
                    className="latestjobs_field"
                    sx={{ height: 80}}
                    type="text"
                    placeholder="Location"
                    />
                </Box>
              </Box>
              <Box display="flex">
                <Box paddingTop={2.3} paddingLeft={8} className="latestjob_btn_search">
                    <Button size="large" className="latestjob_btn" variant="contained">Search</Button>
                </Box>
              </Box>
              </Box>
            </Box> */}
            {homeJobs?.loading === true && homeJobs?.allJobs === null ? (
              <div
                style={{
                  postion: "relative",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <CircularProgress style={{ color: "black" }} />
                </div>
              </div>
            ) : homeJobs?.loading === false && homeJobs?.allJobs === null ? (
              <></>
            ) : (
              homeJobs?.allJobs?.results?.data?.map((e, i) => (
                <Box
                  className="titlename_link"
                  onClick={() => {
                    navigate(`/jobs/detail/${e?.slug}`, {
                      state: {
                        id: e.id,
                        uuid: e?.uuid,
                        title: e?.job_title,
                        slug: e?.slug,
                      },
                    });
                  }}
                >
                  <Grid container className="latest_box" key={i}>
                    <Grid item xs={12} sm={3}>
                      <Box className="sqr_box">
                        <img
                          className="sqr_box_icons"
                          src={`${process.env.REACT_APP_URL}${e?.logo}`}
                          alt=""
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Box main className="fir_box">
                        <Box style={{ color: "#00CFC5" }}>
                          <Typography
                            className="fir_box_date_name_recrui"
                            variant="body1"
                          >
                            {e?.company_name}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            className="fir_box_date_name"
                            variant="body1"
                          >
                            {e?.created_at}
                          </Typography>
                        </Box>
                      </Box>
                      <Box paddingTop={1}>
                        <Typography
                          variant="h6"
                          className="fir_box_date_name_solut"
                        >
                          {e?.job_title}
                        </Typography>
                      </Box>
                      <Box paddingTop={1} main className="fir_box">
                        <Button
                          variant="contained"
                          className="fir_box_date_name_recrui_btn"
                        >
                          {e?.job_category?.name}
                        </Button>
                        <Box display="flex">
                          <Box>
                            <img src="" alt="" />
                          </Box>
                          <Button
                            variant="contained"
                            className="fir_box_date_name_recrui_btn"
                          >
                            {e?.job_type?.name}
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))
            )}
            {/* ------ */}

            {/* ------ */}
          </Grid>
        </Grid>
      </Container>
      <Content_footer />
    </>
  );
};

export default Latest_job;
