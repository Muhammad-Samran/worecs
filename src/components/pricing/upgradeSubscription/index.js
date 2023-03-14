import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { routes } from "../../../routes";
import { NavLink } from "react-router-dom";
import CustomSelect from "../../common/Select";
import CustomModel from "../model";
import CheckoutForm from "../checkout/checkout";
import { resetPricing } from "../../../store/actions/pricingActions";

const AllCandidates = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.rorders);
  const auth = useSelector((state) => state?.auth);
  const subscription = useSelector((state) => state?.pricing?.subscription);
  const total = orders?.singleOrder?.results?.OrderDetail?.reduce(
    (i, e) => i + Number(e?.price),
    0
  );

  //   interval_count: 1,
  //   product: "prod_MYziSEI4fqv3Zs",
  //   price: 15,
  // interval_count: 6,
  //   product: "prod_MYztMRXQzcgMFk",
  //   price: 75,
  // interval_count: 12,
  //   product: "prod_MYzgCw91827LU5",
  //   price: 150,
  const [values, setValues] = useState({
    label: "",
    value: "",
    interval_count: "",
    product: "",
    price: "00",
  });
  const options = [
    {
      value: "1 Month",
      label: "1 Month",
      interval_count: 1,
      product: "prod_MYziSEI4fqv3Zs",
      price: 15,
      interval_count: 6,
    },
    {
      value: "6 Months",
      label: "6 Months",
      interval_count: 1,
      interval_count: 6,
      product: "prod_MYztMRXQzcgMFk",
      price: 75,
    },
    {
      value: "12 Months",
      label: "12 Months",
      interval_count: 1,
      interval_count: 12,
      product: "prod_MYzgCw91827LU5",
      price: 150,
    },
  ];
  return (
    <Box className={styles.parent}>
      <CustomModel open={open} setOpen={setOpen}>
        <CheckoutForm
          open={open}
          setOpen={setOpen}
          updateValues={values}
          setUpdateValues={setValues}
        />
      </CustomModel>
      <Box className={styles.header}>
        <Typography variant="h4">Upgrade Subscription </Typography>

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

                  <Box className={styles.rowBody}>Type</Box>
                </Box>

                <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                  <Box className={styles.rowBody}>Subscription</Box>

                  <Box className={styles.rowBody}>
                    {" "}
                    <CustomSelect
                      customClass={styles.select2}
                      options={options}
                      onChange={(e) => setValues(e)}
                    />{" "}
                  </Box>
                </Box>
                <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                  <Box className={styles.rowBody}></Box>

                  <Box className={styles.rowBody}>
                    Price: ${Number(values?.price).toFixed(2)}
                  </Box>
                </Box>
                <Box className={`${styles.rowHead} ${styles.rowrow}`}>
                  <Box className={styles.rowBody}></Box>

                  <Box className={styles.rowBody}>
                    <Box
                      className={`button-primary ${styles.button}`}
                      style={{ margin: "0" }}
                    >
                      <Button
                        onClick={() => {
                          if (values?.product?.trim() === "") {
                            return;
                          }

                          dispatch(resetPricing());
                          setOpen(true);
                        }}
                      >
                        Upgrade
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
                <NavLink
                  to={routes?.SUBSCRIPTION_GET}
                  className={styles.rowBody}
                >
                  Items Summary
                </NavLink>
              </Box>

              <Box className={`${styles.rowHead}`}>
                <NavLink
                  to={routes?.SUBSCRIPTION_GET}
                  className={styles.rowBody}
                >
                  Upgrade User
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
        </Box>
      )}
    </Box>
  );
};

export default AllCandidates;
