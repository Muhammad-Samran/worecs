import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";

import dummy from "../../../assets/sidebar/boy.svg";
import { ReactComponent as UploadIcon } from "../../../assets/candidates/uploadicon.svg";
import { ReactComponent as EmailIcon } from "../../../assets/candidates/email.svg";
import { ReactComponent as LockIcon } from "../../../assets/candidates/lock.svg";
import { ReactComponent as EditIcon } from "../../../assets/candidates/edit.svg";
import { ReactComponent as AddIcon } from "../../../assets/candidates/add.svg";
import { ReactComponent as RefIcon } from "../../../assets/candidates/ref.svg";
import { ReactComponent as EyeIcon } from "../../../assets/candidates/whiteEye.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/candidates/delete.svg";

// Modals
import ChangeEmailModal from "./Modal/change-email";
import ChangePasswordModal from "./Modal/change-password";
import UploadResumeModal from "./Modal/upload-resume";
import EditProfileModal from "./Modal/edit-profile";
import ExperienceModal from "./Modal/experience";
import EducationModal from "./Modal/education";
import LicensesModal from "./Modal/licenses";
import UpdateLicense from "./Modal/licenses/UpdateLicense";
import UserDetail from "./Modal/userDetails";
import UpdateUserDetail from "./Modal/userDetails/UpdateUserDetail";
import ViewResume from "./Modal/upload-resume/ViewResume";

import userimg from "../../../assets/candidates/userimg.jfif";
import styles from "./styles.module.scss";

import { UserInfo } from "./UserInfo";
import { CustomTable } from "./CustomTable";
import { UserDetailCommon } from "./UserDetailCommon";

import {
  getExperience,
  getEducation,
  getLicenseShow,
  getProfileLicense,
} from "../../../api/candidate/candidate.class";
import useScroll from "../../../customHooks/useScroll";
import { useLocation } from "react-router-dom";
import {
  deleteResume,
  showResume,
} from "../../../api/uploadFile/uploadFile.class";
import { useSelector } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";

