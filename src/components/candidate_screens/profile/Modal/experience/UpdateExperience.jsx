import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import TextInput from "../../../../common/TextInput";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";

import { updateExperience } from "../../../../../api/candidate/candidate.class";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../../../../common/Alert";
import { ShowAlert } from "../../../../../store/actions/alertActions";

export default function CustomModal({
  openModal,
  setOpenModal,
  setUpdation,
  editexperience,
}) {
  const dispatch = useDispatch();
  const handleClose = () => setOpenModal(false);
  const candidateId = useSelector((state) => state.auth.results.candidate_id);

  const initialValues = {
    company_name: editexperience ? editexperience?.company_name : "",
    address: editexperience ? editexperience?.address : "",
    start_date: editexperience
      ? moment(editexperience?.start_date).format("yyyy-MM-DD")
      : "",
    end_date: editexperience
      ? moment(editexperience?.end_date).format("yyyy-MM-DD")
      : "",
    description: editexperience ? editexperience?.description : "",
    is_currently_working: 0,

    job_category: editexperience ? editexperience?.job_category?.name : "",
    emptype: editexperience ? editexperience?.job_type?.name : "",
    industry: editexperience ? editexperience?.industry : "",

    industry_id: 1,
    job_type_id: 1,
  };

  const experienceSchema = Yup.object().shape({
    job_category: Yup.string().required("Required"),
    emptype: Yup.string().required("Required"),
    company_name: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    start_date: Yup.string().required("Required"),
    end_date: Yup.string().required("Required"),
    // industry: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    // headline: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await updateExperience({
        ...values,
        candidate_id: candidateId,
        uuid: editexperience?.uuid,
        start_date: `${moment(values.start_date).format("DD-MM-yyyy")}`,
        end_date: `${moment(values.end_date).format("DD-MM-yyyy")}`,
      });
      // console.log("updateExperience", response);
      if (response.data.success) {
        dispatch(ShowAlert(response?.data?.message, "success"));
        handleClose();
        setUpdation((old) => old + 1);
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
        className={`${styles.industryModel}`}
      >
        <Box className={`${styles.boxModel} xym1`}>
          <Box className={styles.modalwapper}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" className={styles.heading}>
              Update Experiences
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={experienceSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
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
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="job_category"
                          label="Job Title"
                          sx={{ minWidth: "auto" }}
                          onChange={handleChange}
                          value={values.job_category}
                        />
                        <span>
                          {errors.job_category &&
                            touched.job_category &&
                            errors.job_category}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="emptype"
                          label="Employment Type"
                          onChange={handleChange}
                          value={values.emptype}
                          sx={{ minWidth: "auto" }}
                        />
                        <span>
                          {errors.emptype && touched.emptype && errors.emptype}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="company_name"
                          label="Company Name"
                          onChange={handleChange}
                          value={values.company_name}
                          sx={{ minWidth: "auto" }}
                        />
                        <span>
                          {errors.company_name &&
                            touched.company_name &&
                            errors.company_name}
                        </span>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="address"
                          placeholder="Ex: Australia"
                          label="address"
                          onChange={handleChange}
                          value={values.address}
                          sx={{ minWidth: "auto" }}
                        />
                        <span>
                          {errors.address && touched.address && errors.address}
                        </span>
                      </Grid>

                      <Grid item xs={12}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="industry"
                          label="Industry*"
                          onChange={handleChange}
                          value={values.industry}
                          placeholder="Information Technology & Services"
                          sx={{ minWidth: "auto" }}
                        />
                        <span>
                          {errors.industry &&
                            touched.industry &&
                            errors.industry}
                        </span>
                        <Typography component="p" className={styles.textHelp}>
                          Worecs uses industry information to provide more
                          relevant recommendations
                        </Typography>
                        {/* <Typography component="p" className={styles.textLink}>
                          Learn more about <a>Industry Option</a>
                        </Typography> */}
                        <TextInput
                          customClass={styles.boxForm}
                          type="text"
                          name="description"
                          label="Description"
                          onChange={handleChange}
                          value={values.description}
                          textarea={true}
                          sx={{ minWidth: "auto" }}
                        />
                        <span>
                          {errors.description &&
                            touched.description &&
                            errors.description}
                        </span>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="date"
                          sx={{ maxWidth: "initial" }}
                          label="Start Date*"
                          name="start_date"
                          onChange={handleChange}
                          value={values.start_date}
                        />
                        <span className="error-inputfield">
                          {errors.start_date &&
                            touched.start_date &&
                            errors.start_date}
                        </span>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextInput
                          customClass={styles.boxForm}
                          type="date"
                          sx={{ maxWidth: "initial" }}
                          label="End Date*"
                          name="end_date"
                          onChange={handleChange}
                          value={values.end_date}
                        />
                        <span className="error-inputfield">
                          {errors.end_date &&
                            touched.end_date &&
                            errors.end_date}
                        </span>
                      </Grid>
                    </Grid>
                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleSubmit}>
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
