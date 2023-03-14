import React from "react";
import "react-phone-number-input/style.css";
import "./styles.scss";
import PhoneInput, { formatPhoneNumber } from "react-phone-number-input";
import { Box } from "@mui/material";

import { useField } from "formik";

const PhoneFeild2 = ({
  name,
  labelFalse,
  customClass,
  onCountryChange,
  popup,
  value,
  onChange,
  props,
}) => {
  return (
    <Box className="phone-parrent new-border">
      {!labelFalse && (
        <label>
          Contact Number <span style={{ color: "red" }}>*</span>
        </label>
      )}
      <PhoneInput
        // {...field}
        className={customClass}
        placeholder="614 234 6782"
        value={value}
        name={name}
        limitMaxLength={true}
        defaultCountry={"AU"}
        initialValueFormat={"national"}
        onCountryChange={onCountryChange}
        onChange={onChange}
      />
    </Box>
  );
};

export default PhoneFeild2;
