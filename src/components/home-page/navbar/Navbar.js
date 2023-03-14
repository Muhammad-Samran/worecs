// import { useTheme } from '@emotion/react';
import {
  AppBar,
  Button,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
  colors,
  Container,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ContactPopUp from "../contactpopup/ContactPopUp";
import Drawercomp from "../drawer/Drawercomp";
import "../index";
import Latest_job from "../latest-jobs/Latest_job";
import "./navbar.css";
import CustomModel from "../model/index";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../../routes";
import { Logout } from "../../../store/actions/authActions";
// import index from './index';

const Navbar = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);

  const [value, setValue] = useState();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = (set) => set(true);

  const navigate = useNavigate();

  return (
    <AppBar sx={{ backgroundColor: "white" }}>
      <Toolbar>
        {isMatch ? (
          <>
            <Typography
              className="logo_head"
              paddingLeft={2}
              onClick={() => navigate("/")}
            >
              Worecs.
            </Typography>
            <Drawercomp />
          </>
        ) : (
          <Grid container sx={{ placeItems: "center" }}>
            <Grid item xs={2}>
              <Typography
                className="logo_head"
                variant="h4"
                onClick={() => navigate("/")}
              >
                Worecs.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Tabs className="nav_tabs">
                <Link className="nav_link_home" to="/">
                  {" "}
                  <Tab label="Home" />
                </Link>
                <Link className="nav_link_home" to="/pricingtable">
                  {" "}
                  <Tab label="pricing" />
                </Link>
                <Link className="nav_link_home" to="/jobs/search">
                  {" "}
                  <Tab label="Jobs" />
                </Link>
                <Link className="nav_link_home" to="/news">
                  {" "}
                  <Tab label="News" />
                </Link>
                <Link className="nav_link_home" to="/contact-us">
                  {" "}
                  <Tab label="Contact Us" />
                </Link>
              </Tabs>
            </Grid>
            {/* <Grid item xs={1} /> */}
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Box display="flex">
                <Box>
                  <Button
                    className="sign_in_btn"
                    size="small"
                    variant="outline"
                    onClick={() =>
                      auth?.results?.type === "candidate"
                        ? navigate(routes?.CANDIDATE_DASHBOARD)
                        : auth?.results?.type === "recruitment"
                        ? navigate(routes.DASHBOARD)
                        : navigate("/login")
                    }
                  >
                    {auth?.results?.access_token ? "Dashboard" : " Sign in"}
                  </Button>
                </Box>
                <Box>
                  <Button
                    className="sign_up_btns"
                    size="small"
                    variant="outline"
                    onClick={() =>
                      auth?.results?.access_token
                        ? dispatch(Logout()).then(() => navigate("/"))
                        : navigate("/sign-up")
                    }
                  >
                    {auth?.results?.access_token ? "Logout" : " Sign up"}
                  </Button>
                </Box>
                <Box>
                  <Button
                    className="req_dem_btn"
                    variant="contained"
                    onClick={() => handleOpen(setOpen)}
                  >
                    Request Demo
                  </Button>
                  <CustomModel open={open} setOpen={setOpen}>
                    <ContactPopUp setOpen2={setOpen2} setOpen={setOpen} />
                  </CustomModel>
                  <CustomModel open={open2} setOpen={setOpen2}>
                    <ContactPopUp setOpen={setOpen2} />
                  </CustomModel>
                  {/* {<ContactPopUp />} */}
                  {/* <Button
                    className="req_dem_btn"
                    size="small"
                    variant="contained"
                    // onClick={() => navigate("/contact-us")}
                  >
                    {<ContactPopUp />}
                  </Button> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
