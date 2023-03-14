import { Grid, Typography, Box } from "@mui/material";
import t1 from "../../../assets/pricing/1.png";
import styles from "./styles.module.scss";

import React, { useState } from "react";

const Subs = ({ cart, setCart, setOpen, setOpen2, setSub }) => {
  const [selected, setSelected] = useState("");
  const data = [
    {
      interval_count: 1,
      product: "prod_MYziSEI4fqv3Zs",
      price: "15.00",
      icon: t1,
    },
    {
      interval_count: 6,
      product: "prod_MYztMRXQzcgMFk",
      price: "75.00",
      icon: t1,
    },
    {
      interval_count: 12,
      product: "prod_MYzgCw91827LU5",
      price: "150.00",
      icon: t1,
    },
  ];
  const selectSubscription = (e, i) => {
    setSelected(i);
    setCart(e);
    setOpen(false);
    setSub(true);
    setOpen2(true);
  };
  return (
    <>
      <Box className={styles.gridParrent}>
        {/* <PaymentElement /> */}

        <Box className={styles.featured}>
          <Box className={styles.header}>
            <Typography variant="h4">Subscription Box</Typography>
          </Box>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {data?.map((e, i) => (
              <Grid
                item
                md={6}
                xs={12}
                lg={3}
                key={i}
                sx={{ marginTop: "40px" }}
              >
                <Box
                  className={styles.card}
                  onClick={() => selectSubscription(e, i)}
                >
                  <img src={e?.icon} alt={e?.month} />
                  <Typography component={"h5"}>
                    Subscription for {e?.month} Months
                  </Typography>
                  <Typography component={"h6"}>Prcing : ${e?.price}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Subs;
