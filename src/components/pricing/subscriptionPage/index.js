import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

const AllCandidates = () => {
  const orders = useSelector((state) => state?.rorders);
  const subscription = useSelector((state) => state?.pricing?.subscription);
  const dispatch = useDispatch();

  const total = orders?.singleOrder?.results?.OrderDetail?.reduce(
    (i, e) => i + Number(e?.price),
    0
  );

  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">E-Worecs</Typography>

        {/* <Box className={styles.searchBox}>
          <BsSearch />
          <input type="text" placeholder="Search..." />
        </Box> */}
      </Box>
      <Typography component={"h5"}>
        {/* {subscription?.results?.subscription_id?.toUpperCase()} */}
      </Typography>

      <Box className={styles.candidateTable}>
        <Typography component={"h5"}>
          {subscription?.results?.month
            ? " Subscription detail"
            : "Not subscribed right now"}
        </Typography>
        {subscription?.results?.month && (
          <Grid container spacing={2}>
            <Grid item md={12} lg={12} sx={{ width: "100%" }}>
              <Box className={styles.boxTable}>
                <Box className={styles.rowHead}>
                  <Box className={styles.rowBody}>Item</Box>
                  <Box className={styles.rowBody}>Start Date</Box>
                  <Box className={styles.rowBody}>End Date</Box>
                  <Box className={styles.rowBody}>Price</Box>
                </Box>

                <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                  <Box className={styles.rowBody}>
                    {subscription?.results?.month} Month
                  </Box>
                  <Box className={styles.rowBody}>
                    {moment(subscription?.results?.start_at).format(
                      "dddd-MM-yyyy"
                    )}
                  </Box>
                  <Box className={styles.rowBody}>
                    {moment(subscription?.results?.ends_at).format(
                      "dddd-MM-yyyy"
                    )}
                  </Box>
                  <Box className={styles.rowBody}>
                    ${subscription?.results?.price}
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <Grid item md={12} lg={4} sx={{ width: "100%" }}>
            <Box className={styles.boxTable2}>
              <Box className={` ${styles.rowHead} `}>
                <NavLink
                  to={routes?.SUBSCRIPTION_GET}
                  className={styles.rowBody}
                >
                  Manage Subscription{" "}
                </NavLink>
                <NavLink to={routes?.SUBSCRIPTION_GET} className={styles.rowBody}>Items Summary</NavLink>
              </Box>

              <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                <NavLink
                  to={routes?.SUBSCRIPTION_UPDATE}
                  className={styles.rowBody}
                >
                  Upgrade Subscription
                </NavLink>
              </Box>

              <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                <NavLink
                  to={routes?.SUBSCRIPTION_DELETE}
                  className={styles.rowBody}
                >
                  Downgrade
                </NavLink>
              </Box>
            </Box>
          </Grid> */}
          </Grid>
        )}
        {/* {orders?.singleOrder?.results?.OrderDetail?.map((e, i) => (
          <Box sx={{ marginBottom: "20px" }} key={i}>
            <Box>
              <b>Item Number #{i + 1}</b>
            </Box>
            <Box>Plan Id : {e?.plan_id}</Box>
            {e?.cost_calculator_id && (
              <Box>Cost Calculator Id : {e?.cost_calculator_id}</Box>
            )}

            <Box>Total Count : {e?.total_count}</Box>
            {e?.industry_certification_id && (
              <Box>
                Industry Certification Id {e?.industry_certification_id}
              </Box>
            )}
            <Box>Price : ${e?.price}</Box>
          </Box>
        ))} */}
        {/* <CandidateTable
          titles={[
            "ID",
            "Name",
            "Created",
            "Status",
            // "Discount",
            "Total Price Paed",
          ]}
          rows={orders?.orderList?.results?.OrderHistory}
        /> */}
      </Box>
    </Box>
  );
};

export default AllCandidates;
