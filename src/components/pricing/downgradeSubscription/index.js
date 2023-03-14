import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.scss";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { routes } from "../../../routes";
import { NavLink } from "react-router-dom";
import CustomSelect from "../../common/Select";
import Model from "../model/index";
import DeleteModel from "../delteModel/index";

const AllCandidates = () => {
  const orders = useSelector((state) => state?.rorders);
  const [show, setShow] = useState(false);
  const subscription = useSelector((state) => state?.pricing?.subscription);
  const total = orders?.singleOrder?.results?.OrderDetail?.reduce(
    (i, e) => i + Number(e?.price),
    0
  );

  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">Downgrade Subscription </Typography>

        {/* <Box className={styles.searchBox}>
          <BsSearch />
          <input type="text" placeholder="Search..." />
        </Box> */}
      </Box>

      {subscription?.results?.month && (
        <Box className={styles.candidateTable}>
          {/* <Typography component={"h5"}>Subscription Detail</Typography> */}
          <Grid container spacing={2}>
            <Grid item md={12} lg={8} sx={{ width: "100%" }}>
              <Box className={styles.boxTable}>
                <Box className={styles.rowHead}>
                  <Box className={styles.rowBody}>Items</Box>

                  <Box className={styles.rowBody}>price</Box>
                </Box>

                <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                  <Box className={styles.rowBody}>
                    {subscription?.results?.month} months Subscription
                  </Box>

                  <Box className={styles.rowBody}>
                    $ {subscription?.results?.price}
                  </Box>
                </Box>

                <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                  <Box className={styles.rowBody}></Box>

                  <Box className={styles.rowBody}>
                    <Box
                      className={`button-primary ${styles.button}`}
                      style={{ margin: "0" }}
                    >
                      <Button onClick={() => setShow(true)}>
                        Unsubscribe{" "}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <Grid item md={12} lg={4} sx={{ width: "100%" }}>
            <Box className={styles.boxTable2}>
              <Box className={` ${styles.rowHead}  ${styles.rowrow}`}>
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
                  Upgrade User
                </NavLink>
              </Box>

              <Box className={`${styles.rowHead}`}>
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
      )}
      <Model open={show} setOpen={setShow}>
        <DeleteModel open={show} setOpen={setShow} />
      </Model>
    </Box>
  );
};

export default AllCandidates;
