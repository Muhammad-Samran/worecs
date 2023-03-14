import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import TextInput from "../../../../common/TextInput";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PhoneFeild from "../../../../common/phoneFeild";
import {
  addLicense,
  getLicenseShow,
} from "../../../../../api/candidate/candidate.class";
import moment from "moment/moment";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({ openModal, setOpenModal, isAddition }) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const candidateId = useSelector((state) => state.auth.results.candidate_id);

  const initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    address: "",
    contact_number: "",
    // passport_number: "",
    // visa_number: "",
    dob: "",
  };

  const licenseSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    middle_name: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
    // .required("Required")
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    address: Yup.string()
      .required("address is required")
      .min(8, "address should be proper address"),
    contact_number: Yup.string()
      .required("Phone Required")
      .min(11, "Phone Should be more then 11 digits"),
    // passport_number: Yup.string()
    //   .required("Passport is required")
    //   .min(2, "enter valid passport no"),
    // visa_number: Yup.string()
    //   .required("Visa No is required")
    //   .min(2, "enter valid visa no"),
    dob: Yup.string().required("date of birth is required"),
  });

  const [country_code, setCountryCode] = useState("");

  const onSubmit = async (values) => {
    // console.log("values", values);
    try {
      const response = await addLicense({
        ...values,
        candidate_id: candidateId,
        dob: moment(values.dob).format("DD-MM-yyyy"),
        country_code: country_code.trim() === "" ? "AU" : country_code,
      });
      // console.log("res.data.success", response.data.success);
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        handleClose();
        isAddition((old) => old + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Alerts />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalParent}>
          <Box className={styles.modalwapper}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" className={styles.heading}>
              License Info
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={licenseSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={styles.formsBox}>
                  <Box className={styles.statusbox}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextInput
                            customClass={styles.input}
                            type="text"
                            name="first_name"
                            label="First Name"
                            sx={{ minWidth: "auto" }}
                            onChange={handleChange}
                            value={values.first_name}
                          />
                          <span>
                            {errors.first_name &&
                              touched.first_name &&
                              errors.first_name}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextInput
                            customClass={styles.input}
                            type="text"
                            name="middle_name"
                            label="Middle Name"
                            sx={{ minWidth: "auto" }}
                            onChange={handleChange}
                            value={values.middle_name}
                          />
                          <span>
                            {errors.middle_name &&
                              touched.middle_name &&
                              errors.middle_name}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextInput
                            customClass={styles.input}
                            type="text"
                            name="last_name"
                            label="Last Name"
                            sx={{ minWidth: "auto" }}
                            onChange={handleChange}
                            value={values.last_name}
                          />
                          <span>
                            {errors.last_name &&
                              touched.last_name &&
                              errors.last_name}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextInput
                            customClass={styles.input}
                            type="text"
                            name="email"
                            label="Email"
                            sx={{ minWidth: "auto" }}
                            onChange={handleChange}
                            value={values.email}
                          />
                          <span>
                            {errors.email && touched.email && errors.email}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextInput
                            customClass={styles.input}
                            type="text"
                            name="address"
                            label="Address"
                            sx={{ minWidth: "auto" }}
                            onChange={handleChange}
                            value={values.address}
                          />
                          <span>
                            {errors.address &&
                              touched.address &&
                              errors.address}
                          </span>
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextInput
                            customClass={styles.input}
                            type="text"
                            name="passport_number"
                            label="Passport No"
                            sx={{ minWidth: "auto" }}
                            onChange={handleChange}
                            value={values.passport_number}
                          />
                          <span>
                            {errors.passport &&
                              touched.passport &&
                              errors.passport}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextInput
                            customClass={styles.input}
                            type="text"
                            name="visa_number"
                            label="Visa No"
                            sx={{ minWidth: "auto" }}
                            onChange={handleChange}
                            value={values.visa_number}
                          />
                          <span>
                            {errors.visa && touched.visa && errors.visa}
                          </span>
                        </Box>
                      </Grid> */}
                      <Grid item xs={6}>
                        <Box className={styles.parentInput}>
                          <PhoneFeild
                            name="contact_number"
                            type="tel"
                            placeholder={"+614 234 678"}
                            label="Contact Number"
                            country="AU"
                            onCountryChange={(e) => setCountryCode(e)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.contact_number}
                          />
                          <span>
                            {" "}
                            {errors.contact_number &&
                              touched.contact_number &&
                              errors.contact_number}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={styles.parentInput}>
                          <TextField
                            style={{ width: "100%" }}
                            customClass={styles.input}
                            id="date"
                            size="small"
                            label="Birthday"
                            type="date"
                            name="dob"
                            sx={{ mt: 5.6, pb: 1 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.dob}
                          />
                          <span>{errors.dob && touched.dob && errors.dob}</span>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={() => handleSubmit()}>
                        Save
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
