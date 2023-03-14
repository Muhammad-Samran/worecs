import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import { Button, Grid } from "@mui/material";
import moment from "moment/moment";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  addProfileLicense,
  recruitmentIndustry,
} from "../../../../../api/candidate/candidate.class";
import CustomSelect from "../../../../common/Select";
import ImageUploader from "../../../../common/ImageUploader";
import Alerts from "../../../../common/Alert";
import TextInput from "../../../../common/TextInput";

export default function CustomModal({
  openModal,
  setOpenModal,
  isAddition,
  userDetailData,
}) {
  const handleClose = () => setOpenModal(false);

  const auth = useSelector((state) => state?.auth?.results);

  const [recruitmentIndustries, setRecruitmentIndustries] = useState();

  const [recruitmentOptions, setRecruitmentOptions] = useState([]);
  const [CertLicenseOptions, setCertLicenseOptions] = useState([]);
  const [file, setFile] = useState({ front_image: "", back_image: "" });

  useEffect(() => {
    const API = async () => {
      try {
        const respone = await recruitmentIndustry();
        setRecruitmentIndustries(respone.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    API();
  }, []);

  useEffect(() => {
    if (recruitmentIndustries?.length > 0) {
      recruitmentIndustries.forEach((record, index) => {
        const data = [{ value: record.id, label: record.name, index: index }];
        setRecruitmentOptions((prev) => [...prev, ...data]);
      });
    }
    return () => {
      setRecruitmentOptions("");
    };
  }, [recruitmentIndustries]);

  const handleRecruitment = (setFieldValue, option, values) => {
    if (values.recruit_industry === "") {
      setFieldValue("recruit_industry", option);
    } else {
      setCertLicenseOptions([]);
      setFieldValue("recruit_industry", option);
    }

    if (
      (recruitmentOptions !== null || recruitmentOptions !== []) &&
      recruitmentIndustries?.length > 0
    ) {
      recruitmentIndustries[
        option.index
      ]?.industry_certification_license?.forEach((record, index) => {
        const data = [{ value: record.id, label: record.name, index: index }];
        setCertLicenseOptions((prev) => [...prev, ...data]);
      });
    }
  };

  const handleCertLicense = (setFieldValue, option) => {
    setFieldValue("industry_cert_license", option);
  };

  const initialValues = {
    recruit_industry: "",
    industry_cert_license: "",
    issue_date: "",
    expiry_date: "",
    doc_id: "",
  };

  const licenseSchema = Yup.object().shape({
    recruit_industry: Yup.object().required("Required"),
    industry_cert_license: Yup.object().required("Required"),
    issue_date: Yup.string().required("Required"),
    expiry_date: Yup.string().required("Required"),
    doc_id: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    try {
      const payload = {
        candidate_id: auth?.candidate_id,
        request_type: "candidate",
        document_number: values.doc_id,
        issue_date: moment(values.issue_date).format("DD-MM-yyyy"),
        expiry_date: moment(values.expiry_date).format("DD-MM-yyyy"),
        candidate_lic_cert_id: userDetailData?.id || "",
        "recruitment_industries[recruitment_industry_1][rec_ind_request_id]":
          values.recruit_industry?.value || "",
        "recruitment_industries[recruitment_industry_1][ind_cert_lic_request_id]":
          values.industry_cert_license?.value || "",
        "recruitment_industries[recruitment_industry_1][front_image]":
          file?.front_image,
        "recruitment_industries[recruitment_industry_1][back_image]":
          file?.back_image,
        "recruitment_industries[recruitment_industry_1][issue_date]":
          moment(values.issue_date).format("DD-MM-yyyy") || "",
        "recruitment_industries[recruitment_industry_1][expiry_date]":
          moment(values.expiry_date).format("DD-MM-yyyy") || "",
        "recruitment_industries[recruitment_industry_1][document_number]":
          values.doc_id || "",
      };

      const response = await addProfileLicense(payload);

      if (response.data.success) {
        handleClose();
        isAddition(true);
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
              Add Certificates and Licenses
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
                            onChange={(option) =>
                              handleRecruitment(setFieldValue, option, values)
                            }
                            value={values.recruit_industry}
                            options={recruitmentOptions}
                            sx={{ maxWidth: "initial" }}
                            label="Recruitment Industries"
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
                            onChange={(option) =>
                              handleCertLicense(setFieldValue, option, values)
                            }
                            value={values.industry_cert_license}
                            options={CertLicenseOptions}
                            sx={{ maxWidth: "initial" }}
                            label="Industry Certification License"
                          />
                          <span>
                            {errors.industry_cert_license &&
                              touched.industry_cert_license &&
                              errors.industry_cert_license}
                          </span>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <TextInput
                          style={{ width: "100%" }}
                          customClass={styles.input}
                          label="Document ID"
                          type="text"
                          name="doc_id"
                          // sx={{ mt: 5.6, pb: 1 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleChange}
                          value={values.doc_id}
                        />
                        <span>
                          {errors.doc_id && touched.doc_id && errors.doc_id}
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <TextInput
                          // customClass={styles.boxForm}
                          label="Issue Date"
                          type="date"
                          name="issue_date"
                          // sx={{ maxWidth: "initial" }}
                          onChange={handleChange}
                          value={values.issue_date}
                        />
                        <span>
                          {errors.issue_date &&
                            touched.issue_date &&
                            errors.issue_date}
                        </span>
                      </Grid>
                      <Grid item>
                        <TextInput
                          // customClass={styles.boxForm}
                          label="Expiry Date"
                          type="date"
                          name="expiry_date"
                          // sx={{ maxWidth: "initial" }}
                          onChange={handleChange}
                          value={values.expiry_date}
                        />
                        <span>
                          {errors.expiry_date &&
                            touched.expiry_date &&
                            errors.expiry_date}
                        </span>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={styles.parentBox}>
                          <ImageUploader
                            label={
                              <>
                                <span>Front Side Image</span>
                              </>
                            }
                            valuenew={file?.front_image}
                            onChange={(e) => {
                              // setFieldValue("front_image", e.target.files[0]);
                              setFile({
                                ...file,
                                front_image: e.target.files[0],
                              });
                            }}
                            name="front_image"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={styles.parentBox}>
                          <ImageUploader
                            label={
                              <>
                                <span>Back Side Image</span>
                              </>
                            }
                            valuenew={file?.back_image}
                            onChange={(e) => {
                              // setFieldValue("back_image", e.target.files[0]);
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
                      <Button type="submit">Save</Button>
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
