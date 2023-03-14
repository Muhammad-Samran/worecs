import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import FormBuilder from "./FormBuilder";
import ConfirmFormSubmit from "../modal";
import { useLocation } from "react-router-dom";

const CreateForm = () => {
  const [formData, setFormData] = useState();

  const [confirmForm, setConfirmForm] = useState(false);
  const [draft, setDraft] = useState("0");
  const [apiDraft, setApiDraft] = useState();

  const handleInit = (status, value, Draft, apiType) => {
    setConfirmForm(status);
    setFormData(value);
    setApiDraft(apiType);
    if (Draft === "1") {
      setDraft(Draft);
    }
  };

  const location = useLocation();
  const data = location?.state?.data;
  const uuid = location?.state?.uuid;
  const isDraft = location?.state?.isDraft;

  return (
    <>
      <Box className={styles.parent}>
        <Box className={styles.head}>
          <Typography className={styles.text} variant="h4">
            Form Builder
          </Typography>
        </Box>
        <Box className={styles.formBuilderParent}>
          <FormBuilder
            setFormData={setFormData}
            setConfirmForm={setConfirmForm}
            handleInit={handleInit}
            data={data}
            isDraft={isDraft}
          />
        </Box>
      </Box>

      <ConfirmFormSubmit
        openModal={confirmForm}
        setOpenModal={setConfirmForm}
        formData={formData}
        uuid={uuid}
        draft={draft}
        apiDraft={apiDraft}
      />
    </>
  );
};

export default CreateForm;
