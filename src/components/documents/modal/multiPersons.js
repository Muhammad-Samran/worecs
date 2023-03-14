import React, { useState, useEffect } from "react";
import TextInput from "../../common/TextInput";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ReactComponent as Dustin } from "../../../assets/workspace/dustbin.svg";
import { ReactComponent as AddIcon } from "../../../assets/candidates/add.svg";
import PhoneInput from "react-phone-number-input";
import styles from "./styles.module.scss";

const MultiPersons = ({ formValues, setFormValues }) => {
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let handlePhoneChange = (i, value) => {
    let newFormValues = [...formValues];
    newFormValues[i]["contact_number"] = value;
    newFormValues[i]["country_code"] = "AU";
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { to_email: "", contact_number: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <form>
      {/* <Box className="m-5">
        <Divider />
      </Box> */}

      {formValues.map((element, index) => (
        <Box
          className={"d-flex align-items-end justify-content-between flex-wrap"}
        >
          <Box className="form-inline" key={index}>
            <TextInput
              type="text"
              name="to_email"
              placeholder="Enter email address"
              label={index == 0 ? "Email Address*" : "Email Address"}
              value={element.to_email || ""}
              onChange={(e) => handleChange(index, e)}
            />
          </Box>
          <Box
            className={`${styles.parentInput} phone-parrent`}
            key={index}
            style={{ marginLeft: "10px" }}
          >
            <label>Contact Number</label>
            <PhoneInput
              name="contact_number"
              className={styles.input}
              placeholder="614 234 6782"
              country="AU"
              // defaultCountry="AU"
              label={index == 0 ? "Contact Number*" : "Contact Number"}
              value={element.contact_number || ""}
              onChange={(value) => handlePhoneChange(index, value)}
            />
          </Box>
          <Box
            className={index && "m-2"}
            style={{
              marginLeft: !index && "10px",
            }}
          >
            {index ? (
              <Button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                <Dustin />
              </Button>
            ) : (
              <Button
                // className="button remove"
                type="button"
                onClick={() => addFormFields()}
                style={{ border: "1px solid #00CFC5" }}
              >
                <span
                  style={{
                    fontFamily: "poppins-regular",
                    color: "#00CFC5",
                    paddingLeft: "10px",
                  }}
                >
                  Add More
                </span>
              </Button>
            )}
          </Box>
        </Box>
      ))}
    </form>
  );
};

export default MultiPersons;
