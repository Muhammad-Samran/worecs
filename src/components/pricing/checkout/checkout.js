import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cards from "react-credit-cards";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import {
  checkoutPayment,
  resetPricing,
  subscriptionPayment,
  updateSubcrib,
} from "../../../store/actions/pricingActions";
import TextInput from "../../common/TextInput";
import styles from "./styles.module.scss";

const Checkout = ({
  cart,
  setCart,
  open,
  setOpen,
  sub,
  licenseValue,
  setLicenseValue,
  setLicense,
  radio,
  setRadio,
  billing,
  setBilling,
  updateValues,
  setUpdateValues,
}) => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const payment = useSelector((state) => state?.pricing);
  const initialState = {
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  };
  const CARD_VALIDATION =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/g;
  const GET_MONTH = new Date().getMonth();
  const GET_YEAR = new Date().getFullYear();
  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e?.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (Customerror.hasOwnProperty(name)) {
      delete Customerror[name];
      setErrors(Customerror);
    }
  };
  const [values, setValues] = useState(initialState);
  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "cvc":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          break;
        case "expiry":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          else if (
            Number(GET_YEAR) > Number(value.split("/")[1]) ||
            (Number(GET_YEAR) === Number(value.split("/")[1]) &&
              Number(GET_MONTH) >= Number(value.split("/")[0]))
          )
            newError[key] = "Please Type a valid expiry date ";
          else if (Number(value.split("/")[0] > 12))
            newError[key] = "Please Type a valid Month";
          else if (Number(value.split("/")[0].length === 0))
            newError[key] = "Please Type x Month";
          break;
        case "cvc":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          break;
        case "number":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          else if (value.length != 16 || isNaN(value)) {
            newError[key] = "Please enter 16 numbers";
          } else if (CARD_VALIDATION.test(value) === false)
            newError[key] = "Card format is incorrect";

          break;
        case "name":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "Field is required";
          break;
        default:
          return;
      }
    }
    return newError;
  };

  const updateSub = async (e) => {
    e.preventDefault();
    const validateSelect = validate(values);
    if (Object?.keys(validateSelect)?.length > 0) {
      setErrors(validateSelect);
      return;
    }
    const local_data = {
      name: values?.name,
      card_number: values?.number.trim(),
      CVC: values?.cvc,
      exp_year: values?.expiry.split("/")[1],
      exp_month: values?.expiry.slice(0, 2),
      plan_name: values?.name,
      ...updateValues,
    };
    dispatch(updateSubcrib(local_data));
  };
  const submitData = async (e) => {
    e.preventDefault();
    const validateSelect = validate(values);
    if (Object?.keys(validateSelect)?.length > 0) {
      setErrors(validateSelect);
      return;
    }
    // console.log(cart);
    const local_data = {
      ...billing,
      name: values?.name,
      card_number: values?.number.trim(),
      CVC: values?.cvc,
      exp_year: values?.expiry.split("/")[1],
      exp_month: values?.expiry.slice(0, 2),
      plan_name: values?.name,
      coupon_code: payment?.couponCode?.results?.coupon_code || "",
      billing_address: billing?.address?.length > 1 ? true : false,
      workspace_id: auth?.results?.workspace_id,
      ...radio,
      subscription: radio,
      plan_data: {
        ...cart,
      },
      industry_certificate: {
        ...licenseValue,
      },
    };

    const local_data2 = {
      name: values?.name,
      card_number: values?.number.trim(),
      CVC: values?.cvc,
      exp_year: values?.expiry.split("/")[1],
      exp_month: values?.expiry.slice(0, 2),
      workspace_id: auth?.results?.workspace_id,
      ...cart,
    };
    sub
      ? dispatch(subscriptionPayment(local_data2))
      : dispatch(checkoutPayment(local_data));
  };
  useEffect(() => {
    if (payment?.paymentDone?.success) {
      setOpen(false);
      navigate(routes?.DASHBOARD);
      dispatch(resetPricing());
      setCart({});
      setLicenseValue({});
      setLicense([]);
      setBilling({ address: "", city: "", state: "", country: "" });
      setRadio({});
    }
  }, [payment?.paymentDone]);

  useEffect(() => {
    if (payment?.updateSubscription?.success) {
      setOpen(false);
      navigate(routes?.DASHBOARD);
      dispatch(resetPricing());
      setUpdateValues({
        label: "",
        value: "",
        interval_count: "",
        product: "",
        price: "00",
      });
    }
  }, [payment?.updateSubscription]);

  return (
    <Box className={styles.gridParrent}>
      <Typography component="h2">Card Details</Typography>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        <Grid item md={12} lg={6}>
          <form onSubmit={submitData}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} lg={12}>
                <Box className={styles.parentBox}>
                  <TextInput
                    compolsory={true}
                    customClass={styles.input}
                    label={"Name"}
                    placeholder={"name"}
                    name="name"
                    onChange={onChange}
                  />
                  {Customerror?.name && (
                    <p className="error-class position-absolute">
                      {Customerror?.name}
                    </p>
                  )}
                </Box>
              </Grid>
              <Grid item md={12} xs={12} lg={12}>
                <Box className={styles.parentBox}>
                  <TextInput
                    compolsory={true}
                    customClass={styles.input}
                    label={"Card Number"}
                    placeholder={"Card Number"}
                    name="number"
                    onKeyPress={(e) =>
                      values?.number?.length >= 16 ? e.preventDefault() : ""
                    }
                    onChange={onChange}
                  />
                  {Customerror?.number && (
                    <p className="error-class position-absolute">
                      {Customerror?.number}
                    </p>
                  )}
                </Box>
              </Grid>
              <Grid item md={6} xs={12} lg={6}>
                <Box className={styles.input3Parent}>
                  <label>
                    Expiry <span style={{ color: "red" }}>*</span>
                  </label>
                  <ReactInputMask
                    // mask={"$num"}

                    mask={"99/9999"}
                    maskChar=" "
                    placeholder="MM/YYYY"
                    value={values?.expiry}
                    name="expiry"
                    className={styles.input3}
                    // className={styles.input}
                    onChange={onChange}
                  />
                  {Customerror?.expiry && (
                    <p className="error-class position-absolute">
                      {Customerror?.expiry}
                    </p>
                  )}
                </Box>
              </Grid>

              <Grid item md={6} xs={12} lg={6}>
                <Box className={styles.parentBox}>
                  <TextInput
                    compolsory={true}
                    customClass={styles.input}
                    label={"CVC"}
                    placeholder={"cvc"}
                    name="cvc"
                    onKeyPress={(e) =>
                      values?.cvc?.length >= 4 ? e.preventDefault() : ""
                    }
                    onChange={onChange}
                  />
                  {Customerror?.cvc && (
                    <p className="error-class position-absolute">
                      {Customerror?.cvc}
                    </p>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Box className={`button-primary ${styles.button}`}>
              <Button
                onClick={updateValues ? updateSub : submitData}
                disabled={payment?.isLoading}
              >
                {payment?.isLoading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Send"
                )}
              </Button>
            </Box>
          </form>
        </Grid>
        <Grid item md={12} lg={6} sx={{ widht: "100%" }}>
          <Cards
            cvc={values?.cvc}
            expiry={values?.expiry}
            focused={""}
            name={values?.name}
            number={values?.number}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