const CandidateProfile = () => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [uploadResume, setUploadResume] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [experience, setExperience] = useState(false);
  const [education, setEducation] = useState(false);
  const [licenses, setLicenses] = useState(false);
  const [licensesUpdate, setLicensesUpdate] = useState(false);
  const [reference, setReference] = useState(false);
  const [userDetailUpdate, setUserDetailUpdate] = useState(false);
  const [isProfileUpdate, setProfileUpdate] = useState(false);
  const [userDetail, setUserDetail] = useState(false);
  const [experienceList, setExperienceList] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [licenseList, setLicenseList] = useState([]);
  const [profile, setProfile] = useState();
  const [dataLicenseShow, setDataLicenseShow] = useState();
  const [userDetailData, setUserDetailData] = useState([]);
  const [licenseData, setLicenseData] = useState([]);
  const [resume, setResume] = useState("");
  const [updation, setUpdation] = useState(false);
  const [viewResume, setViewResume] = useState(false);

  const [executeScroll, elRef] = useScroll();
  const location = useLocation();
  const comeFrom = location?.state?.comeFrom;

  const dispatch = useDispatch();

  const candidateId = useSelector(
    (state) => state?.auth?.results?.candidate_id
  );

  const authProfile = useSelector((state) => state?.rprofile);

  useEffect(() => {
    if (comeFrom === "dashboard") {
      executeScroll();
    }
  }, []);

  // getExperience api call

  useEffect(() => {
    const API = async () => {
      try {
        const response = await getExperience().then(function (res) {
          return res?.data?.results;
        });

        setExperienceList(response);
      } catch (error) {
        console.log(error);
      }
    };

    API();

    return () => {
      setExperienceList("");
    };
  }, [updation]);

  // getEducation api call

  useEffect(() => {
    const API = async () => {
      try {
        const response = await getEducation().then(function (res) {
          return res?.data?.results;
        });
        setEducationList(response);
      } catch (error) {
        console.log(error);
      }
    };

    API();

    return () => {
      setEducationList("");
    };
  }, [updation]);

  const handleShow = async () => {
    try {
      const response = await getLicenseShow().then(function (res) {
        return res.data;
      });
      // console.log("show data in profile", response);
      if (response.success == true) {
        if (
          response.results == null ||
          response.results == undefined ||
          response.results == ""
        ) {
          setUserDetail(true);
        } else {
          setDataLicenseShow(response.results);
          setUserDetailUpdate(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const API = async () => {
      try {
        const respone = await getLicenseShow();
        setUserDetailData(respone?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    API();
  }, [updation]);

  useEffect(() => {
    const API = async () => {
      try {
        const respone = await getProfileLicense();
        // console.log("index of license", respone.data.results.data);
        setLicenseData(respone.data.results.data);
      } catch (error) {
        console.log(error);
      }
    };
    API();
  }, [updation]);

  useEffect(() => {
    const API = async () => {
      try {
        const respone = await showResume({ user_id: candidateId });
        // console.log("resume show", respone);
        setResume(respone?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    API();
  }, [updation]);

  const handleResumeDeletion = async (resume) => {
    try {
      const response = await deleteResume({ uuid: resume.uuid });
      if (response.data.success == true) {
        setUpdation((old) => old + 1);
        dispatch(ShowAlert(response?.data?.message, "success"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Profile</Typography>
        <Box className={`${styles.button} button-primary`}>
          <Box className="d-flex align-items-center ">
            <Button
              className={`mt-0`}
              onClick={() => {
                resume === "" ? setUploadResume(true) : setViewResume(true);
              }}
            >
              {resume === "" ? (
                <>
                  <UploadIcon /> Upload Resume
                </>
              ) : (
                <Box style={{ color: "white" }}>
                  <EyeIcon /> View Resume
                </Box>
              )}
            </Button>
            {resume === "" ? (
              <></>
            ) : (
              <Box
                className="mx-2 "
                style={{ width: "20px" }}
                onClick={() => handleResumeDeletion(resume)}
              >
                <DeleteIcon />
              </Box>
            )}
          </Box>

          <Box className={styles.button}>
            {/* <Box className={`button-primary`}>
              <Button onClick={handleShow}>
                <RefIcon /> License Info
              </Button>
            </Box> */}
            {/* <Button
              sx={{ width: "145px" }}
              onClick={() => {
                setChangePassword(true);
              }}
            >
              <LockIcon /> Change Password
            </Button> */}
          </Box>
        </Box>
        <UserInfo
          imgSrc={
            authProfile?.profile?.results?.profile_image
              ? `${process.env.REACT_APP_URL}${authProfile?.profile?.results?.profile_image} `
              : dummy
          }
          name={"Nolen T:"}
          number={"+61413253874"}
          email={"cs@vrtechsol.com"}
          edit={setEditProfile}
          profile={profile}
          setProfile={setProfile}
          isProfileUpdate={isProfileUpdate}
          setProfileUpdate={setProfileUpdate}
        />

        <Box className={"d-flex align-items-center"}>
          <Typography variant="h5">Experience</Typography>
          <Box>
            <Box
              className={`${styles.editicon} px-1 mx-2`}
              onClick={() => {
                setExperience(true);
              }}
              style={{
                color: "#00CFC5",
                fontFamily: "poppins-semi-bold",
                fontStyle: "normal",
                fontSize: "12px",
                lineHeight: "24px",
                display: "flex",
                alignItems: "center",
                border: "1px solid #00CFC5",
                borderRadius: "10px",
              }}
            >
              <AddIcon /> <span style={{ padding: "5px" }}>Add</span>
            </Box>
          </Box>
        </Box>
        {experienceList ? (
          experienceList?.map((item, index) => (
            <UserDetailCommon
              type="experience"
              img={
                authProfile?.profile?.results?.profile_image
                  ? `${process.env.REACT_APP_URL}${authProfile?.profile?.results?.profile_image} `
                  : dummy
              }
              uuid={item.uuid}
              title={item.job_category.name}
              subtitle={item.company_name}
              duration={`${item.start_date} - ${item.end_date}`}
              setUpdation={setUpdation}
            />
          ))
        ) : (
          <></>
        )}
        <Box className={"d-flex align-items-center"}>
          <Typography variant="h5" sx={{ mt: "30px" }}>
            Education
          </Typography>
          <Box
            sx={{ mt: "30px" }}
            className={`${styles.editicon} px-1 mx-2`}
            onClick={() => {
              setEducation(true);
            }}
            style={{
              color: "#00CFC5",
              fontFamily: "poppins-semi-bold",
              fontStyle: "normal",
              fontSize: "12px",
              lineHeight: "24px",
              display: "flex",
              alignItems: "center",
              border: "1px solid #00CFC5",
              borderRadius: "10px",
            }}
          >
            <AddIcon /> <span style={{ padding: "5px" }}>Add</span>
          </Box>
        </Box>
        {educationList ? (
          educationList?.map((item, index) => (
            <UserDetailCommon
              type="education"
              uuid={item.uuid}
              img={
                authProfile?.profile?.results?.profile_image
                  ? `${process.env.REACT_APP_URL}${authProfile?.profile?.results?.profile_image} `
                  : dummy
              }
              title={item.degree.name}
              subtitle={item.company_name}
              duration={`${item.start_date} - ${item.end_date}`}
              setUpdation={setUpdation}
            />
          ))
        ) : (
          <></>
        )}
        {/* <Box className={"d-flex align-items-center"}>
          <Typography
            className={"d-flex align-items-center"}
            variant="h5"
            sx={{ my: "30px" }}
          >
            References
          </Typography>
          <Box
            // sx={{ mt: "30px" }}
            className={`${styles.editicon} px-1 mx-2`}
            onClick={() => {
              setReference(true);
            }}
            style={{
              color: "#00CFC5",
              fontFamily: "poppins-semi-bold",
              fontStyle: "normal",
              fontSize: "12px",
              lineHeight: "24px",
              display: "flex",
              alignItems: "center",
              border: "1px solid #00CFC5",
              borderRadius: "10px",
            }}
          >
            <AddIcon /> <span style={{ padding: "5px" }}>Add</span>
          </Box>
        </Box>
        <CustomTable setReference={setReference} reference={reference} /> */}
        {userDetailData?.id ? (
          <>
            <Box className="d-flex align-items-center justify-content-between flex-wrap">
              <Box className={"d-flex align-items-center"} ref={elRef}>
                <Typography variant="h5" sx={{ mt: "30px" }}>
                  Licenses
                </Typography>
                <Box
                  onClick={() => {
                    setLicenses(true);
                  }}
                  style={{
                    color: "#00CFC5",
                    fontFamily: "poppins-semi-bold",
                    fontStyle: "normal",
                    fontSize: "12px",
                    lineHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #00CFC5",
                    borderRadius: "10px",
                  }}
                  sx={{ mt: "30px" }}
                  className={`${styles.editicon} px-1 mx-2`}
                >
                  <AddIcon /> <span style={{ padding: "5px" }}>Add</span>
                </Box>
              </Box>
              <Box className={styles.button}>
                <Box className={`button-primary`}>
                  <Button onClick={handleShow}>
                    <RefIcon /> License Info
                  </Button>
                </Box>
              </Box>
            </Box>

            {licenseData ? (
              licenseData?.map((item, index) => (
                <UserDetailCommon
                  type="license"
                  uuid={item.uuid}
                  img={
                    authProfile?.profile?.results?.profile_image
                      ? `${process.env.REACT_APP_URL}${authProfile?.profile?.results?.profile_image} `
                      : dummy
                  }
                  title={`${item.candidate_license.first_name} ${item.candidate_license.middle_name} ${item.candidate_license.last_name}`}
                  subtitle={item.response}
                  duration={item.candidate_license.address}
                  setUpdation={setUpdation}
                  userDetailData={userDetailData}
                />
              ))
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </Box>
      <ChangeEmailModal openModal={changeEmail} setOpenModal={setChangeEmail} />
      <ChangePasswordModal
        openModal={changePassword}
        setOpenModal={setChangePassword}
      />
      <UploadResumeModal
        openModal={uploadResume}
        setOpenModal={setUploadResume}
        setUpdation={setUpdation}
        profile={profile}
      />
      <EditProfileModal
        openModal={editProfile}
        profile={profile}
        setProfileUpdate={setProfileUpdate}
        setOpenModal={setEditProfile}
      />
      <ExperienceModal
        openModal={experience}
        setOpenModal={setExperience}
        isAddition={setUpdation}
      />
      <EducationModal
        openModal={education}
        isAddition={setUpdation}
        setOpenModal={setEducation}
      />
      <LicensesModal
        openModal={licenses}
        isAddition={setUpdation}
        setOpenModal={setLicenses}
        userDetailData={userDetailData}
      />
      <UpdateLicense
        openModal={licensesUpdate}
        isUpdation={setUpdation}
        setOpenModal={setLicensesUpdate}
        data={dataLicenseShow}
      />
      <UserDetail
        openModal={userDetail}
        isAddition={setUpdation}
        setOpenModal={setUserDetail}
      />
      <UpdateUserDetail
        openModal={userDetailUpdate}
        isUpdation={setUpdation}
        setOpenModal={setUserDetailUpdate}
        data={dataLicenseShow}
      />
      <ViewResume
        openModal={viewResume}
        setOpenModal={setViewResume}
        resume={resume}
      />
    </>
  );
};

export default CandidateProfile;
