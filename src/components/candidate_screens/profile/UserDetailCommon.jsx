import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Box, Typography } from "@mui/material";
import { ReactComponent as EditIcon } from "../../../assets/candidates/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/candidates/delete.svg";

import UpdateExperience from "./Modal/experience/UpdateExperience";
import UpdateEducation from "./Modal/education/UpdateEducation";
import UpdateLicense from "./Modal/licenses/UpdateLicense";

import DeleteExperience from "./Modal/experience/DeleteExperience";
import DeleteEducation from "./Modal/education/DeleteEducation";
import DeleteLicense from "./Modal/licenses/DeleteLicense";

import {
  editExperience,
  editEducation,
  editProfileLicense,
} from "../../../api/candidate/candidate.class";

export const UserDetailCommon = ({
  type,
  img,
  title,
  subtitle,
  duration,
  uuid,
  setUpdation,
  userDetailData,
}) => {
  const [experienceEdit, setExperienceEdit] = useState(false);
  const [educationEdit, setEducationEdit] = useState(false);
  const [licenseEdit, setLicenseEdit] = useState(false);

  const [editexperience, setEditExperience] = useState([]);
  const [editeducation, setEditEducation] = useState([]);
  const [editLicense, setEditLicense] = useState([]);

  const [experienceDelete, setExperienceDelete] = useState(false);
  const [educationDelete, setEducationDelete] = useState(false);
  const [licenseDelete, setLicenseDelete] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await editExperience(uuid).then(function (res) {
        return res?.data?.results;
      });
      if (response.uuid) {
        setExperienceEdit(true);
      }
      setEditExperience(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEducation = async () => {
    try {
      const response = await editEducation(uuid).then(function (res) {
        return res?.data?.results;
      });
      // console.log("Education", response);
      if (response?.uuid) {
        setEducationEdit(true);
      }
      setEditEducation(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLicense = async () => {
    try {
      const response = await editProfileLicense(uuid).then(function (res) {
        return res?.data?.results;
      });
      // console.log("License", response);
      if (response?.uuid) {
        setLicenseEdit(true);
      }
      setEditLicense(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className={styles.parent}>
        <Box className={styles.button}>
          <Box className={styles.userDetail}>
            <img
              src={img}
              style={{
                width: "50px",
                height: "50px",
              }}
            />

            <Box>
              <Typography variant="h4">{title}</Typography>
              <Typography variant="h5">{subtitle}</Typography>
              <Typography component="p">{duration}</Typography>
            </Box>
          </Box>
          <Box>
            <Box
              className={styles.editicon}
              onClick={() => {
                if (type === "experience") {
                  handleUpdate();
                } else if (type === "education") {
                  handleEducation();
                } else if (type === "license") {
                  handleLicense();
                }
              }}
            >
              <EditIcon />
            </Box>
            <Box
              className={styles.editicon}
              onClick={() => {
                if (type === "experience") {
                  setExperienceDelete(true);
                } else if (type === "education") {
                  setEducationDelete(true);
                } else if (type === "license") {
                  setLicenseDelete(true);
                }
              }}
            >
              <DeleteIcon />
            </Box>
          </Box>
        </Box>
      </Box>
      <UpdateExperience
        openModal={experienceEdit}
        setOpenModal={setExperienceEdit}
        editexperience={editexperience}
        setUpdation={setUpdation}
      />
      <UpdateEducation
        openModal={educationEdit}
        setOpenModal={setEducationEdit}
        editeducation={editeducation}
        setUpdation={setUpdation}
      />
      <UpdateLicense
        openModal={licenseEdit}
        setOpenModal={setLicenseEdit}
        setUpdation={setUpdation}
        data={editLicense}
        FrontImage={editLicense?.front_image}
        BackImage={editLicense?.back_image}
        userDetailData={userDetailData}
      />

      <DeleteExperience
        openModal={experienceDelete}
        setOpenModal={setExperienceDelete}
        uuid={uuid}
        setDeletion={setUpdation}
      />
      <DeleteEducation
        openModal={educationDelete}
        setOpenModal={setEducationDelete}
        uuid={uuid}
        setDeletion={setUpdation}
      />
      <DeleteLicense
        openModal={licenseDelete}
        setOpenModal={setLicenseDelete}
        uuid={uuid}
        setDeletion={setUpdation}
      />
    </>
  );
};
