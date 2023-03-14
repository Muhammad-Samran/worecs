import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

const AllCandidates = () => {
  const orders = useSelector((state) => state?.rorders);
  const auth = useSelector((state) => state?.auth);
  const total = orders?.singleOrder?.results?.orderDetail?.reduce(
    (i, e) => i + Number(e?.price),
    0
  );

  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">Orders Detail</Typography>

        {/* <Box className={styles.searchBox}>
          <BsSearch />
          <input type="text" placeholder="Search..." />
        </Box> */}
      </Box>
      {/* <Typography component={"h5"}>
        {orders?.singleOrder?.results?.orderDetail[0]?.plan_id}
      </Typography> */}
      <Box className={styles.candidateTable}>
        <Grid container spacing={2}>
          <Grid item md={12} lg={12} sx={{ width: "100%" }}>
            <Box className={styles.boxTable}>
              <Box className={styles.rowHead}>
                <Box className={styles.rowBody}>Items Summary</Box>
                <Box className={styles.rowBody}>QTY</Box>
                <Box className={styles.rowBody}>Price</Box>
                <Box className={styles.rowBody}>Total Price</Box>
              </Box>
              {orders?.singleOrder?.results?.orderDetail?.map((e, i) => (
                <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                  <Box className={styles.rowBody}>
                    {e?.product?.name || e?.get_industry_license?.name}
                  </Box>
                  <Box className={styles.rowBody}>{e?.total_count}</Box>
                  <Box className={styles.rowBody}>
                    $
                    {e?.total_count == "00"
                      ? "00"
                      : e?.total_count == "0"
                      ? "00"
                      : (e?.price / e?.total_count).toFixed(2)}
                  </Box>
                  <Box className={styles.rowBody}>${e?.price}</Box>
                </Box>
              ))}
            </Box>
            <Box className={styles.boxTable3} style={{ marginTop: "30px" }}>
              <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                <Box className={styles.rowBody}>Total</Box>
                <Box className={styles.rowBody}>${total?.toFixed(2)}</Box>
              </Box>
            </Box>
          </Grid>

          <Grid item md={12} lg={12} sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                <Box className={styles.boxTable2}>
                  <Box className={styles.rowHead}>
                    <Box className={styles.rowBody}>Customer order details</Box>
                    {/* <Box className={styles.rowBody}>Items Summary</Box> */}
                  </Box>

                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Customer Name</Box>
                    <Box className={styles.rowBody}>
                      {auth?.results?.first_name +
                        " " +
                        auth?.results?.last_name}
                    </Box>
                  </Box>

                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Phone Number</Box>
                    <Box className={styles.rowBody}>
                      {auth?.results?.contact_number}
                    </Box>
                  </Box>

                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Address line</Box>
                    <Box className={styles.rowBody}>Minigin</Box>
                  </Box>
                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Flat / Building Name</Box>
                    <Box className={styles.rowBody}>Eureka Tower</Box>
                  </Box>
                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}> Street Name</Box>
                    <Box className={styles.rowBody}>13 Loris Way</Box>
                  </Box>
                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Postal Code</Box>
                    <Box className={styles.rowBody}>6312</Box>
                  </Box>

                  {/* <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                <Box className={styles.rowBody}>Bag Option</Box>
                <Box className={styles.rowBody}>No Bag</Box>
              </Box>
              <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                <Box className={styles.rowBody}>Note</Box>
                <Box className={styles.rowBody}>N /A</Box>
              </Box> */}
                </Box>
              </Grid>
              <Grid item md={12} lg={6} sx={{ width: "100%" }}>
                <Box className={styles.boxTable3}>
                  <Box className={styles.rowHead}>
                    <Box className={styles.rowBody}>Order Summary</Box>
                    {/* <Box className={styles.rowBody}>Items Summary</Box> */}
                  </Box>

                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Order Created</Box>
                    <Box className={styles.rowBody}>
                      {moment(
                        orders?.singleOrder?.results?.orderDetail[0]?.created_at
                      ).format("dddd/DD-MM-YYYY")}
                    </Box>
                  </Box>

                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Order Time</Box>
                    <Box className={styles.rowBody}>
                      {moment(
                        orders?.singleOrder?.results?.orderDetail[0]?.created_at
                      ).format("HH:mm A")}
                    </Box>
                  </Box>
                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>Subtotal</Box>
                    <Box className={styles.rowBody}>${total?.toFixed(2)}</Box>
                  </Box>
                </Box>
                {/* 
                <Box className={styles.boxTable4} style={{ marginTop: "30px" }}>
                  <Box className={styles.rowHead}>
                    <Box className={styles.rowBody}>Billing Address</Box>
                    <Box className={styles.rowBody}>Items Summary</Box>
                  </Box>
                  <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                    <Box className={styles.rowBody}>
                      Address line : kjdhffjkggmfhnmh
                    </Box>
                    <Box className={styles.rowBody}>
                      Flat / Building Name : jhddfhkjdjgf
                    </Box>
                    <Box className={styles.rowBody}>
                      Street Name : ghjklfljjkjjlfdh
                    </Box>
                    <Box className={styles.rowBody}>Post Code : En3 5dk</Box>
                  </Box>
                </Box> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* {orders?.singleOrder?.results?.orderDetail?.map((e, i) => (
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
