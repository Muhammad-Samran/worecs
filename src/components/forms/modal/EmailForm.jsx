import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import { sendRequest } from "../../../api/candidate/candidate.class";
import MultiPersons from "./multiPersons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";

export default function EmailForm({
  openModal,
  setOpenModal,
  setUpdate,
  data,
}) {
  const handleClose = () => setOpenModal(false);
  const [formValues, setFormValues] = useState([
    { to_email: "", contact_number: "", country_code: "AU" },
  ]);
  const auth = useSelector((state) => state.auth.results);
  const dispatch = useDispatch();

  // console.log(data);

  const handleSend = async () => {
    // console.log("handleSend", data);
    let requests = {};
    if (formValues?.length > 0) {
      formValues.forEach((record, index) => {
        requests["sender_information_" + index] = record;
      });
    }
    try {
      const payload = {
        recruiter_id: auth?.recruiter_id,
        workspace_id: data?.workspace_id,
        // candidate_id:
        form_builder_category_id: data?.form_builder_category?.id,
        uuid: data?.uuid,
        form_requests: requests,
      };
      // console.log("payload", payload);
      const response = await sendRequest(payload);
      // console.log(response);
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        handleClose();
        setUpdate((old) => old + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class={styles.modalParent}>
          <Box className={styles.modalwapper}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" className={styles.heading}>
              Send Form
            </Typography>
            <Box className={styles.parent}>
              <MultiPersons
                setFormValues={setFormValues}
                formValues={formValues}
              />

              <Box className={`button-primary`}>
                <Button
                  className={`button-primary`}
                  type="button"
                  onClick={handleSend}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
