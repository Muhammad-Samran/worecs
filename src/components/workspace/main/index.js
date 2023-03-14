import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { a11yProps, TabPanel } from "../../common/mui-tabs";
import WorkSpaceTabel from "../tabel";
import styles from "./styles.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import SEO from "../../meta-tags";
import CustomModel from "../model/index";
import CreateData from "../CreateMember/index";
import { useDispatch, useSelector } from "react-redux";
import { resetMember } from "../../../store/actions/recruiterMembers";

const WorkSpace = () => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const tableData = useSelector((state) => state?.member?.allMembers);

  const dispatch = useDispatch();
  useEffect(() => {
    !open && dispatch(resetMember());
  }, [open]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <SEO title={"Work Space"} />
      <Box className={styles.parent}>
        <Box className={styles.head}>
          <Typography variant="h4">Team Members</Typography>
          <Box className={styles.buttonGroup}>
            <Box className={`button-primary ${styles.button}`}>
              {/* <Button onClick={() => setOpen(true)}>
                <AiOutlinePlus /> Create Now
              </Button> */}
              <Button
                onClick={() => {
                  dispatch(resetMember());
                  setOpen(true);
                }}
              >
                <AiOutlinePlus /> Invite Team Member
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={styles.buttonTabs}
          >
            <Tab label="All Members" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <WorkSpaceTabel
            titles={[
              "Ref. No",
              "Member name",
              "Role",
              "Active candidates",
              "Total references",
              "Jobs posted",
              // "Status",
              "Actions",
            ]}
            rows={tableData?.results}
          />
        </TabPanel>
        <CustomModel setOpen={setOpen} open={open}>
          <CreateData setOpen={setOpen} open={open} />
        </CustomModel>
      </Box>
    </>
  );
};

export default WorkSpace;
