import React, { useState } from "react";
import styles from "./styles.module.scss";
import open from "../../../assets/faqs/open-icon.svg";
import close from "../../../assets/faqs/close-icon.svg";
import { Box, Button, Typography } from "@mui/material";

const FaqsCard = ({ title, content, style }) => {
  const [show, setShow] = useState(false);
  return (
    <Box className={styles.faqCard} sx={style}>
      <Box c className={styles.cardHeader}>
        <Typography variant="p">{title}</Typography>
        <Button onClick={() => setShow(!show)} className={styles.btnToggler}>
          {show ? (
            <img src={close} alt="close" />
          ) : (
            <img src={open} alt="open" />
          )}
        </Button>
      </Box>
      {show ? (
        <Box className={styles.cardBody}>
          <Typography>{content}</Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default FaqsCard;
