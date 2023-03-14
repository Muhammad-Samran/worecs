import { Box } from "@mui/material";
import React from "react";

import styles from "./styles.module.scss";

const SingleIndustry = ({ element }) => {
  return <Box className={styles.gridParrent}>{element.name}</Box>;
};

export default SingleIndustry;
