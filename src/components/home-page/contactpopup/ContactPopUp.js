import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Navbar from "../navbar/Navbar";
import TextInput from "../../common/TextInput";
import styles from "./styles.module.scss";
import moment from "moment";
import { ValidateEmail } from "../../../customHooks/utils";
import ReactDatePicker from "react-datepicker";
import TimeRange from "react-time-range";
import authHeader from "../../../api/authToken";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";
import PhoneInput from "react-phone-number-input";

import PhoneFeild2 from "../../common/phoneFeild/index2";

export default function ContactPopUp(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [country_code, setCountryCode] = useState("");

  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    contact_number: "",
    time: moment(),
    time2: moment(),
    message: "",
  });

  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "first_name":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          break;
        case "last_name":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          break;
        case "email":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          else if (!ValidateEmail(value)) {
            newError[key] = "Email is not correct pattern";
          }
          break;
        case "message":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          break;
        case "time":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
        case "time2":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
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
  const dispatch = useDispatch();

  const submitData = async (e) => {
    setLoading(true);
    e.preventDefault();
    const validateValues = validate(values);
    if (Object.keys(validateValues).length > 0) {
      setLoading(false);
      return dispatch(ShowAlert("Please enter data correctly ", "error"));
    }
    const local_data = {
      ...values,
      start_time: values?.time,
      end_time: values?.time2,
      date: startDate,
      country_code: country_code.trim() === "" ? "AU" : country_code,
    };
    // const data = JSON.stringify(local_data);
    const request = await axios.post(
      `${process.env.REACT_APP_API_URL}/request-demo`,
      local_data,
      { headers: authHeader() }
    );
    const results = await request.data;
    if (results?.success) {
      props.setOpen(false);
      setLoading(false);
      dispatch(ShowAlert("Form has been sent ", "error"));
    } else {
      dispatch(ShowAlert("Something went wrong ", "error"));
    }
    setLoading(false);
  };

  return (
    <div>
      <Box className="d-flex justify-content-center">
        <Box className={styles.parent} marginTop={8} marginBottom={5}>
          <Box className={styles.header}>
            <Typography variant="h4">Schedule Demo </Typography>
          </Box>
          <Box className={styles.contactUs}>
            <Box className={styles.contactUsHeader}>
              <Typography variant="h5">Contact Us</Typography>
              <Typography>
                Our friendly team will love to hear from you!
              </Typography>
            </Box>
            <Box className={styles.contactUsContent}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    compolsory={true}
                    onChange={onChange}
                    placeholder={""}
                    type="text"
                    name="first_name"
                    label="First Name"
                    customClass={styles.contactusInp}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={styles.lastInpGrid}>
                  <TextInput
                    compolsory={true}
                    onChange={onChange}
                    placeholder={""}
                    type="text"
                    name="last_name"
                    label="Last Name"
                    customClass={styles.contactusInp}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                      <TextInput
                      compolsory={true}
                      onChange={onChange}
                        placeholder={""}
                        type="email"
                        name="emailaddress"
                        label="Email Address"
                        customClass={styles.contactusInp}
                      />
                    </Grid> */}
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    compolsory={true}
                    onChange={onChange}
                    placeholder={""}
                    type="email"
                    name="email"
                    label="Email Address"
                    customClass={styles.contactusInp}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={styles.lastInpGrid}>
                  {/* <TextInput
                    compolsory={true}
                    onChange={onChange}
                    placeholder={""}
                    type="number"
                    name="contact_number"
                    label="Phone No"
                    customClass={styles.contactusInp}
                  /> */}

                  <Box className={styles.parentInput}>
                    <PhoneFeild2
                      customClass={styles.input}
                      name="contact_number"
                      popup={true}
                      type="tel"
                      value={values?.contact_number}
                      placeholder={"+614 234 678"}
                      label="Contact Number"
                      country="AU"
                      onCountryChange={(e) => setCountryCode(e)}
                      onChange={(e) => {
                        setValues({
                          ...values,
                          contact_number: e,
                        });
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box className="date-picker2">
                    <label>
                      Date <span>*</span>
                    </label>
                    <ReactDatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="Date *"
                      minDate={moment().toDate()}
                    />
                  </Box>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                      <TextInput
                      compolsory={true}
                      onChange={onChange}
                        placeholder={""}
                        type="email"
                        name="emailaddress"
                        label="Email Address"
                        customClass={styles.contactusInp}
                      />
                    </Grid> */}
              </Grid>
              {/* <Grid container spacing={2} marginY={0.2}>
                <Grid item xs={12} lg={5} className={styles.lastInpGrid}>
                  <TextInput
                    compolsory={true}
                    onChange={onChange}
                    placeholder={""}
                    type="time"
                    name="starttime"
                    label="Booking Start Time"
                    customClass={styles.contactusInp}
                  />
                </Grid>
                <Grid item xs={12} lg={2}>
                  <Box marginLeft={3} className={styles.tillbtn}>
                    <Typography>Till</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={5} className={styles.lastInpGrid}>
                  <TextInput
                    compolsory={true}
                    onChange={onChange}
                    placeholder={""}
                    type="time"
                    name="endtime"
                    label="Booking End Time "
                    customClass={styles.contactusInp}
                  />
                </Grid>
              </Grid> */}

              <Grid item xs={12}>
                <Box className={"timebox2"}>
                  {/* <TextInput
            type="time"
            name="time"
            label="Start Time"
            placeholder="Time *"
            value={values.time}
            onChange={onChange}
            customClass={"inputInterview"}
          /> */}

                  <TimeRange
                    onStartTimeChange={(e) =>
                      setValues({ ...values, time: e?.startTime })
                    }
                    className="time-picker-custom"
                    startLabel={"Start Time"}
                    endLabel={"End Time"}
                    onEndTimeChange={(e) =>
                      setValues({ ...values, time2: e?.endTime })
                    }
                    startMoment={values?.time}
                    endMoment={values?.time2}
                  />
                  {/* <TimePicker onChange={onChangeee} value={valueee} />
          



          <TextInput
            type="time"
            name="time2"
            data-open="DatePickerID"
            label="End Time"
            placeholder="Time *"
            value={values.time2}
            onChange={onChange}
            customClass={"inputInterview"}
          /> */}
                </Box>
              </Grid>

              {/* <Grid container>

                  </Grid> */}
              <Grid item xs={12}>
                <TextInput
                  compolsory={true}
                  onChange={onChange}
                  placeholder={""}
                  type="text"
                  name="message"
                  label="Key Notes"
                  textarea
                  rows={4}
                  customClass={styles.contactusInp}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  className={styles.btnSend}
                  onClick={(e) => submitData(e)}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress sx={{ color: "white" }} />
                  ) : (
                    "   Submit"
                  )}
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
