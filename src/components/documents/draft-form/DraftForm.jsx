import React, { useEffect, useState } from "react";
import { a11yProps, TabPanel } from "../../common/mui-tabs";
import FormsTabel from "../table/index";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import PopupForm from "../modal/index";
import CreateForm from "../create-form";
import { useNavigate } from "react-router-dom";
import { getDraftForms } from "../../../api/candidate/candidate.class";
// import SEO from "../../meta-tags";

const DraftForm = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const api = async () => {
      try {
        const response = await getDraftForms({ isDraft: "1" });
        // console.log("all Draft forms", response.data.results.data);
        setFormData(response.data.results.data);
      } catch (error) {
        console.log(error);
      }
    };
    api();
  }, [update]);

  return (
    <>
      {/* <SEO title={"Work Space"} /> */}
      <Box className={styles.parent}>
        <Box className={styles.head}>
          <Typography variant="h4">Forms</Typography>
        </Box>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className={styles.buttonTabs}
          >
            <Tab label="Draft Forms" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FormsTabel
            titles={["Form Title", "Category Name", "Actions"]}
            rows={formData}
            setUpdate={setUpdate}
          />
        </TabPanel>
        <PopupForm open={open} setOpen={setOpen}>
          <CreateForm />
        </PopupForm>
      </Box>
    </>
  );
};

export default DraftForm;
