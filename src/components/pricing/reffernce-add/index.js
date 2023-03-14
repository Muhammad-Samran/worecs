import React, { useState } from "react";
import TextInput from "../../common/TextInput/index";
import "./styles.scss";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import {
  resetPricing,
  verifyCopoun,
} from "../../../store/actions/pricingActions";
import { AiOutlineArrowRight } from "react-icons/ai";

const InterviewPopup = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

  const pricing = useSelector((state) => state.pricing);
  const [values, setValues] = useState({
    reff: "",
  });
  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "reff":
          if (!value || value.toString() === "") {
            newError[key] = "Field is Required";
          }
        default:
      }
    }
    return newError;
  };

  const submitData = async (e) => {
    if (Number(pricing?.price === 0)) {
      return dispatch(
        ShowAlert("Please add one item in cart to activate code ", "error")
      );
    }
    e.preventDefault();
    const validateSelect = validate(values);

    if (Object?.keys(validateSelect)?.length > 0) {
      setErrors(validateSelect);

      return;
    }
    const local_data = {
      coupon_code: values.reff,
    };
    dispatch(verifyCopoun(local_data)).then(() => {
      setValues({
        reff: "",
      });
    });
  };

  return (
    <>
      <Box style={{ width: "100%" }}>
        <form onSubmit={submitData}>
          <Box className={"inputCoupon"}>
            <input
              autoComplete="off"
              type="text"
              name="no_refference"
              min="0"
              placeholder="Enter your coupon"
              value={values.reff}
              onChange={(e) => {
                setValues({ ...values, reff: e?.target?.value });
                if (Customerror.hasOwnProperty("reff")) {
                  delete Customerror["reff"];
                  setErrors(Customerror);
                }
              }}
            />
            <Button onClick={submitData} disabled={pricing?.isLoading}>
              {pricing?.isLoading && pricing?.couponCode === null ? (
                <CircularProgress />
              ) : (
                <AiOutlineArrowRight />
              )}
            </Button>
          </Box>

          {/* {Customerror?.reff && (
            <p className="error-class">{Customerror?.reff}</p>
          )} */}
        </form>
      </Box>
    </>
  );
};

export default InterviewPopup;
