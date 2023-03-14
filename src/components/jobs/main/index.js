import React, { useEffect } from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { a11yProps, TabPanel } from "../../common/mui-tabs";
import JobsTabel from "../tabel";
import styles from "./styles.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { useDispatch, useSelector } from "react-redux";
import { resetModel } from "../../../store/actions/industryActions";
import { ShowAlert } from "../../../store/actions/alertActions";
import {
  isCompanyExisit,
  resetCompany,
} from "../../../store/actions/companyActions";
import {
  getAllArchivedRecruiterjobs,
  getAllDeActivateRecruiterjobs,
  getAllRecruiterjobs,
  resetJob,
} from "../../../store/actions/recruiterJobsActions";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company = useSelector((state) => state?.company);
  const [value, setValue] = React.useState(0);
  const jobs = useSelector((state) => state?.rjobs);

  useEffect(() => {
    dispatch(resetCompany());
    dispatch(resetJob());
  }, [dispatch]);
  useEffect(() => {
    value === 0 && dispatch(getAllRecruiterjobs());
    value === 1 &&
      dispatch(
        getAllArchivedRecruiterjobs({
          is_archived: 1,
        })
      );
    value === 2 &&
      dispatch(
        getAllDeActivateRecruiterjobs({
          job_status: 0,
        })
      );
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const exisitCompany = async () => {
    await dispatch(isCompanyExisit()).then(() => {
      navigate(routes.JOBS_CREATE);
    });
  };

  return (
    <>
      <Box className={styles.parent}>
        <Box className={styles.head}>
          <Typography variant="h4">Jobs</Typography>
        </Box>
        {value !== 2 ? (
          <Box className={styles.buttonWrapper}>
            <Box className={`button-primary ${styles.button}`}>
              <Button onClick={exisitCompany}>
                <AiOutlinePlus /> Create
              </Button>
            </Box>
          </Box>
        ) : (
          ""
        )}
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            className={styles.buttonTabs}
          >
            <Tab label="Active Jobs" {...a11yProps(0)} />
            <Tab label="Archived Jobs" {...a11yProps(1)} />
            <Tab label="Deactivated Jobs" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <JobsTabel
            value={value}
            titles={[
              "Job Title",
              "Company",

              "Job posted on",
              "Status",
              "Actions",
            ]}
            rows={jobs?.allJobs?.results}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <JobsTabel
            value={value}
            titles={["Job Title", "Company", "Job posted on", "Actions"]}
            rows={jobs?.archivedJobs?.results}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <JobsTabel
            value={value}
            titles={[
              "Job Title",
              "Company",

              "Job posted on",
              "Status",
              "Actions",
            ]}
            rows={jobs?.deactiveJobs?.results}
          />
        </TabPanel>
      </Box>
    </>
  );
};

export default Jobs;
