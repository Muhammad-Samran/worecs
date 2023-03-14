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

const CreateJob = () => {
  const dispatch = useDispatch();
  const company = useSelector((state) => state?.company);
  const editedCompany = useSelector((state) => state?.company?.editedCompany);

  const [edit1, setEdit1] = useState(
    editedCompany?.success === true ? true : false
  );
  const [edit2, setEdit2] = useState(
    editedCompany?.success === true ? true : false
  );

  const auth = useSelector((state) => state?.auth);
  const industry = useSelector((state) => state?.industry);
  const navigate = useNavigate();

  const salaryOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    {
      value: "C",
      label: "C",
    },
    {
      value: "D",
      label: "D",
    },
    {
      value: "F",
      label: "F",
    },
  ];
  const options = industry?.certificatesIndustries?.results?.map((e, i) => ({
    value: e?.id,
    label: e?.name,
  }));
  const options2 = industry?.industry_size?.results?.map((e, i) => ({
    value: e?.id,
    label: e?.text,
  }));

  const [imageSection, setImageSection] = useState({
    logo:
      editedCompany?.results?.logo !== null ? editedCompany?.results?.logo : "",
    background_cover: editedCompany?.results?.background_cover || "",
  });

  const [industryData, setIndustryData] = useState({
    industry_id:
      {
        value: editedCompany?.results?.industry.id,
        label: editedCompany?.results?.industry.name,
      } || "",
    company_size_id:
      {
        value: editedCompany?.results?.company_size.id,
        label: editedCompany?.results?.company_size.name,
      } || "",
  });
  const companyCreate = {
    name: editedCompany?.results?.name || "",
    description: editedCompany?.results?.description || "hello",
    abn_number: editedCompany?.results?.abn_number || "",
    website_url: editedCompany?.results?.website_url || "",
    address: editedCompany?.results?.address || "",
    short_description: editedCompany?.results?.short_description || "hello",
    facebook: editedCompany?.results?.facebook || "",
    youtube: editedCompany?.results?.youtube || "",
    linkedin: editedCompany?.results?.linkedin || "",
    instagram: editedCompany?.results?.instagram || "",
    twitter: editedCompany?.results?.twitter || "",
  };

  const companyCreateValidation = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  const onSubmit = async (values) => {
    if (auth?.results?.workspace_type !== "recruitment") {
      return;
    }
    const local_data = {
      ...values,
      email: auth?.results?.email,
      workspace_id: auth.results?.workspace_id.toString(),
      contact_number: auth.results?.contact_number,
      logo: edit1 ? "" : imageSection?.logo,
      background_cover: edit1 ? "" : imageSection?.logo,
      // logo: URL?.createObjectURL(imageSection?.logo),
      // background_cover: URL?.createObjectURL(imageSection?.background_cover),
      industry_id: industryData?.industry_id?.value,
      company_size_id: industryData?.company_size_id?.value,
      recruiter_id: auth?.results?.recruiter_id,
    };

    editedCompany.success === true
      ? dispatch(
          updateCompany({
            ...local_data,
            uuid: company.allCompany.results.uuid,
          })
        )
      : dispatch(createCompany(local_data));

    // email: "",
    // workspace_id: "",
    //  contact_number: "",
  };
  useEffect(() => {
    if (company?.createdCompany && company.createdCompany.success === true) {
      // dispatch(ShowAlert("Company Created ", "success"));
      dispatch(resetCompany());
      navigate(routes.JOBS);
    }
  }, [dispatch, company?.createdCompany]);

  return (
    <>
      <Box>
        <Box className={styles.parent}>
          <Box className={styles.head}>
            <Typography variant="h4">Company</Typography>
          </Box>
          <Box className={styles.buttonWrapper}></Box>

          <Box className={styles.form}>
            <>
              <Typography variant="h6">Company Information</Typography>

              <Formik
                initialValues={companyCreate}
                validationSchema={companyCreateValidation}
                onSubmit={onSubmit}
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
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="name"
                            compolsory={true}
                            label="Company Name"
                            onChange={handleChange}
                            value={values.name}
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="abn_number"
                            compolsory={true}
                            label="ABN Number"
                            onChange={handleChange}
                            value={values.abn_number}
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            compolsory={true}
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="website_url"
                            onChange={handleChange}
                            label="Company Website"
                            value={values.website_url}
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <CustomSelect
                            isDisabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            options={options}
                            customClass={`${styles.createJobSelect} createJob`}
                            label={
                              <>
                                <span>
                                  Industry
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
                            value={industryData?.industry_id}
                            onFocus={() => {
                              dispatch(getAllCertificatesIndustry());
                            }}
                            onChange={(e) =>
                              setIndustryData({
                                ...industryData,
                                industry_id: e,
                              })
                            }
                            placeholder="  "
                          />
                          {/* <TextInput
                 placeholder={""}
                 type="text"
                 onChange={handleChange}
                 name="industry_id"
                 label="Company Industry"
                 value={values.industry_id}
                 customClass={styles.createJobInp}
               /> */}
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <CustomSelect
                            isDisabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            options={options2}
                            customClass={`${styles.createJobSelect} createJob`}
                            label={
                              <>
                                <span>
                                  Company Size
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
                            placeholder="  "
                            value={industryData?.company_size_id}
                            onChange={(e) =>
                              setIndustryData({
                                ...industryData,
                                company_size_id: e,
                              })
                            }
                            onFocus={() => {
                              dispatch(getIndusTrySize());
                            }}
                          />
                          {/* <TextInput
                 placeholder={""}
                 type="text"
                 name="company_size_id"
                 onChange={handleChange}
                 label="Company Size"
                 value={values.company_size_id}
                 customClass={styles.createJobInp}
               /> */}
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="twitter"
                            onChange={handleChange}
                            value={values.twitter}
                            label="Twitter Profile"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="linkedin"
                            onChange={handleChange}
                            value={values.linkedin}
                            label="Linkedin Profile"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="instagram"
                            onChange={handleChange}
                            value={values.instagram}
                            label="Instagram Profile"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="facebook"
                            value={values.facebook}
                            onChange={handleChange}
                            label="Facebook  Profile"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            placeholder={""}
                            type="text"
                            name="youtube"
                            value={values.youtube}
                            onChange={handleChange}
                            label="Youtube  Profile"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <ImageUploader
                            label={
                              <>
                                <span>Company Cover </span>
                              </>
                            }
                            edit={edit2}
                            valuenew={imageSection.background_cover}
                            onChange={(event) => {
                              setEdit2(false);
                              setImageSection({
                                ...imageSection,
                                background_cover: event.target.files[0],
                              });
                            }}
                            name="background_cover"
                          />
                        </Box>
                      </Grid> */}
                      <Grid item xs={12} lg={6}>
                        <Box className={styles.parentBox}>
                          <ImageUploader
                            label={
                              <>
                                <span>
                                  Company Logo
                                  <span
                                    style={{
                                      color: "red",
                                      marginLeft: "3px",
                                    }}
                                  ></span>
                                </span>
                              </>
                            }
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            valuenew={imageSection.logo}
                            value={values.logo}
                            edit={edit1}
                            onChange={(event) => {
                              setEdit1(false);
                              setImageSection({
                                ...imageSection,
                                logo: event.target.files[0],
                              });
                            }}
                            name="logo"
                          />
                        </Box>
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Box className={styles.parentBox}>
                          <TextInput
                          disabled={auth?.results?.workspace_type !== 'recruitment'}
                            textarea
                            rows="5"
                            placeholder={""}
                            onChange={handleChange}
                            type="text"
                            name="description"
                            value={values.description}
                            label="Company short description"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box className={styles.parentBox}>
                          <TextInput
                          disabled={auth?.results?.workspace_type !== 'recruitment'}
                            textarea
                            rows="5"
                            placeholder={""}
                            type="text"
                            name="short_description"
                            value={values.short_description}
                            onChange={handleChange}
                            label="Short description"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid> */}
                      <Grid item xs={12}>
                        <Box className={styles.parentBox}>
                          <TextInput
                            disabled={
                              auth?.results?.workspace_type !== "recruitment"
                            }
                            compolsory={true}
                            textarea
                            rows="5"
                            placeholder={""}
                            type="text"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            label="Address"
                            customClass={styles.createJobInp}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    {auth?.results?.workspace_type === "recruitment" && (
                      <Box className={`button-primary ${styles.button}`}>
                        <Button
                          onClick={handleSubmit}
                          disabled={company?.loading}
                        >
                          {company?.loading ? (
                            <CircularProgress style={{ color: "white" }} />
                          ) : (
                            <>
                              {editedCompany.success === true ? (
                                <>
                                  <AiOutlinePlus /> Update
                                </>
                              ) : (
                                <>
                                  <AiOutlinePlus /> Save
                                </>
                              )}
                            </>
                          )}
                        </Button>
                      </Box>
                    )}
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
