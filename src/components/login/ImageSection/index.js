import React from "react";

import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import image from "../../../assets/login/main-image.svg";

const ImageSection = () => {
  return (
    <Box className={styles.rightBox}>
      <Box className={styles.content}>
        <Typography variant="h2">
        Manage your candidates and recruiters in an easy way
        </Typography>
        <Typography variant="h3">
        The number 1 business administration workflow platform.
        </Typography>
      </Box>
      <Box className={styles.imageBox}>
        <img src={image} alt="login" />
      </Box>
      {/* <Box className={styles.imageBox}>
    <img src={main} alt="main" />
  </Box> */}
    </Box>
  );
};

export default ImageSection;
