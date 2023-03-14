import React from "react";
import { Box } from "@mui/material";
import image0 from "../../../assets/signup/signup1.svg";
import image1 from "../../../assets/signup/signup2.svg";
import image2 from "../../../assets/signup/signup3.svg";
import image3 from "../../../assets/forget/forgetpassword.svg";

import styles from "./styles.module.scss";

const ImageSection = ({ active }) => {
  return (
    <Box className={styles.imageBox}>
      <img
        src={
          active === 0
            ? image0
            : active === 1
            ? image1
            : active === 2
            ? image2
            : active === 3
            ? image3 
            :''
        }
        alt="active"
      />
    </Box>
  );
};

export default ImageSection;
