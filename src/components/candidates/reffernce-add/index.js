import React, { useState } from "react";

import TextInput from "../../common/TextInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CustomSelect from "../../common/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  createSingleReffFunc,
  resetSingleCandidate,
  resetSingleCandidateReff,
} from "../../../store/actions/singleCandidateScreenActions";
import { useEffect } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import { REGEX } from "../../../customHooks/utils";

const InterviewPopup = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const candidate = useSelector((state) => state?.rcandidate);
  const singleCandidate = useSelector((state) => state?.singleCandidate);
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
            newError[key] = "fields is Required";
          } else if (value > 5) {
            newError[key] = "Value should be less then 5";
          }
        default:
      }
    }
    return newError;
  };

  const submitData = async (e) => {
    e.preventDefault();
    const validateSelect = validate(values);

    if (Object?.keys(validateSelect)?.length > 0) {
      setErrors(validateSelect);

      return;
    }
    const local_data = {
      no_references: values.reff,
      recruiter_id: auth?.results?.recruiter_id,
      workspace_id: auth?.results?.workspace_id,
      candidate_id: candidate?.showCandidate?.results?.id,
    };

    dispatch(
      createSingleReffFunc(local_data, {
        workspace_id: auth?.results?.workspace_id,
        candidate_id: candidate?.showCandidate?.results?.id,
      })
    );
  };
  useEffect(() => {
    if (singleCandidate?.createReff?.success === true) {
      setOpen(false);
      dispatch(resetSingleCandidateReff());
    }
  }, [singleCandidate?.createReff]);
  return (
    <>
      <Box className="interviewParrent">
        <Typography variant="h3">Enter Referee Details</Typography>
        <form onSubmit={submitData}>
          <TextInput
            type="number"
            name="no_refference"
            min="0"
            onKeyPress={(e) => {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E"
              ) {
                e.preventDefault();
              }
            }}
            label={"Reference"}
            placeholder="No of Reference"
            customClass={"inputInterview"}
            compolsory={true}
            value={values.reff}
            onChange={(e) => {
              setValues({ ...values, reff: e?.target?.value });
              if (Customerror.hasOwnProperty("reff")) {
                delete Customerror["reff"];
                setErrors(Customerror);
              }
            }}
          />
          {Customerror?.reff && (
            <p className="error-class">{Customerror?.reff}</p>
          )}
          <Box className="button-primary buttoninterview">
            <Button
              className="secondary-btn"
              onClick={() => {
                setOpen(false);
                dispatch(resetSingleCandidateReff());
              }}
            >
              Cancel
            </Button>
            <Button onClick={submitData} disabled={singleCandidate?.loading}>
              {singleCandidate?.loading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "  Send Invite"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default InterviewPopup;
