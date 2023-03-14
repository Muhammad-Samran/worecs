import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import s1 from "../../../assets/signup/s1.png";
import s2 from "../../../assets/signup/s2.png";

const Section1 = ({ data, setData }) => {
  const [active, setActive] = useState(null);
  useEffect(() => {
    localStorage.removeItem("User");
  }, []);
  const boxData = [
    {
      image: s1,
      name: "Candidate",
      type: "candidate",
    },
    {
      image: s2,
      name: "Recruiter",
      type: "recruitment",
    },
  ];
  const selectOne = (e, i) => {
    setActive(i);
    setData({ ...data, type: e?.type });
  };
  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(data));
  }, [selectOne]);
  return (
    <Box className={styles.innerContent}>
      <>
        <Typography variant="h3">Step 1: Select your account type</Typography>
        <Typography>
          Whether you are looking for a new job or onboarding new talent, our
          services will assist in streamlining your business administration
          workflow.
        </Typography>
        <Box className={styles.boxes}>
          {boxData?.map((e, i) => (
            <Box
              className={`${styles.box} ${active === i ? styles.active : ""}`}
              key={i}
              onClick={() => selectOne(e, i)}
            >
              <Box className={styles.circle}>
                <img src={e?.image} alt={e?.name} />
              </Box>
              <Typography variant="h4">{e?.name}</Typography>
            </Box>
          ))}
        </Box>
      </>
    </Box>
  );
};

export default Section1;
