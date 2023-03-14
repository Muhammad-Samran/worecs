import React from "react";
import styles from "./styles.module.scss";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import TextInput from "../../common/TextInput";
import CustomSelect from "../../common/Select";
import { useState } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ContactUs = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const options2 = [
    { value: "Customer Support", label: "Customer Support" },
    { value: "Sales Support", label: "Sales Support" },
    { value: "Technical Support", label: "Technical Support" },
    { value: " Billing Support    ", label: " Billing Support    " },
    { value: "Feedback", label: "Feedback" },
  ];
  console.log("");
  const [values, setValues] = useState({
    name: `${auth?.results?.first_name} ${auth?.results?.last_name}`,
    subject: "",
    message: "",
  });
  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "subject":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is Required";
          break;
        // case "name":
        //   if (value.length === 0 || value.toString() === "")
        //     newError[key] = "fields is Required";
        //   break;
        case "message":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is Required";
          break;
        default:
      }
    }
    return newError;
  };
  const onChange = (e) => {
    const { name, value } = e?.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (Customerror.hasOwnProperty(name)) {
      delete Customerror[name];
      setErrors(Customerror);
    }
  };
  const submitData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const validateSelect = validate(values);

    if (Object?.keys(validateSelect)?.length > 0) {
      dispatch(ShowAlert("Please fill all fields", "error"));

      setErrors(validateSelect);
      setLoading(false);
      return;
    }
    const local_data = {
      ...values,
      subject: values?.subject?.value,
      email: auth?.results?.email,
      user_id: auth?.results?.recruiter_id,
    };
    try {
      const request = await axios.post(
        `${process.env.REACT_APP_API_URL}/contact-form`,
        local_data
      );
      const response = await request.data;
      if (response.success) {
        dispatch(ShowAlert("Form submited", "success"));
      } else {
        dispatch(ShowAlert("Error", "error"));
      }
      setValues({
        name: `${auth?.results?.first_name} ${auth?.results?.last_name}`,
        subject: "",
        message: "",
      });
      setLoading(false);
    } catch (e) {
      dispatch(ShowAlert("Error", "error"));

      setLoading(false);
      setValues({
        name: `${auth?.results?.first_name} ${auth?.results?.last_name}`,
        subject: "",
        message: "",
      });
    }
  };

  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">Help Desk</Typography>
      </Box>
      <Box className={styles.contactUs}>
        <Box className={styles.contactUsHeader}>
          <Typography variant="h5">Contact Us</Typography>
          <Typography>Our friendly team will love to hear from you!</Typography>
        </Box>
        <Box className={styles.contactUsContent}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={8}>
              <form onSubmit={(e) => submitData(e)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} lg={6}>
                    <TextInput
                      autoComplete={"off"}
                      type="text"
                      name="name"
                      label="Name"
                      disabled={true}
                      placeholder={`${auth?.results?.first_name} ${auth?.results?.last_name}`}
                      values={values?.name}
                      onChange={onChange}
                      customClass={styles.contactusInp}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CustomSelect
                      options={options2}
                      label={"Subject"}
                      name="subject"
                      values={values?.subject}
                      customClass={`${styles.select} jobSalaryy`}
                      onChange={(e) => {
                        setValues({ ...values, subject: e });
                        if (Customerror.hasOwnProperty("subject")) {
                          delete Customerror["subject"];
                          setErrors(Customerror);
                        }
                      }}
                    />
                    {/* <TextInput
                    autoComplete={'off'}
                  placeholder={""}
                  type="text"
                  name="subject"
                  label="Subject"
                  customClass={styles.contactusInp}
                /> */}
                  </Grid>
                  {/* <Grid item xs={12} lg={6} className={styles.lastInpGrid}>
                  <TextInput
                  autoComplete={'off'}
                    placeholder={""}
                    type="text"
                    name="subject"
                    label="Subject"
                    customClass={styles.contactusInp}
                  />
                </Grid> */}
                </Grid>
                {/* <Grid item xs={12}>
                <TextInput
                autoComplete={'off'}
                  placeholder={""}
                  type="text"
                  name="emailaddress"
                  label="Email Address"
                  customClass={styles.contactusInp}
                />
              </Grid> */}

                {/* <Grid item xs={12}>
                <TextInput
                autoComplete={'off'}
            placeholder={""}
                  type="text"
                  name="phonenumber"
                  label="Phone Number"
                  customClass={styles.contactusInp}
                />
              </Grid> */}
                <Grid item xs={12}>
                  <TextInput
                    placeholder={""}
                    type="text"
                    name="message"
                    value={values?.message}
                    onChange={onChange}
                    label="Message"
                    textarea
                    rows={4}
                    customClass={styles.contactusInp}
                  />
                </Grid>
                <Box className="button-primary">
                  <Button
                    onClick={(e) => submitData(e)}
                    className={styles.btnSend}
                  >
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "     Send Message"
                    )}
                  </Button>
                </Box>
              </form>
            </Grid>

            <Grid item xs={12} md={12} lg={4}>
              <Box className={styles.rightContent}>
                <Typography variant="h6">General questions</Typography>
                <Typography>
                  For general queries, including questions about the platform,
                  please email us at
                </Typography>
                <a href="mailto:support@worecs.com.au" target="_blank">
                  support@worecs.com.au
                </a>
              </Box>
              <Box className={styles.rightContent}>
                <Typography variant="h6">To schedule a demo</Typography>
                <Typography>
                  To schedule a demo of Worecs, please email us at
                </Typography>
                <a href="mailto:support@worecs.com.au" target="_blank">
                  support@worecs.com.au
                </a>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
