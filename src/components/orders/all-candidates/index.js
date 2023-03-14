import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import { BsSearch } from "react-icons/bs";
import CandidateTable from "../table";
import { useSelector } from "react-redux";

const AllCandidates = () => {
  const orders = useSelector((state) => state?.rorders);
  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">Orders</Typography>

        {/* <Box className={styles.searchBox}>
          <BsSearch />
          <input type="text" placeholder="Search..." />
        </Box> */}
      </Box>
      <Typography component="h5">
        {orders?.orderList?.results?.OrderHistory?.length} orders
      </Typography>
      <Box className={styles.candidateTable}>
        {/* <Typography variant="h5">All Orders</Typography> */}
        <CandidateTable
          titles={[
            "order ID",
            "Name",
            "Email Address",
            // "Package ID",
            "Status",
            // "Discount",
            "Date",
          ]}
          rows={orders?.orderList?.results?.orderHistory}
        />
      </Box>
    </Box>
  );
};

export default AllCandidates;
