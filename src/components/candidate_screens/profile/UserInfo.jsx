import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Typography, IconButton } from "@mui/material";
import { ReactComponent as EditIcon } from "../../../assets/candidates/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/candidates/delete.svg";
import { ReactComponent as AddIcon } from "../../../assets/candidates/add.svg";
import { ReactComponent as LinkedInIcon } from "../../../assets/candidates/linkedin.svg";
import {
  getProfile,
  getSocialNetwork,
} from "../../../api/candidate/candidate.class";
import SocialNetworking from "./Modal/social-network";
import Delete from "./Modal/social-network/Delete";

export const UserInfo = ({
  imgSrc,
  name,
  number,
  email,
  edit,
  setProfile,
  profile,
  isProfileUpdate,
  setProfileUpdate,
}) => {
  const [editSocialNetwork, setEditSocialNetwork] = useState(false);
  const [deleteSocialNetwork, setDeleteSocialNetwork] = useState(false);
  const [SocialNetwork, setSocialNetwork] = useState(false);

  useEffect(() => {
    const API = async () => {
      try {
        const response = await getProfile().then(function (res) {
          return res.data.results;
        });
        // console.log("response", response);
        setProfile(response);

        const res = await getSocialNetwork().then(function (res) {
          return res.data.results;
        });
        console.log("response", res);
        setSocialNetwork(res);
      } catch (error) {
        console.log(error);
      }
    };

    API();

    return () => {
      setProfile("");
    };
  }, [isProfileUpdate]);

  return (
    <div className={styles.parent}>
      <Box className={styles.userInfo}>
        <Box
          style={{
            width: "70px",
            height: "70px",
          }}
        >
          <img src={imgSrc} className={styles.userImg} />
        </Box>
        <Box sx={{ ml: "26px", mr: "10px" }}>
          <Typography variant="h4">Name:</Typography>
          <Typography component="p">{`${profile?.first_name} ${profile?.last_name}`}</Typography>
          <Typography variant="h4">Contact number:</Typography>
          <Typography component="p">{`+${profile?.contact_number}`}</Typography>
        </Box>
        <Box>
          <Typography variant="h4">Email Address</Typography>
          <Typography component="p">{profile?.email}</Typography>
          <IconButton
            className={styles.editicon}
            onClick={() => {
              edit(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        <Box style={{ cursor: "pointer" }} sx={{ ml: "26px" }}>
          <Typography variant="h4">Social Network</Typography>
          <div onClick={() => window.open(SocialNetwork?.linkedin, "_blank")}>
            {SocialNetwork?.linkedin ? <LinkedInIcon /> : <></>}
          </div>
        </Box>
        {SocialNetwork?.linkedin ? (
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "space-between",
              minWidth: "100px",
            }}
          >
            <IconButton
              style={{ position: "static" }}
              className={styles.editicon}
              onClick={() => {
                setEditSocialNetwork(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <Box
              style={{ position: "static", minWidth: "20px" }}
              className={styles.editicon}
              onClick={() => {
                setDeleteSocialNetwork(true);
              }}
            >
              <DeleteIcon />
            </Box>
          </Box>
        ) : (
          <IconButton
            style={{ position: "static" }}
            className={styles.editicon}
            onClick={() => {
              setEditSocialNetwork(true);
            }}
          >
            <AddIcon />
          </IconButton>
        )}

        {/* <IconButton
          className={styles.editicon}
          onClick={() => {
            edit(true);
          }}
        >
          <EditIcon />
        </IconButton> */}
      </Box>

      <SocialNetworking
        openModal={editSocialNetwork}
        setOpenModal={setEditSocialNetwork}
        SocialNetwork={SocialNetwork}
        type={SocialNetwork?.linkedin ? "update" : "create"}
        setProfileUpdate={setProfileUpdate}
      />
      <Delete
        openModal={deleteSocialNetwork}
        setOpenModal={setDeleteSocialNetwork}
        SocialNetwork={SocialNetwork}
        setProfileUpdate={setProfileUpdate}
      />
    </div>
  );
};
