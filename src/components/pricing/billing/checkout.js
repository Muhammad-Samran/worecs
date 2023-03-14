import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cards from "react-credit-cards";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutPayment,
  resetPricing,
  subscriptionPayment,
} from "../../../store/actions/pricingActions";
import TextInput from "../../common/TextInput";
import styles from "./styles.module.scss";

const Checkout = ({ open, open2, setOpen, setOpen2, billing, setBilling }) => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const payment = useSelector((state) => state?.pricing);

  const onChange = (e) => {
    const { name, value } = e?.target;
    setBilling({
      ...billing,
      [name]: value,
    });
    if (Customerror.hasOwnProperty(name)) {
      delete Customerror[name];
      setErrors(Customerror);
    }
  };

  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "address":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          break;
        case "country":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          break;
        case "state":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          break;
        case "city":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          break;

        default:
          return;
      }
    }
    return newError;
  };

  const submitData = async (e) => {
    e.preventDefault();
    const validateSelect = validate(billing);
    if (Object?.keys(validateSelect)?.length > 0) {
      console.log(validateSelect);
      setErrors(validateSelect);
      return;
    }
    // console.log(cart);
    setBilling(billing);
    setOpen(false);
    setOpen2(true);
  };

  return (
    <Box className={styles.gridParrent}>
      <Typography component="h2">Billing Address</Typography>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item md={12} lg={12}>
          <form onSubmit={submitData}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} lg={6}>
                <Box className={styles.parentBox}>
                  <TextInput
                    compolsory={true}
                    customClass={styles.input}
                    label={"Address"}
                    placeholder={"address"}
                    name="address"
                    onChange={onChange}
                  />
                  {Customerror?.address && (
                    <p className="error-class position-absolute">
                      {Customerror?.address}
                    </p>
                  )}
                </Box>
              </Grid>{" "}
              <Grid item md={12} xs={12} lg={6}>
                <Box className={styles.parentBox}>
                  <TextInput
                    compolsory={true}
                    customClass={styles.input}
                    label={"City"}
                    placeholder={"city"}
                    name="city"
                    onChange={onChange}
                  />
                  {Customerror?.city && (
                    <p className="error-class position-absolute">
                      {Customerror?.city}
                    </p>
                  )}
                </Box>
              </Grid>{" "}
              <Grid item md={12} xs={12} lg={6}>
                <Box className={styles.parentBox}>
                  <TextInput
                    compolsory={true}
                    customClass={styles.input}
                    label={"State"}
                    placeholder={"state"}
                    name="state"
                    onChange={onChange}
                  />
                  {Customerror?.state && (
                    <p className="error-class position-absolute">
                      {Customerror?.state}
                    </p>
                  )}
                </Box>
              </Grid>
              <Grid item md={12} xs={12} lg={6}>
                <Box className={styles.parentBox}>
                  <TextInput
                    compolsory={true}
                    customClass={styles.input}
                    label={"Country"}
                    placeholder={"country"}
                    name="country"
                    onChange={onChange}
                  />
                  {Customerror?.country && (
                    <p className="error-class position-absolute">
                      {Customerror?.country}
                    </p>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box className={`button-primary ${styles.button}`}>
              <Button onClick={submitData}>Next</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
