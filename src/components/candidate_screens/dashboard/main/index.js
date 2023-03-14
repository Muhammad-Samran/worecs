import React, { useState, useEffect } from "react";

import letters from "../../../../assets/dashboard/activity/letters.svg";
import jobs from "../../../../assets/dashboard/activity/jobs.svg";
import tech from "../../../../assets/dashboard/activity/tech.svg";
import user from "../../../../assets/dashboard/activity/users.svg";
import ref from "../../../../assets/dashboard/activity/ref.svg";
import lis from "../../../../assets/dashboard/activity/lis.svg";
import { Box, Grid, Typography } from "@mui/material";
import CustomTable from "../tabel/index";
import styles from "./styles.module.scss";
import { routes } from "../../../../routes";
import { useNavigate } from "react-router-dom";
import { RecentActivities } from "../../../../api/candidate/candidate.class";

const DashboardActivity = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const boxData = [
    {
      image: letters,
      name: "Form Completion Requests",
      // subname: "14-day free trial",
      route: routes.REQUEST_LIST,
    },
    {
      image: user,
      name: "Profile",
      // subname: "0/80",
      route: routes.CANDIDATE_PROFILE,
    },
    {
      image: ref,
      name: "References",
      // subname: "0/40",
      route: routes.REF,
    },
    {
      image: lis,
      name: "Certificates and Licenses",
      // subname: "0/40",
      route: routes.CANDIDATE_LICENSE,
    },
    {
      image: jobs,
      name: "Interviews",
      // subname: "0",
      route: routes.CANDIDATE_INTERVIEW,
    },

    {
      image: tech,
      name: "Help Desk",
      // subname: "",
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

  return (
    <Box className={styles.parent}>
      <Typography variant="h4">Dashboard</Typography>
      <Box className={styles.gridSystem}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          {boxData?.map((item, index) => (
            <Grid item lg={4} md={6} xs={12} key={index}>
              <Box
                className={styles.activityBox}
                onClick={() =>
                  navigate(
                    item?.route,
                    item?.name === "Licenses" && {
                      state: { comeFrom: "dashboard" },
                    }
                  )
                }
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
