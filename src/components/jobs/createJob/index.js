import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";
import SwitchIOS from "../../common/Switch";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { ReactComponent as ReturnIcon } from "../../../assets/jobs/returnArrow.svg";
import TextInput from "../../common/TextInput";
import { AiOutlinePlus } from "react-icons/ai";
import { ReactComponent as Edit } from "../../../assets/candidates/edit.svg";
import CustomSelect from "../../common/Select";
import SalarySelect from "../../common/SalarySelect";
import ImageUploader from "../../common/ImageUploader";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ImageSection from "../../login/ImageSection";
import { ShowAlert } from "../../../store/actions/alertActions";
import {
  getAllCertificatesIndustry,
  getIndusTrySize,
} from "../../../store/actions/industryActions";
import {
  createCompany,
  isCompanyExisit,
  resetCompany,
  updateCompany,
} from "../../../store/actions/companyActions";
import {
  createjob,
  jobCateFunc,
  jobExpFunc,
  jobSalaryFunc,
  jobTypeFunc,
  resetJob,
  updateJobFunc,
} from "../../../store/actions/recruiterJobsActions";
import { REGEX } from "../../../customHooks/utils";
import ReactInputMask from "react-input-mask";

const CreateJob = () => {
  const dispatch = useDispatch();
  const company = useSelector((state) => state?.company);
  const jobsRecruiter = useSelector((state) => state?.rjobs);
  const auth = useSelector((state) => state?.auth);
  const [customLoading, setCustomLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (company?.existCompany) {
      if (company?.existCompany?.success === false) {
        navigate(routes.COMPANY);
      }
    }
  }, [company?.existCompany, navigate]);

  //  create job

  const initialValues = {
    address: jobsRecruiter?.editedJob?.results?.address || "",
    job_title: jobsRecruiter?.editedJob?.results?.job_title || "",
    // job_contact_email: "",
    // job_contact_number: "",
    job_description: jobsRecruiter?.editedJob?.results?.job_description || "",
    min_salary: jobsRecruiter?.editedJob?.results?.min_salary || "",
  };
  const [jobSelectValues, setJobSelectValues] = useState({
    job_type_id:
      {
        value: jobsRecruiter?.editedJob?.results?.job_type?.id,
        label: jobsRecruiter?.editedJob?.results?.job_type?.name,
      } || "",
    job_salary_type_id:
      {
        value: jobsRecruiter?.editedJob?.results?.job_salary_type?.id,
        label: jobsRecruiter?.editedJob?.results?.job_salary_type?.name,
      } || "",
    employment_type_id:
      {
        value: jobsRecruiter?.editedJob?.results?.employment_type?.id,
        label: jobsRecruiter?.editedJob?.results?.employment_type?.name,
      } || "",
    job_experience_id:
      {
        value: jobsRecruiter?.editedJob?.results?.job_experience?.id,
        label: jobsRecruiter?.editedJob?.results?.job_experience?.name,
      } || "1",
    job_category_id:
      {
        value: jobsRecruiter?.editedJob?.results?.job_category?.id,
        label: jobsRecruiter?.editedJob?.results?.job_category?.name,
      } || "",
  });
  useEffect(() => {
    if (!jobsRecruiter?.editedJob?.results) {
      setJobSelectValues({
        ...jobSelectValues,
        job_category_id: {
          value: auth?.results?.company_detail?.industry?.id,
          label: auth?.results?.company_detail?.industry?.name,
        },
      });
    }
  }, []);
  console.log(jobSelectValues);
  const jobCreateValidation = Yup.object().shape({
    job_title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    // job_type_id: Yup.string().required("Required"),
    // job_salary_type_id: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    // job_contact_email: Yup.string()

    //   .required("Required")
    //   .email("Enter the valid Email"),
    // job_contact_number: Yup.string().required("Required"),

    job_description: Yup.string()
      .required("Required")

      .max(300, "Too Long!"),
    min_salary: Yup.string().required("Required"),
  });

  // API FOR SELECT JOB
  const jobSalaryOptions = jobsRecruiter?.jobSalary?.results?.map((e, i) => ({
    value: e?.id,
    label: e?.text,
  }));
  const jobCataOptions = jobsRecruiter?.jobCata?.results?.map((e, i) => ({
    value: e?.id,
    label: e?.text,
  }));
  const jobExpOptions = jobsRecruiter?.jobExp?.results?.map((e, i) => ({
    value: e?.id,
    label: e?.text,
  }));
  const jobTypeOptions = jobsRecruiter?.jobType?.results?.map((e, i) => ({
    value: e?.id,
    label: e?.text,
  }));

  const onSubmitJob = async (values, { restForm }) => {
    setCustomLoading(true);
    const local_data = {
      ...values,
      min_salary: values?.min_salary?.toString(),
      job_type_id: jobSelectValues.job_type_id.value.toString(),
      job_salary_type_id: jobSelectValues.job_salary_type_id.value.toString(),
      employment_type_id: "1",
      job_experience_id: jobSelectValues.job_experience_id.value.toString(),
      job_category_id: jobSelectValues?.job_category_id?.value.toString(),
      workspace_id: auth?.results?.workspace_id.toString(),
      recruiter_id: auth?.results?.recruiter_id,
      company_detail_id: company?.existCompany?.results?.company_detail_id,
      job_contact_number: auth?.results?.contact_number,
      job_contact_email: auth?.results?.email,
      currency_id: "14",
    };
    {
      jobsRecruiter?.editedJob.success
        ? dispatch(
            updateJobFunc({
              ...local_data,
              uuid: jobsRecruiter?.editedJob?.results?.uuid,
            })
          )
        : dispatch(createjob(local_data));
    }

    // workspace_id
    //   recruiter_id: "",
    // company_detail_id: "",
  };
  useEffect(() => {
    if (
      jobsRecruiter?.createdJob &&
      jobsRecruiter?.createdJob?.success === true
    ) {
      // dispatch(ShowAlert("Job Created ", "success"));
      dispatch(resetJob());
      navigate(routes.JOBS);
    }
  }, [dispatch, jobsRecruiter?.createdJob]);
  useEffect(() => {
    if (
      jobsRecruiter?.updateJob &&
      jobsRecruiter?.updateJob?.success === true
    ) {
      // dispatch(ShowAlert("Job Created ", "success"));
      dispatch(resetJob());
      navigate(routes.JOBS);
    }
  }, [dispatch, jobsRecruiter?.updateJob]);

  return (
    <>
      <Box>
        <Box className={styles.parent}>
          <Box className={styles.head}>
            <Typography variant="h4">Jobs</Typography>
          </Box>
          <Box className={styles.buttonWrapper}>
            <Box className={styles.return}>
              <Link to={routes.JOBS}>
                <ReturnIcon /> Return To Jobs
              </Link>
            </Box>
            <Box className={`button-primary ${styles.button}`}>
              {/* <SwitchIOS /> */}
            </Box>
          </Box>

          <Box className={styles.form}>
            <>
              <Box className={styles.job}>
                <Typography variant="h6">Job Information</Typography>
                {/* <Edit /> */}
              </Box>

              <Formik
                initialValues={initialValues}
                validationSchema={jobCreateValidation}
                onSubmit={onSubmitJob}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} columnSpacing={15}>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            autoComplete="off"
                            compolsory={true}
                            placeholder={""}
                            type="text"
                            name="job_title"
                            value={values.job_title}
                            onChange={handleChange}
                            label="Job Title"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <CustomSelect
                          options={jobSalaryOptions}
                          customClass={`${styles.createJobSelect} createJob`}
                          value={jobSelectValues.job_salary_type_id}
                          label={
                            <>
                              <span>
                                Salary Frequency
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: "3px",
                                  }}
                                >
                                  *
                                </span>
                              </span>
                            </>
                          }
                          onFocus={() => {
                            dispatch(jobSalaryFunc());
                          }}
                          onChange={(e) =>
                            setJobSelectValues({
                              ...jobSelectValues,
                              job_salary_type_id: e,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            autoComplete="off"
                            compolsory={true}
                            placeholder={""}
                            type="number"
                            min="0"
                            onKeyPress={(e) => {
                              if (
                                e.code === "Minus" ||
                                e.code === "NumpadSubtract" ||
                                e.code === "Comma" ||
                                e.code === "NumpadAdd" ||
                                e.code === "Period" ||
                                e.key === "e" ||
                                e.key === "E"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            name="min_salary"
                            value={values.min_salary}
                            onChange={handleChange}
                            label="Salary"
                            customClass={`${styles.createJobInp} ${styles.addDollar}`}
                          />
                        </Box>

                        {/* <label>
                          Salary <span style={{ color: "red" }}>*</span>
                        </label> */}
                        {/* <ReactInputMask
                            blocks={}
                            blocks={{
                              num: {
                                // nested masks are available!
                                mask: Number,
                                thousandsSeparator: " ",
                              },
                            }}
                            mask={"$999999999999"}
                            maskChar=" "
                            name="min_salary"
                            value={values.min_salary}
                            onChange={handleChange}
                            className={`${styles.createJobInp} ${styles.input3}`}
                          /> */}
                        {/* {Customerror?.min_salary && (
                            <p className="error-class position-absolute">
                              {Customerror?.min_salary}
                            </p>
                          )} */}
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <CustomSelect
                          options={jobCataOptions}
                          customClass={`${styles.createJobSelect} createJob`}
                          value={jobSelectValues.job_category_id}
                          label={
                            <>
                              <span>
                                Job Category
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: "3px",
                                  }}
                                >
                                  *
                                </span>
                              </span>
                            </>
                          }
                          onFocus={() => {
                            dispatch(jobCateFunc());
                          }}
                          onChange={(e) =>
                            setJobSelectValues({
                              ...jobSelectValues,
                              job_category_id: e,
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <CustomSelect
                            options={jobTypeOptions}
                            customClass={`${styles.createJobSelect} createJob`}
                            value={jobSelectValues.job_type_id}
                            label={
                              <>
                                <span>
                                  Job Type
                                  <span
                                    style={{
                                      color: "red",
                                      marginLeft: "3px",
                                    }}
                                  >
                                    *
                                  </span>
                                </span>
                              </>
                            }
                            onFocus={() => {
                              dispatch(jobTypeFunc());
                            }}
                            onChange={(e) =>
                              setJobSelectValues({
                                ...jobSelectValues,
                                job_type_id: e,
                              })
                            }
                          />
                          {/* <TextInput
                          compolsory={true}
                    placeholder={""}
                    type="text"
                    name="jobtype"
                    label="Job Type"
                    customClass={styles.createJobInp}
                  /> */}
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <CustomSelect
                            options={jobExpOptions}
                            customClass={`${styles.createJobSelect} createJob`}
                            value={jobSelectValues.job_experience_id}
                            label={
                              <>
                                <span>
                                  Job Experience
                                  <span
                                    style={{
                                      color: "red",
                                      marginLeft: "3px",
                                    }}
                                  >
                                    *
                                  </span>
                                </span>
                              </>
                            }
                            onFocus={() => {
                              dispatch(jobExpFunc());
                            }}
                            onChange={(e) =>
                              setJobSelectValues({
                                ...jobSelectValues,
                                job_experience_id: e,
                              })
                            }
                          />
                          {/* <TextInput
                          compolsory={true}
                    placeholder={""}
                    type="text"
                    name="jobtype"
                    label="Job Type"
                    customClass={styles.createJobInp}
                  /> */}
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            autoComplete="off"
                            compolsory={true}
                            placeholder={""}
                            type="text"
                            name="address"
                            onChange={handleChange}
                            value={values.address}
                            label="Job Location"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12} lg={6}>
                      <Box className={styles.parentBox}>
                        <TextInput
                        autoComplete='off'
                        compolsory={true}
                          placeholder={""}
                          type="email"
                          name="job_contact_email"
                          value={values.job_contact_email}
                          onChange={handleChange}
                          label="Email"
                          customClass={styles.createJobInp}
                        />
                      </Box>
                    </Grid> */}
                      {/* <Grid item xs={12} lg={6}>
                      <Box className={styles.parentBox}>
                        <TextInput
                        autoComplete='off'
                        compolsory={true}
                          placeholder={""}
                          type="number"
                          onChange={handleChange}
                          name="joblocation"
                          label="Contact Number"
                          customClass={styles.createJobInp}
                        />
                      </Box>
                    </Grid> */}

                      <Grid item xs={12}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            autoComplete="off"
                            compolsory={true}
                            textarea
                            rows="2"
                            placeholder={""}
                            type="text"
                            name="job_description"
                            onChange={handleChange}
                            value={values.job_description}
                            label="Job Description"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Box className={`button-primary ${styles.button}`}>
                      <Button
                        onClick={handleSubmit}
                        disabled={jobsRecruiter?.loading}
                      >
                        {customLoading && jobsRecruiter?.loading ? (
                          <CircularProgress style={{ color: "white" }} />
                        ) : (
                          <>
                            {jobsRecruiter?.editedJob.success ? (
                              <>
                                {" "}
                                <AiOutlinePlus /> Update
                              </>
                            ) : (
                              <>
                                {" "}
                                <AiOutlinePlus /> Create
                              </>
                            )}
                          </>
                        )}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateJob;
