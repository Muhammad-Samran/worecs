import React, { useState, useEffect } from "react";

import subs from "../../../assets/dashboard/activity/subs.svg";
import checks from "../../../assets/dashboard/activity/checks.svg";
import letters from "../../../assets/dashboard/activity/letters.svg";
import application from "../../../assets/dashboard/activity/application.svg";
import jobs from "../../../assets/dashboard/activity/jobs.svg";
import candidate from "../../../assets/dashboard/activity/candidate.svg";
import computer from "../../../assets/dashboard/activity/computer.svg";
import tech from "../../../assets/dashboard/activity/tech.svg";
import { Box, Grid, Typography } from "@mui/material";
import CustomTable from "../tabel/index";
import styles from "./styles.module.scss";
import { routes } from "../../../routes";
import { useNavigate } from "react-router-dom";
import {
  RecentActivities,
  dashboard,
} from "../../../api/candidate/candidate.class";
import { useSelector } from "react-redux";

const DashboardActivity = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const [activities, setActivities] = useState([]);
  const [Dashboard, setDashboard] = useState();
  const boxData = [
    {
      image: subs,
      name: "Pricing",
      subname: `${Dashboard?.remainingDays}-candidates’ credits`,
      route: routes.PRICING,
    },
    {
      image: checks,
      name: "Reference checks",
      subname: `${Dashboard?.candidate_reference_count}`,
      route: "#",
    },
    {
      image: letters,
      name: "Interviews",
      subname: `${Dashboard?.get_workspace_candidate_interview}`,
      route: routes.INTERVIEW,
    },
    {
      image: application,
      name: "Application forms",
      route: routes.FORMS,
    },
    {
      image: jobs,
      name: "Jobs",
      subname: `${Dashboard?.all_job}`,
      route: routes.JOBS,
    },

    {
      image: candidate,
      name: "Candidates",
      subname: `${Dashboard?.all_candidate_invitation}`,
      route: routes.ALL_CANDIDATES,
    },
    {
      image: computer,
      name: "Workspace",
      subname: `${Dashboard?.all_recruiter_invitation}`,
      route: routes.WORKSPACE,
    },
    {
      image: tech,
      name: "Help Desk",
      subname: "",
      route: routes.FAQS,
    },
  ];

  useEffect(() => {
    const API = async () => {
      try {
        const response = await RecentActivities();
        // console.log("RecentActivities", response?.data?.results?.data);
        setActivities(response?.data?.results?.data);
      } catch (error) {
        console.log(error);
      }
    };

    API();
  }, []);

  useEffect(() => {
    const API = async () => {
      try {
        const response = await dashboard();
        // console.log("dashboard", response?.data?.results);
        setDashboard(response?.data?.results);
        localStorage?.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            days: response?.data?.results.remainingDays,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    API();
  }, []);

  return (
    <Box className={styles.parent}>
      <Typography variant="h4">Dashboard</Typography>
      <Box className={styles.gridSystem}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          {Dashboard &&
            boxData?.map((item, index) => (
              <Grid item lg={3} md={6} xs={12} key={index}>
                <Box
                  className={styles.activityBox}
                  onClick={() => navigate(item?.route)}
                >
                  <img src={item?.image} alt={item?.name} />
                  <Typography variant="h4">{item?.name}</Typography>
                  <Typography variant="h5"> {item?.subname}</Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
        <Box className={styles.tableBox}>
          <Typography variant="h5">Recent Activity</Typography>
          <CustomTable activities={activities} />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardActivity;
