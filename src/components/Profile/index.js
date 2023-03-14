import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextInput from "../common/TextInput";
import styles from "./styles.module.scss";
import upload from "../../assets/profile/upload.svg";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { REGEX } from "../../customHooks/utils";
import { useDispatch, useSelector } from "react-redux";
import CustomModel from "../sidebar/model/index";
import {
  getProfile,
  updateProfile,
  resetModel,
  updatePassword,
} from "../../store/actions/profileActions";
import { ShowAlert } from "../../store/actions/alertActions";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const profile = useSelector((state) => state?.rprofile);
  const [changeProfile, setChangeProfile] = useState(false);

  useEffect(() => {
    if (profile?.updateProfile?.success) {
      dispatch(resetModel());
    }
  }, [profile?.updateProfile, dispatch]);
  const initialState = {
    first_name: profile?.profile?.results?.first_name || "",
    last_name: profile?.profile?.results?.last_name || "",
    contact_number: profile?.profile?.results?.contact_number || "",
    email: profile?.profile?.results?.email || "",
    field_country: "au",
  };
  const initialState2 = {
    confirm_password: "",
    current_password: "",
    new_password: "",
  };
  const [values2, setValues2] = useState(initialState2);
  const [values, setValues] = useState(initialState);
  const hanldeChange = (e, setValues, values) => {
    const { value, name } = e?.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (
      values?.first_name?.trim() === "" ||
      values?.last_name?.trim() === "" ||
      values?.contact_number.trim() === ""
    ) {
      return dispatch(ShowAlert("Fields are required", "error"));
    }
    dispatch(
      updateProfile(
        {
          ...values,
          country_code: values?.field_country,
          uuid: auth?.results?.uuid,
          recruiter_id: auth?.results?.recruiter_id,
        },
        {
          uuid: auth?.results?.uuid,
          customer_id: auth?.results?.recruiter_id,
        }
      )
    );
  };

  const handleSubmit2 = (e) => {
    e?.preventDefault();
    if (
      values2?.new_password.trim() === "" ||
      values2?.confirm_password?.trim() === "" ||
      values2?.current_password.trim() === ""
    ) {
      return dispatch(ShowAlert("Fields are required", "error"));
    } else if (
      values2?.new_password.length < 8 ||
      values2?.confirm_password?.length < 8 ||
      values2?.current_password?.length < 8
    ) {
      return dispatch(ShowAlert("Password length is short", "error"));
    } else if (values2?.confirm_password !== values2?.new_password) {
      return dispatch(
        ShowAlert("Confirm password and new password not match", "error")
      );
    }
    dispatch(
      updatePassword({
        ...values2,
        recruiter_id: auth?.results?.recruiter_id,
      })
    ).then(() => {
      setValues2(initialState2);
    });
  };
  return (
    <Box className={styles.parent}>
      <CustomModel open={changeProfile} setOpen={setChangeProfile} />
      <Box className={styles.heading}>
        <Typography variant="h4">My Profile</Typography>
        <Box className={`button-primary ${styles.button}`}>
          <Button onClick={handleSubmit} disabled={profile?.loading}>
            Update
          </Button>
          <Button
            onClick={() => setChangeProfile(true)}
            disabled={profile?.loading}
            className={"secondary-btn"}
            style={{ marginTop: "5px" }}
          >
            Upload Image
          </Button>
        </Box>
      </Box>
      <Box className={styles.textFeilds}>
        <Typography variant="h5">Personal Details</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item md={12} lg={6}>
              <Box className={styles.parentBox}></Box>
              <TextInput
                autoComplete={"off"}
                label="First Name"
                placeholder={""}
                type="text"
                name="first_name"
                value={values?.first_name}
                onChange={(e) => hanldeChange(e, setValues, values)}
                customClass={styles.input}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <Box className={styles.parentBox}></Box>
              <TextInput
                autoComplete={"off"}
                label="Last Name"
                placeholder={""}
                type="text"
                name="last_name"
                value={values?.last_name}
                onChange={(e) => hanldeChange(e, setValues, values)}
                customClass={styles.input}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <Box className={styles.parentBox}></Box>
              <TextInput
                autoComplete={"off"}
                label="Email Address"
                placeholder={""}
                type="text"
                name="email"
                value={values?.email}
                onChange={(e) => hanldeChange(e, setValues, values)}
                customClass={styles.input}
                disabled={true}
              />
            </Grid>
            {/* <Grid item md={12} lg={6}>
        <Box className={styles.parentBox}></Box>
        <TextInput
            autoComplete={'off'}
              label="Password"
              placeholder={""}
              type="password"
              name="password"
              customClass={styles.input}
            />
          </Grid> */}
            <Grid item md={12} lg={6}>
              <Box className={styles.parentBox}></Box>
              <TextInput
                autoComplete={"off"}
                label="Contact Number"
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
                name="contact_number"
                value={values?.contact_number}
                onChange={(e) => hanldeChange(e, setValues, values)}
                customClass={styles.input}
              />
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box className={styles.textFeilds}>
        <Typography variant="h5">Change Password</Typography>
        <form onSubmit={handleSubmit2}>
          <Grid container spacing={2}>
            <Grid item md={12} lg={6}>
              <Box className={styles.parentBox}></Box>
              <TextInput
                autoComplete={"off"}
                label="Current Password"
                placeholder={""}
                type="password"
                name="current_password"
                customClass={styles.input}
                value={values2?.current_password}
                onChange={(e) => hanldeChange(e, setValues2, values2)}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <Box className={styles.parentBox}></Box>
              <TextInput
                autoComplete={"off"}
                label="New Password"
                placeholder={""}
                type="password"
                name="new_password"
                customClass={styles.input}
                value={values2?.new_password}
                onChange={(e) => hanldeChange(e, setValues2, values2)}
              />
            </Grid>
            <Grid item md={12} lg={6}>
              <Box className={styles.parentBox}></Box>
              <TextInput
                autoComplete={"off"}
                label="Confirm password"
                placeholder={""}
                type="password"
                name="confirm_password"
                customClass={styles.input}
                value={values2?.confirm_password}
                onChange={(e) => hanldeChange(e, setValues2, values2)}
              />
            </Grid>
            <Grid item md={12} lg={12}>
              <Box
                className={`button-primary ${styles.button}`}
                sx={{ marginLeft: "0px" }}
              >
                <Button onClick={handleSubmit2} disabled={profile?.loading}>
                  Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
      {/* <Box className={`${styles.textFeilds} ${styles.botom}`}>
        <Typography variant="h5">Company Logo</Typography>
        <Grid container spacing={2} sx={{ alignItems: { lg: "center" } }}>
          <Grid item md={12} lg={6}>
            <Box className={styles.preview} onClick={removeFile}>
              {image?.image1 ? (
                <>
                  <ImCross />
                  <img
                    src={image?.image1}
                    alt={"sd"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <p>{image?.name}</p>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      border: "3px solid #eee",
                      height: "170px",
                      marginBottom: "10px",
                    }}
                  >
                    <Box className={styles.imageUpload}>
                      <label htmlFor="file-input">
                        {!image.image1 && (
                          <img
                            src={upload}
                            alt="Upload"
                            style={{ maxWidth: "50px" }}
                          />
                        )}
                      </label>

                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={fileAdd}
                      />
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
          <Grid item md={12} lg={6}>
        <Box className={styles.parentBox}></Box>
          <TextInput
            autoComplete={'off'}
              label="Company Name"
              placeholder={""}
              type="text"
              name="company"
              customClass={styles.input}
            />
        <Box className={styles.parentBox}></Box>
            <TextInput
            autoComplete={'off'}
              label="Company Address"
              placeholder={""}
              type="text"
              name="companyaddress"
              customClass={styles.input}
            />
        <Box className={styles.parentBox}></Box>
            <TextInput
            autoComplete={'off'}
              label="Company ABN"
              placeholder={""}
              type="text"
              name="abn"
              customClass={styles.input}
            />
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
};

export default Profile;
