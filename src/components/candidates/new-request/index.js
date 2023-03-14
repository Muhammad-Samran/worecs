import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Checkbox from "../../common/checkbox";
import PhoneFeild from "../../common/phoneFeild";
import CustomSelect from "../../common/Select";
import TextInput from "../../common/TextInput";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  createCandidateFunc,
  existCreateCandidateFunc,
  getAllRecruiterCreatedIndustry,
  getExisitingCandidateFunc,
  resetCandidate,
} from "../../../store/actions/recruiterCandidateActions";
import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { display } from "@mui/system";
import { REGEX } from "../../../customHooks/utils";

const NewRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const candidate = useSelector((state) => state?.rcandidate);
  const auth = useSelector((state) => state?.auth);
  const [checkbox1, SetCheckbox1] = useState(true);
  const [checkbox2, SetCheckbox2] = useState(false);
  const options = [
    { value: "Real Estate", label: "Real Estate" },
    { value: "Hospitality", label: "Hospitality" },
    {
      value: "Gig Economy",
      label: "Gig Economy",
    },
    {
      value: "Healthcare",
      label: "Healthcare",
    },
    {
      value: "Recruitment",
      label: "Recruitment",
    },
  ];
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    job_title: "",
    company_name: "",
    no_references: "",
  };
  const initialValues2 = {
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    job_title: "",
    company_name: "",
    no_references: "",
  };
  const [dropdown, setDropdown] = useState({
    createdIndustry: [],
    createdIndustry2: [],
    email: "",
    reff: "",

    recruitment_industries: {},
  });
  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "createdIndustry":
          if (value.length === 0 || value.toString() === "")
            if (checkbox2) newError[key] = "Field is Required";
          break;
        // case "createdIndustry2":
        //   if (value.length === 0 || value.toString() === "")
        //     if (!checkbox2) newError[key] = "fields is Required";
        //   break;
        case "email":
          if (!value || value.toString() === "") {
            if (!checkbox2) newError[key] = "Field is Required";
          }
          break;
        // case "reff":
        //   if (!value || value.toString() === "") {
        //     if (!checkbox2) newError[key] = "fields is Required";
        //   } else if ((value) => 5) {
        //     newError[key] = "Value shoudld be less then 5";
        //   }
        default:
      }
    }
    return newError;
  };

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    job_title: Yup.string().required("Required"),
    company_name: Yup.string().required("Required"),
    no_references: Yup.number()
      .required("Required")
      .max(5, "Value should be less then 5"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    contact_number: Yup.string()
      .required("Phone Required")
      .min(11, "Phone Should be more then 11 digits"),
  });
  const SignupSchema2 = Yup.object().shape({});

  const getExisitCandi = candidate?.getExisitingCandidate?.results?.map(
    (data) => ({
      label: data?.text,
      value: data?.id,
    })
  );

  const optionsCreateIndustry =
    candidate?.createdIndustry?.results?.map((parent) => ({
      label: parent?.name,
      options: parent?.industry_certification_license?.map((e) => {
        return { label: e?.name, value: e.id, parent: parent.id };
      }),
    })) || [];
  const [country_code, setCountryCode] = useState("");

  const onSubmit = async (values) => {
    // const validateSelect = validate(dropdown);

    // if (Object?.keys(validateSelect)?.length > 0) {
    //   setErrors(validateSelect);

    //   return;
    // }
    let objectCreate = {};
    let recruitment_industries = dropdown?.createdIndustry?.map((e, index) => {
      return (objectCreate[`recruitment_industry_${index}`] = {
        rec_ind_request_id: e.parent,
        ind_cert_lic_request_id: e.value,
      });
    });

    const local_data = {
      ...values,
      // recruitment_industries: objectCreate,
      type: "candidate",
      invitation_type: "new_candidate",
      terms: "candidate",
      invitation: "candidate",
      // contact_number: "+61412345671",
      country_code: country_code.trim() === "" ? "AU" : country_code,
      field_country: country_code.trim() === "" ? "AU" : country_code,
      workspace_id: auth?.results?.workspace_id,
    };

    dispatch(createCandidateFunc(local_data));
  };
  useEffect(() => {
    if (candidate?.createdCandidate?.success === true) {
      dispatch(resetCandidate());
      navigate(routes.ALL_CANDIDATES);
    }
  }, [dispatch, navigate, candidate?.createdCandidate]);

  useEffect(() => {
    if (candidate?.alreadyCreatedCandidate?.success === true) {
      dispatch(resetCandidate());
      navigate(routes.ALL_CANDIDATES);
    }
  }, [dispatch, navigate, candidate?.alreadyCreatedCandidate]);

  useEffect(() => {
    setErrors({
      createdIndustry: "",
      createdIndustry2: "",
      email: "",
      reff: "",
    });
  }, [checkbox1]);
  const onSubmit2 = async (values) => {
    const validateSelect = validate(dropdown);
    if (Object?.keys(validateSelect)?.length > 0) {
      setErrors(validateSelect);

      return;
    }

    let objectCreate = {};
    let recruitment_industries = dropdown?.createdIndustry2?.map((e, index) => {
      return (objectCreate[`recruitment_industry_${index}`] = {
        rec_ind_request_id: e?.parent,
        ind_cert_lic_request_id: e?.value,
      });
    });

    const local_data = {
      email: dropdown?.email?.label,
      no_references: dropdown?.reff,
      // recruitment_industries: objectCreate,
      invitation_type: "new_candidate",
      terms: "candidate",
      invitation: "candidate",
      workspace_id: auth?.results?.workspace_id,
      type: "candidate",
      user_type: "candidate",
      invitation_type: "exist_candidate",
    };
    dispatch(existCreateCandidateFunc(local_data));

    // dispatch(createCandidateFunc(local_data));
  };

  // const verifyEmail = async (value) => {
  //   if (value.toString().trim() === "") return;
  //   const body = JSON.stringify({ email: value });
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   };
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/checkemail`,
  //     body,
  //     config
  //   );
  //   const result = await response.data;

  //   if (result.msg === "true") {
  //     setError({ ...customError, email: "true", taken: true });
  //   } else {
  //     setError({ ...customError, email: "false", taken: false });
  //   }
  // };

  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">New Request</Typography>
        <Typography>
          Easier, Faster, Better. Send a job request to a candidate.
        </Typography>
      </Box>
      <Box className={styles.contentBox}>
        <Box className={styles.contentHead}>
          <Typography variant="h5">What would you like to do?</Typography>
          <Box>
            <Checkbox
              text="Send request to an existing candidate"
              click={checkbox1}
              setClick={SetCheckbox1}
              click2={checkbox2}
              setClick2={SetCheckbox2}
            />
            <Box className={styles.inputBox}>
              <Typography>
                This candidate is registered with Worecs & has their Worecs ID.
              </Typography>
            </Box>

            {/* <Box className={styles.inputBox}>
              <Typography>
                This candidate is registered with Worecs & has their Worecs ID.
                <TextInput
                compolsory={true}
                 
                  type={"email"}
                  name="email"
                  placeholder={"Email Address"}
                  customClass={styles.input}
                />
              </Typography>
              {checkbox1 && (
                <Box className={`button-primary ${styles.button}`}>
                  <Button>Send Invite</Button>
                </Box>
              )}
            </Box> */}
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            <Checkbox
              text="Send request to new candidate"
              click={checkbox2}
              setClick={SetCheckbox2}
              click2={checkbox1}
              setClick2={SetCheckbox1}
            />
            <Box className={styles.inputBox}>
              <Typography>
                This candidate is not registered with Worecs & has not provided
                their Worecs ID.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {!checkbox2 && (
        <Box className={styles.formsSection}>
          <Typography variant="h5">
            Enter the existing candidate here
          </Typography>
          <Box className={styles.gridBox}>
            <Formik
              initialValues={initialValues2}
              validationSchema={SignupSchema2}
              onSubmit={onSubmit2}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <form>
                  <Grid container spacing={2}>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <CustomSelect
                          options={getExisitCandi}
                          customClass={styles.select}
                          name="email"
                          label={
                            <>
                              Email
                              <span
                                style={{
                                  color: "red",
                                  marginLeft: "3px",
                                  position: "relative",
                                  display: "initial",
                                }}
                              >
                                *
                              </span>
                            </>
                          }
                          components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                          }}
                          onFocus={() => {
                            dispatch(
                              getExisitingCandidateFunc({
                                request_type: "getcandidate",
                              })
                            );
                          }}
                          onChange={(e) => {
                            setDropdown({
                              ...dropdown,
                              email: e,
                            });
                            if (Customerror.hasOwnProperty("email")) {
                              delete Customerror["email"];
                              setErrors(Customerror);
                            }
                          }}
                          placeholder={"Enter your email"}
                          value={dropdown.email}
                        />
                        {Customerror?.email && (
                          <span>{Customerror?.email}</span>
                        )}
                      </Box>
                    </Grid>

                    {/* <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          compolsory={true}
                          type={"number"}
onKeyPress={(e) => {
            if (type === "number") {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E" ||
                !REGEX.test(e.key)
              ) {
                e.preventDefault();
              }
            }
          }}
                          label="No. of References"
                          name="reff"
                          value={dropdown.reff}
                          onChange={(e) => {
                            setDropdown({
                              ...dropdown,
                              reff: e?.target.value,
                            });
                            if (Customerror.hasOwnProperty("reff")) {
                              delete Customerror["reff"];
                              setErrors(Customerror);
                            }
                          }}
                          customClass={styles.input2}
                        />
                        {Customerror?.reff && <span>{Customerror?.reff}</span>}
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <CustomSelect
                          options={optionsCreateIndustry || []}
                          customClass={styles.select}
                          label={
                            <>
                              Select Industries
                              <span
                                style={{
                                  color: "red",
                                  marginLeft: "3px",
                                  position: "relative",
                                  display: "initial",
                                }}
                              >
                                *
                              </span>
                            </>
                          }
                          isMulti
                          onFocus={() => {
                            dispatch(
                              getAllRecruiterCreatedIndustry({
                                workspace_id:
                                  auth?.results?.workspace_id?.toString(),
                                recruiter_id:
                                  auth?.results?.recruiter_id.toString(),
                              })
                            );
                          }}
                          onChange={(e, action) => {
                            if (action.action === "remove-value") {
                              let a = dropdown?.createdIndustry2?.filter(
                                (e) => e?.value !== action?.removedValue?.value
                              );
                              return setDropdown({
                                ...dropdown,
                                createdIndustry2: a,
                              });
                            }
                            e?.map((el, i) => {
                              setDropdown({
                                ...dropdown,
                                createdIndustry2: [
                                  ...dropdown.createdIndustry2,
                                  el,
                                ],
                              });
                            });
                            if (
                              Customerror.hasOwnProperty("createdIndustry2")
                            ) {
                              delete Customerror["createdIndustry2"];
                              setErrors(Customerror);
                            }
                          }}
                          defaultValue={"Select"}
                          value={
                            dropdown?.createdIndustry2?.map((e) => {
                              return {
                                label: e.name || e?.label || "",
                                value: e.id || e?.value || "",
                              };
                            }) || "Select"
                          }
                        />
                        {Customerror?.createdIndustry2 && (
                          <span>{Customerror?.createdIndustry2}</span>
                        )}
                      </Box>
                    </Grid> */}

                    {/* <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <CustomSelect
                        options={options}
                        customClass={styles.select}
                        label=" Licences and Certifications"
                        isMulti
                        onChange={(e) => {
                          setDropdown({
                            ...dropdown,
                            createdCertificates: [...e],
                          });
                        }}
                        value={dropdown?.createdCertificates?.map((e) => {
                          return {
                            label: e.name || e?.label,
                            value: e.id || e?.value,
                          };
                        })}
                      />
                    </Grid> */}
                  </Grid>
                  <Box className={`button-primary ${styles.button}`}>
                    <Button
                      onClick={handleSubmit}
                      disabled={candidate?.loading}
                    >
                      {candidate?.loading ? (
                        <CircularProgress style={{ color: "black" }} />
                      ) : (
                        "Send Invite"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      )}

      {checkbox2 && (
        <Box className={styles.formsSection}>
          <Typography variant="h5">Enter information here</Typography>
          <Box className={styles.gridBox}>
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <form>
                  <Grid container spacing={2}>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          compolsory={true}
                          type={"text"}
                          label="First Name"
                          name="first_name"
                          value={values.first_name}
                          onChange={handleChange}
                          customClass={styles.input2}
                        />
                        <span>
                          {" "}
                          {errors.first_name &&
                            touched.first_name &&
                            errors.first_name}
                        </span>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          compolsory={true}
                          type={"text"}
                          label="Last Name"
                          name="last_name"
                          value={values.last_name}
                          onChange={handleChange}
                          customClass={styles.input2}
                        />
                        <span>
                          {" "}
                          {errors.last_name &&
                            touched.last_name &&
                            errors.last_name}
                        </span>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          compolsory={true}
                          type={"email"}
                          label="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          customClass={styles.input2}
                        />
                        <span>
                          {" "}
                          {errors.email && touched.email && errors.email}
                        </span>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      {" "}
                      <Box className={styles.parentInput}>
                        <PhoneFeild
                          customClass={styles.input}
                          name="contact_number"
                          type="tel"
                          placeholder={"+614 234 678"}
                          label="Contact Number"
                          country="AU"
                          onCountryChange={(e) => setCountryCode(e)}
                          value={values.contact_number}
                          onChange={(e) => {
                            handleChange(e);
                            // setData({
                            //   ...data,
                            //   ...values,
                            // });
                          }}
                          // onBlur={handleBlur}
                        />
                        <span>
                          {" "}
                          {errors.contact_number &&
                            touched.contact_number &&
                            errors.contact_number}
                        </span>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          compolsory={true}
                          type={"text"}
                          label="Employer Organization"
                          name="company_name"
                          value={values.company_name}
                          onChange={handleChange}
                          customClass={styles.input2}
                        />
                        <span>
                          {" "}
                          {errors.company_name &&
                            touched.company_name &&
                            errors.company_name}
                        </span>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          compolsory={true}
                          type={"text"}
                          label="Job Title"
                          name="job_title"
                          value={values.job_title}
                          onChange={handleChange}
                          customClass={styles.input2}
                        />
                        <span>
                          {" "}
                          {errors.job_title &&
                            touched.job_title &&
                            errors.job_title}
                        </span>
                      </Box>
                    </Grid>

                    <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <TextInput
                          compolsory={true}
                          type={"number"}
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
                          label="No. of References"
                          name="no_references"
                          value={values.no_references}
                          onChange={handleChange}
                          customClass={styles.input2}
                        />
                        <span>
                          {" "}
                          {errors.no_references &&
                            touched.no_references &&
                            errors.no_references}
                        </span>
                      </Box>
                    </Grid>
                    {/* <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <Box className={styles.parentInput}>
                        <CustomSelect
                          options={optionsCreateIndustry}
                          customClass={styles.select}
                          label={
                            <>
                              Certificates and licenses
                              <span
                                style={{
                                  color: "red",
                                  marginLeft: "3px",
                                  position: "relative",
                                  display: "initial",
                                }}
                              >
                                *
                              </span>
                            </>
                          }
                          isMulti
                          onFocus={() => {
                            dispatch(
                              getAllRecruiterCreatedIndustry({
                                workspace_id:
                                  auth?.results?.workspace_id?.toString(),
                                recruiter_id:
                                  auth?.results?.recruiter_id.toString(),
                              })
                            );
                          }}
                          onChange={(e, action) => {
                            if (action.action === "remove-value") {
                              let a = dropdown?.createdIndustry?.filter(
                                (e) => e?.value !== action?.removedValue?.value
                              );
                              return setDropdown({
                                ...dropdown,
                                createdIndustry: a,
                              });
                            }
                            e?.map((el, i) => {
                              setDropdown({
                                ...dropdown,
                                createdIndustry: [
                                  ...dropdown.createdIndustry,
                                  el,
                                ],
                              });
                            });
                            if (Customerror.hasOwnProperty("createdIndustry")) {
                              delete Customerror["createdIndustry"];
                              setErrors(Customerror);
                            }
                          }}
                          value={
                            dropdown?.createdIndustry?.map((e) => {
                              return {
                                label: e.name || e?.label,
                                value: e.id || e?.value,
                              };
                            }) || "Select"
                          }
                        />
                        {Customerror?.createdIndustry && (
                          <span>{Customerror?.createdIndustry}</span>
                        )}
                      </Box>
                    </Grid> */}

                    {/* <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                      <CustomSelect
                        options={options}
                        customClass={styles.select}
                        label=" Licences and Certifications"
                        isMulti
                        onChange={(e) => {
                          setDropdown({
                            ...dropdown,
                            createdCertificates: [...e],
                          });
                        }}
                        value={dropdown?.createdCertificates?.map((e) => {
                          return {
                            label: e.name || e?.label,
                            value: e.id || e?.value,
                          };
                        })}
                      />
                    </Grid> */}
                  </Grid>
                  <Box className={`button-primary ${styles.button}`}>
                    <Button
                      onClick={handleSubmit}
                      disabled={candidate?.loading}
                    >
                      {candidate?.loading ? (
                        <CircularProgress style={{ color: "white" }} />
                      ) : (
                        "Send Invite"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NewRequest;
