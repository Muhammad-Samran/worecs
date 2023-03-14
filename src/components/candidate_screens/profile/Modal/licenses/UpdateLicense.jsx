import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button, Grid, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment/moment";
import TextField from "@mui/material/TextField";
import { updateProfileLicense } from "../../../../../api/candidate/candidate.class";
import CustomSelect from "../../../../common/Select";
import ImageUploader from "../../../../common/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../../../store/actions/alertActions";
import Alerts from "../../../../common/Alert";

export default function CustomModal({
  openModal,
  setOpenModal,
  setUpdation,
  userDetailData,
  data,
  type,
}) {
  const handleClose = () => setOpenModal(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.results);
  const [loading, setLoading] = useState(false);
  const [edit1, setEdit1] = useState(true);
  const [edit2, setEdit2] = useState(true);

  const [file, setFile] = useState({
    front_image: data?.front_image,
    back_image: data?.back_image,
  });

  const initialValues = {
    recruit_industry:
      {
        value: data?.recruiter_industry?.id,
        label: data?.recruiter_industry?.name,
      } || "",
    industry_cert_license:
      {
        value: data?.industry_certification_license?.id,
        label: data?.industry_certification_license?.name,
      } || "",
    issue_date: moment(data?.issue_date).format("yyyy-MM-DD") || "",
    expiry_date: moment(data?.expiry_date).format("yyyy-MM-DD") || "",
    doc_id: data?.document_number || "",
  };

  const licenseSchema = Yup.object().shape({
    recruit_industry: Yup.object().required("Required"),
    industry_cert_license: Yup.object().required("Required"),
    issue_date: Yup.string().required("Required"),
    expiry_date: Yup.string().required("Required"),
    doc_id: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    let payload;
    setLoading(true);
    try {
      if (type === "request") {
        payload = {
          uuid: data?.uuid,
          candidate_id: auth?.candidate_id,
          workspace_id: data?.workspace_id,
          recruiter_id: data?.recruiter_id,

          request_type: "candidate",
          candidate_lic_cert_id: userDetailData?.id || "",
        };
        payload["recruitment_industries[" + data.id + "][rec_ind_request_id]"] =
          values.recruit_industry?.value || "";
        payload[
          "recruitment_industries[" + data.id + "][ind_cert_lic_request_id]"
        ] = values.industry_cert_license?.value || "";
        payload["recruitment_industries[" + data.id + "][front_image]"] =
          file?.front_image;
        payload["recruitment_industries[" + data.id + "][back_image]"] =
          file?.back_image;
      } else {
        payload = {
          uuid: data?.uuid,
          candidate_id: auth?.candidate_id,
          request_type: "candidate",
          candidate_lic_cert_id: userDetailData?.id || "",
        };
        payload["recruitment_industries[" + data.id + "][issue_date]"] =
          moment(values.issue_date).format("DD-MM-yyyy") || "";
        payload["recruitment_industries[" + data.id + "][expiry_date]"] =
          moment(values.expiry_date).format("DD-MM-yyyy") || "";
        payload["recruitment_industries[" + data.id + "][document_number]"] =
          values.doc_id || "";
        payload["recruitment_industries[" + data.id + "][rec_ind_request_id]"] =
          values.recruit_industry?.value || "";
        payload[
          "recruitment_industries[" + data.id + "][ind_cert_lic_request_id]"
        ] = values.industry_cert_license?.value || "";
        payload["recruitment_industries[" + data.id + "][front_image]"] =
          file?.front_image;
        payload["recruitment_industries[" + data.id + "][back_image]"] =
          file?.back_image;
      }
      const response = await updateProfileLicense({ ...payload });

      if (response.data.success) {
        setLoading(false);
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
              Update Certificates and Licenses
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
                setFieldValue,
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
                          <CustomSelect
                            customClass={styles.select}
                            type="text"
                            name="recruit_industry"
                            value={values.recruit_industry}
                            sx={{ maxWidth: "initial" }}
                            label="Recruitment Industries"
                            isDisabled={true}
                          />
                          <span>
                            {errors.recruit_industry &&
                              touched.recruit_industry &&
                              errors.recruit_industry}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <CustomSelect
                            customClass={styles.select}
                            type="text"
                            name="industry_cert_license"
                            value={values.industry_cert_license}
                            sx={{ maxWidth: "initial" }}
                            label="Industry Certification License"
                            isDisabled={true}
                          />
                          <span>
                            {errors.industry_cert_license &&
                              touched.industry_cert_license &&
                              errors.industry_cert_license}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentInput}>
                          <TextField
                            style={{ width: "100%" }}
                            customClass={styles.input}
                            label="Document ID"
                            type="text"
                            name="doc_id"
                            sx={{ mt: 3, pb: 3 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.doc_id}
                          />
                          <span>
                            {errors.doc_id && touched.doc_id && errors.doc_id}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={styles.parentBox}>
                          <TextField
                            style={{ width: "100%" }}
                            customClass={styles.input}
                            id="date"
                            size="small"
                            label="Issue Date"
                            type="date"
                            name="issue_date"
                            // sx={{ pb: 3 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.issue_date}
                          />
                          <span>
                            {errors.issue_date &&
                              touched.issue_date &&
                              errors.issue_date}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={styles.parentBox}>
                          <TextField
                            style={{ width: "100%" }}
                            customClass={styles.input}
                            id="date"
                            size="small"
                            label="Expiry Date"
                            type="date"
                            name="expiry_date"
                            // sx={{ mt: 5.6, pb: 1 }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}
                            value={values.expiry_date}
                          />
                          <span>
                            {errors.expiry_date &&
                              touched.expiry_date &&
                              errors.expiry_date}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box className={styles.parentBox}>
                          <ImageUploader
                            label={
                              <>
                                <span>Front Side Image</span>
                              </>
                            }
                            valuenew={file?.front_image || data?.front_image}
                            edit={edit1}
                            onChange={(e) => {
                              setEdit1(false);
                              setFile({
                                ...file,
                                front_image: e.target.files[0],
                              });
                            }}
                            name="front_image"
                          />
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box className={styles.parentBox}>
                          <ImageUploader
                            label={
                              <>
                                <span>Back Side Image</span>
                              </>
                            }
                            valuenew={file?.back_image || data?.back_image}
                            edit={edit2}
                            onChange={(e) => {
                              setEdit2(false);
                              setFile({
                                ...file,
                                back_image: e.target.files[0],
                              });
                            }}
                            name="back_image"
                          />
                        </Box>
                      </Grid>
                    </Grid>

                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {" "}
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
