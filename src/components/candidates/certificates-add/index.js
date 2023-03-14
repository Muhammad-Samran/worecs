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
  resetSingleCandidate,
  resetSingleCandidateReff,
  updateSingleCertificateFunc,
  updateSingleInterviewFunc,
} from "../../../store/actions/singleCandidateScreenActions";
import { useEffect } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import { getAllRecruiterCreatedIndustry } from "../../../store/actions/recruiterCandidateActions";

const InterviewPopup = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const candidate = useSelector((state) => state?.rcandidate);
  const singleCandidate = useSelector((state) => state?.singleCandidate);

  const optionsCreateIndustry = candidate?.createdIndustry?.results?.map(
    (parent) => ({
      label: parent?.name,

      options: parent?.industry_certification_license?.map((e) => {
        return { label: e?.name, value: e.id, parent: parent.id };
      }),
    })
  );
  const [values, setValues] = useState({
    createdIndustry:
      {
        label:
          singleCandidate?.editCertificate?.results
            ?.industry_certification_license?.name,
        value:
          singleCandidate?.editCertificate?.results
            ?.industry_certification_license?.id,
        parent:
          singleCandidate?.editCertificate?.results?.recruiter_industry?.id,
      } || "",
  });
  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "createdIndustry":
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
      return;
    }

    const local_data = {
      recruitment_industries: {
        recruitment_industry_1: {
          rec_ind_request_id: values?.createdIndustry?.parent.toString(),
          ind_cert_lic_request_id: values?.createdIndustry?.value.toString(),
        },
      },
      recruiter_id: auth?.results?.recruiter_id,
      workspace_id: auth?.results?.workspace_id,
      candidate_id: candidate?.showCandidate?.results?.id,
      request_type: "recruitment",
    };

    const local_data2 = {
      uuid: singleCandidate?.editCertificate?.results?.uuid,
      candidate_lic_cert_id:
        singleCandidate?.editCertificate?.results?.candidate_license?.id,
      recruitment_industries: {
        [singleCandidate?.editCertificate?.results?.id]: {
          rec_ind_request_id: values?.createdIndustry?.parent.toString(),
          ind_cert_lic_request_id: values?.createdIndustry?.value.toString(),
        },
      },
      recruiter_id: auth?.results?.recruiter_id,
      workspace_id: auth?.results?.workspace_id,
      candidate_id: candidate?.showCandidate?.results?.id,
      request_type: "recruitment",
    };

    if (singleCandidate?.editCertificate?.success === true) {
      dispatch(
        updateSingleCertificateFunc(local_data2, {
          workspace_id: auth?.results?.workspace_id,
          candidate_id: candidate?.showCandidate?.results?.id,
        })
      );
    } else {
      dispatch(
        createSingleCertificateFunc(local_data, {
          workspace_id: auth?.results?.workspace_id,
          candidate_id: candidate?.showCandidate?.results?.id,
        })
      );
    }
    // setValues("");
  };
  useEffect(() => {
    if (singleCandidate?.createCertificate?.success === true) {
      setOpen(false);
      dispatch(resetSingleCandidateReff());
    }
  }, [singleCandidate?.createCertificate]);
  useEffect(() => {
    if (singleCandidate?.updateCertificate?.success === true) {
      setOpen(false);
      dispatch(resetSingleCandidateReff());
    }
  }, [singleCandidate?.updateCertificate]);

  // useEffect(() => {
  //   return () => {
  //     console.log("return");
  //   };
  // }, []);

  return (
    <>
      <Box className="interviewParrent">
        <Typography variant="h3">Certificates</Typography>
        <form onSubmit={submitData}>
          <Box>
            <CustomSelect
              options={optionsCreateIndustry}
              customClass={"interviewSelect"}
              label={
                <>
                  Select Licenses & Certification
                  <span
                    style={{
                      color: "red",
                      marginLeft: "3px",
                      position: "relative",
                      display: "initial",
                    }}
                  >
                    *
                  </span>
                </>
              }
              onFocus={() => {
                dispatch(
                  getAllRecruiterCreatedIndustry({
                    workspace_id: auth?.results?.workspace_id?.toString(),
                    recruiter_id: auth?.results?.recruiter_id.toString(),
                    industry_id: auth?.results?.company_detail?.industry?.id,
                  })
                );
              }}
              onChange={(e) => {
                setValues({
                  ...values,
                  createdIndustry: { ...e, parent: e?.parent },
                });

                if (Customerror.hasOwnProperty("createdIndustry")) {
                  delete Customerror["createdIndustry"];
                  setErrors(Customerror);
                }
              }}
              value={values?.createdIndustry}
            />
            {Customerror?.createdIndustry && (
              <span>{Customerror?.createdIndustry}</span>
            )}
          </Box>

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
              ) : Object.keys(singleCandidate?.editCertificate)?.length > 0 ? (
                "Update"
              ) : (
                "Send Invite"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default InterviewPopup;
