import React, { useState } from "react";

import TextInput from "../../common/TextInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CustomSelect from "../../common/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  createSingleCertificateFunc,
  createSingleReffFunc,
  getAllRecruiterCandidateReff,
  resetSingleCandidate,
  resetSingleCandidateReff,
  updateSingleCertificateFunc,
  updateSingleInterviewFunc,
} from "../../../store/actions/singleCandidateScreenActions";
import { useEffect } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import { getAllRecruiterCreatedIndustry } from "../../../store/actions/recruiterCandidateActions";
import {
  getCandidateFormDetail,
  getCandidateFormDetail2,
  getCandidateFormDetail3,
  getCandidateFormDetail4,
  getCandidateFormSelect,
  reqCandidateFormDetail,
  reqCandidateFormDetail2,
  reqCandidateFormDetail3,
  reqCandidateFormDetail4,
  reqCandidateFormDetail5,
} from "../../../store/actions/applyJobActions";

const InterviewPopup = ({
  open,
  setOpen,
  cata,
  id,
  uuid,
  results,
  candidate_reference_id,
}) => {
  const dispatch = useDispatch();
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const applyJobs = useSelector((state) => state?.applyJob);
  const candidate = useSelector((state) => state?.rcandidate);
  const candidateID = JSON.parse(localStorage.getItem("candidateID"));
  const auth = useSelector((state) => state?.auth);
  const options = applyJobs?.selectForms?.results?.map((e) => {
    return { label: e?.name, value: e?.id };
  });

  const [values, setValues] = useState({
    form_builder_id: "",
  });
  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "form_builder_id":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          break;
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
      dispatch(ShowAlert("Please select one option", "error"));
      return;
    }

    const localData = {
      form_builder_id: values?.form_builder_id?.value,
      uuid: uuid,
      recruiter_id: auth?.results?.recruiter_id,
      candidate_id: candidate?.showCandidate?.results?.id || candidateID,
      workspace_id: auth?.results?.workspace_id,
      form_category_name: cata,
    };
    if (id === 1) {
      dispatch(reqCandidateFormDetail(localData)).then(() => {
        dispatch(
          getCandidateFormDetail({
            uuid: uuid,
            recruiter_id: auth?.results?.recruiter_id,
            candidate_id: candidate?.showCandidate?.results?.id || candidateID,
            workspace_id: auth?.results?.workspace_id,
            form_category_name: "Job Offer Letter",
          })
        );

        setOpen(false);
      });
    } else if (id === 2) {
      dispatch(reqCandidateFormDetail2(localData)).then(() => {
        dispatch(
          getCandidateFormDetail2({
            uuid: uuid,
            recruiter_id: auth?.results?.recruiter_id,
            candidate_id: candidate?.showCandidate?.results?.id || candidateID,
            workspace_id: auth?.results?.workspace_id,
            form_category_name: "Application Form",
          })
        );
        setOpen(false);
      });
    } else if (id === 3) {
      dispatch(reqCandidateFormDetail3(localData)).then(() => {
        dispatch(
          getCandidateFormDetail3({
            uuid: uuid,
            recruiter_id: auth?.results?.recruiter_id,
            candidate_id: candidate?.showCandidate?.results?.id || candidateID,
            workspace_id: auth?.results?.workspace_id,
            form_category_name: "Induction Form",
          })
        );
        setOpen(false);
      });
    } else if (id === 4) {
      dispatch(reqCandidateFormDetail4(localData)).then(() => {
        dispatch(
          getCandidateFormDetail4({
            uuid: uuid,
            recruiter_id: auth?.results?.recruiter_id,
            candidate_id: candidate?.showCandidate?.results?.id || candidateID,
            workspace_id: auth?.results?.workspace_id,
            form_category_name: "Miscellaneous Form",
          })
        );
        setOpen(false);
      });
    } else if (id === 5) {
      dispatch(
        reqCandidateFormDetail5({
          ...localData,
          candidate_reference_id: candidate_reference_id,
        })
      ).then(() => {
        dispatch(
          getAllRecruiterCandidateReff({
            candidate_id: candidate?.showCandidate?.results?.id || candidateID,
            workspace_id: auth?.results?.workspace_id,
          })
        );

        setOpen(false);
      });
    } else {
    }
  };

  return (
    <>
      <Box className="interviewParrent">
        <Typography variant="h3">{cata}</Typography>
        <form onSubmit={submitData}>
          <Box>
            <CustomSelect
              options={options}
              name="form_builder_id"
              label={cata}
              customClass={"interviewSelect"}
              value={values?.form_builder_id}
              onChange={(e) => {
                setValues({ ...values, form_builder_id: e });
              }}
              onFocus={() => {
                dispatch(
                  getCandidateFormSelect({
                    workspace_id: auth?.results?.workspace_id,
                    form_category_name: cata,
                  })
                );
              }}
            />
          </Box>

          <Box className="button-primary buttoninterview">
            <Button
              className="secondary-btn"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={submitData} disabled={applyJobs?.isLoading}>
              {results === null && applyJobs?.isLoading === true ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                "Send"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default InterviewPopup;
