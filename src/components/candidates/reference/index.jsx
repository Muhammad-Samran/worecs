import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";

import styles from "./styles.module.scss";
import { Button, CircularProgress, Grid } from "@mui/material";

import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
  createSingleReffFunc2,
  resetSingleCandidateReff,
} from "../../../store/actions/singleCandidateScreenActions";
import TextInput from "../../common/TextInput";
import PhoneFeild from "../../common/phoneFeild";

export default function CustomModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const candidateId = useSelector((state) => state.auth.results.candidate_id);
  const auth = useSelector((state) => state?.auth);
  const candidate = useSelector((state) => state?.rcandidate);
  const singleCandidate = useSelector((state) => state?.singleCandidate);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    full_name: "",
    job_title: "",
    email: "",
    contact_number: "",
    reference_relationship: "",
    reference_company_name: "",

    reference_signature: "",
    company_start_date: "",
    company_end_date: "",
  };

  const referenceSchema = Yup.object().shape({
    full_name: Yup.string().required("Required"),
    job_title: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    contact_number: Yup.string().required("Required"),
    reference_relationship: Yup.string().required("Required"),
    reference_company_name: Yup.string().required("Required"),

    reference_signature: Yup.string().required("Required"),
    company_start_date: Yup.string().required("Required"),
    company_end_date: Yup.string().required("Required"),
  });
  const [country_code, setCountryCode] = useState("");

  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    // console.log(values);
    const payload = {
      recruiter_id: auth?.results?.recruiter_id,
      workspace_id: auth?.results?.workspace_id,
      candidate_id: candidate?.showCandidate?.results?.id,
      type: "2",
      request_type: "recruiter_request",
      candidate_references: {
        reference_0: {
          ...values,
          country_code: country_code.trim() === "" ? "AU" : country_code,
          request_type: "recruiter_request",
        },
      },
    };
    dispatch(
      createSingleReffFunc2(payload, {
        workspace_id: auth?.results?.workspace_id,
        candidate_id: candidate?.showCandidate?.results?.id,
      })
    ).then(() => setLoading(false));
  };
  useEffect(() => {
    if (singleCandidate?.createReff?.success === true) {
      setOpen(false);
      dispatch(resetSingleCandidateReff());
    }
  }, [singleCandidate?.createReff]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`${styles.industryModel}`}
      >
        <Box className={`${styles.boxModel} xym1`}>
          <Box className={styles.modalwapper}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" className={styles.heading}>
              Add Reference
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={referenceSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit} className={styles.formsBox}>
                  <Box className={styles.statusbox}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Box>
                          <TextInput
                            autoComplete="off"
                            customClass={styles.boxForm}
                            type="text"
                            name="full_name"
                            label="Full Name"
                            sx={{ minWidth: "auto" }}
                            value={values.full_name}
                            onChange={handleChange}
                          />
                          <span className="error-class">
                            {errors.full_name &&
                              touched.full_name &&
                              errors.full_name}
                          </span>
                        </Box>
                        <Box>
                          {" "}
                          <TextInput
                            autoComplete="off"
                            customClass={styles.boxForm}
                            type="text"
                            name="job_title"
                            label="Job Title"
                            sx={{ minWidth: "auto" }}
                            value={values.job_title}
                            onChange={handleChange}
                          />
                          <span className="error-class">
                            {errors.job_title &&
                              touched.job_title &&
                              errors.job_title}
                          </span>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box>
                          {" "}
                          <TextInput
                            autoComplete="off"
                            customClass={styles.boxForm}
                            type="email"
                            name="email"
                            label="Email address"
                            sx={{ minWidth: "auto" }}
                            value={values.email}
                            onChange={handleChange}
                          />
                          <span className="error-class">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </Box>
                        <Box>
                          <PhoneFeild
                            customClass={styles.input}
                            name="contact_number"
                            type="tel"
                            placeholder={"+614 234 678"}
                            label="Contact Number"
                            country="AU"
                            onCountryChange={(e) => setCountryCode(e)}
                            value={values.contact_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <span className="error-class">
                            {errors.contact_number &&
                              touched.contact_number &&
                              errors.contact_number}
                          </span>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box>
                          {" "}
                          <TextInput
                            autoComplete="off"
                            customClass={styles.boxForm}
                            type="text"
                            name="reference_relationship"
                            label="Reference Relationship"
                            sx={{ minWidth: "auto" }}
                            value={values.reference_relationship}
                            onChange={handleChange}
                          />
                          <span className="error-class">
                            {errors.reference_relationship &&
                              touched.reference_relationship &&
                              errors.reference_relationship}
                          </span>
                        </Box>
                        <Box>
                          {" "}
                          <TextInput
                            autoComplete="off"
                            customClass={styles.boxForm}
                            type="text"
                            name="reference_company_name"
                            label="Reference Company Name"
                            sx={{ minWidth: "auto" }}
                            value={values.reference_company_name}
                            onChange={handleChange}
                          />
                          <span className="error-class">
                            {errors.reference_company_name &&
                              touched.reference_company_name &&
                              errors.reference_company_name}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="date"
                          sx={{ maxWidth: "initial" }}
                          label="Start Date*"
                          name="company_start_date"
                          onChange={handleChange}
                          value={values.company_start_date}
                        />
                        <span className="error-inputfield">
                          {errors.company_start_date &&
                            touched.company_start_date &&
                            errors.company_start_date}
                        </span>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="date"
                          sx={{ maxWidth: "initial" }}
                          label="End Date*"
                          name="company_end_date"
                          onChange={handleChange}
                          value={values.company_end_date}
                        />
                        <span className="error-inputfield">
                          {errors.company_end_date &&
                            touched.company_end_date &&
                            errors.company_end_date}
                        </span>
                      </Grid>
                    </Grid>
                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => onSubmit(values)}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          "Save"
                        )}
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
