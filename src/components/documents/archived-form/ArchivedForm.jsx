import React, { useEffect, useState } from "react";
import { a11yProps, TabPanel } from "../../common/mui-tabs";
import FormsTabel from "../table/index";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import PopupForm from "../modal/index";
import CreateForm from "../create-form";
import { useNavigate } from "react-router-dom";
import {
  getAllForms,
  getDeactivateForms,
} from "../../../api/candidate/candidate.class";

// import SEO from "../../meta-tags";

const ArchivedForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [deactivateData, setDeactivateData] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const api = async () => {
      try {
        const response = await getAllForms();
        setFormData(response?.data?.results?.data);
      } catch (error) {
        console.log(error);
      }
    };
    api();
  }, [update]);

  useEffect(() => {
    const api = async () => {
      const response = await getDeactivateForms({
        form_builder_status: "0",
      });
      setDeactivateData(response?.data?.results?.data);
    };
    api();
  }, [update]);

  return (
    <>
      <Box className={styles.parent}>
        <Box className={styles.head}>
          <Typography variant="h4">Document</Typography>
          <Box className={styles.buttonGroup}>
            <Box className={`button-preimary ${styles.button}`}>
              <Button
              // className={"secondary-btn"}
              // onClick={() => navigate("/dashboard/create-new-form")}
              >
                <AiOutlinePlus /> Create
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
            <Tab label="Archived Documents" {...a11yProps(0)} />
            {/* <Tab label="Deactive Document" {...a11yProps(1)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FormsTabel
            titles={[
              "Document Title",
              "Category Name",
              "Status",
              "Resend Document",
              "Actions",
            ]}
            rows={[]}
            setUpdate={setUpdate}
            type="All Document"
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormsTabel
            titles={["Document Title", "Category Name", "Status", "Actions"]}
            rows={[]}
            setUpdate={setUpdate}
            type="deactive"
          />
        </TabPanel>
        {/* <PopupForm open={open} setOpen={setOpen}>
          <CreateForm />
        </PopupForm> */}
      </Box>
    </>
  );
};

export default ArchivedForm;
