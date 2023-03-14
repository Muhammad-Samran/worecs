import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { BsSearch } from "react-icons/bs";
import CandidateTable from "../table";
import { useSelector } from "react-redux";

const AllCandidates = () => {
  const rcandidate = useSelector((state) => state?.rcandidate);
  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">Candidates</Typography>
        {/* <Box className={styles.searchBox}>
          <BsSearch />
          <input type="text" placeholder="Search..." />
        </Box> */}
      </Box>
      <Box className={styles.candidateTable}>
        <Typography variant="h5">All Candidates</Typography>
        <CandidateTable
          titles={[
            "ID",
            "Name",
            "Email",
            "Reference Check",
            "Letters of Offer",
            "Application Forms",
            // "Status",
            // "Actions",
          ]}
          rows={rcandidate?.allCandidate?.results}
        />
      </Box>
    </Box>
  );
};

export default AllCandidates;
