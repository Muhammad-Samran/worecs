import { Grid, Box, Typography, Button } from "@mui/material";

import React, { useEffect, useState } from "react";
import SelectSection from "../../common/single-candidate";
import styles from "./styles.module.scss";
import { ReactComponent as Girl } from "../../../assets/candidates/girl.svg";
import boy from "../../../assets/sidebar/boy.svg";
import SingleCandidateTabel from "../single-candidate-table";
import PopupForm from "../single-candidate-model/index";
import ReffernceAdd from "../reffernce-add/index";
import ReffernceAdd2 from "../reference/index";
import CertificateAdd from "../certificates-add/index";
import Interview from "../popup-interview/index";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../../routes";
import { Navigate, useParams } from "react-router-dom";
import { ShowCandidateFunc } from "../../../store/actions/recruiterCandidateActions";
import {
  getAllRecruiterCandidateCertificates,
  getAllRecruiterCandidateReff,
  getAllRecruiterInterview,
  resetSingleCandidateReff,
} from "../../../store/actions/singleCandidateScreenActions";
import { AiOutlinePlus } from "react-icons/ai";
import {
  getCandidateFormDetail,
  getCandidateFormDetail2,
  getCandidateFormDetail3,
  getCandidateFormDetail4,
} from "../../../store/actions/applyJobActions";
import ViewResume from "../upload-resume/ViewResume";
import { showResume } from "../../../api/uploadFile/uploadFile.class";
import useWindowDimensions from "../../../customHooks/useWindowDimensions";
const Candidate = () => {
  const [open, setOpen] = useState(false);
  const [openReff, setOpenReff] = useState(false);
  const [openReff2, setOpenReff2] = useState(false);
  const [openCertificate, setOpenCertificate] = useState(false);
  const candidate = useSelector((state) => state?.rcandidate);
  const auth = useSelector((state) => state?.auth);
  const singleCandidate = useSelector((state) => state?.singleCandidate);
  const candidateID = JSON?.parse(localStorage?.getItem("candidateID"));
  const applyjobs = useSelector((state) => state?.applyJob);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [viewResume, setViewResume] = useState(false);

  const uuid = useParams().uuid;
  useEffect(() => {
    dispatch(ShowCandidateFunc(uuid));
    dispatch(
      getCandidateFormDetail({
        uuid: uuid,
        recruiter_id: auth?.results?.recruiter_id,
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
        form_category_name: "Job Offer Letter",
      })
    );
    dispatch(
      getCandidateFormDetail2({
        uuid: uuid,
        recruiter_id: auth?.results?.recruiter_id,
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
        form_category_name: "Application Form",
      })
    );
    dispatch(
      getCandidateFormDetail3({
        uuid: uuid,
        recruiter_id: auth?.results?.recruiter_id,
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
        form_category_name: "Induction Form",
      })
    );
    dispatch(
      getCandidateFormDetail4({
        uuid: uuid,
        recruiter_id: auth?.results?.recruiter_id,
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
        form_category_name: "Miscellaneous Form",
      })
    );
  }, [uuid, dispatch]);

  //   Job Offer Letter
  // Application Form
  // Induction Form
  // Miscellenous Form

  useEffect(() => {
    dispatch(
      getAllRecruiterCandidateCertificates({
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
      })
    );
    dispatch(
      getAllRecruiterCandidateReff({
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
      })
    );
    dispatch(
      getAllRecruiterInterview({
        candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
      })
    );
  }, []);

  useEffect(() => {
    if (singleCandidate?.editCertificate?.success) {
      setOpenCertificate(true);
    }
  }, [singleCandidate?.editCertificate]);

  useEffect(() => {
    if (singleCandidate?.editInterView?.success) {
      setOpen(true);
    }
  }, [singleCandidate?.editInterView]);

  // if (!candidate.showCandidate?.results) {
  //   return <Navigate to={routes.ALL_CANDIDATES} replace />;
  // }
  const information = [
    {
      label: `Email Address`,
      ans: candidate?.showCandidate?.results?.email,
    },
    {
      label: `Contact #`,
      ans: candidate?.showCandidate?.results?.contact_number,
    },

    {
      label: `Organization`,
      ans:
        candidate?.showCandidate?.results?.candidate_detail?.company_name || "",
    },
    {
      label: `Job Role`,
      ans: candidate?.showCandidate?.results?.candidate_detail?.job_title || "",
    },
  ];
  return (
    <Box className={styles.candidate}>
      <Grid container spacing={2}>
        <Grid item md={8} lg={8} xs={12}>
          <Box className={styles.header}>
            <Typography variant="h4">Candidate</Typography>
            <Typography>
              {candidate?.showCandidate?.results?.worecs_id?.toUpperCase()}
            </Typography>
            {width < 901 && (
              <Box className={styles.profileBox}>
                <Box className={styles.imageBox}>
                  <Box className={styles.imageBox2}>
                    <Box className={styles.imageContainer}>
                      <img
                        src={
                          candidate?.showCandidate?.results?.profile_image
                            ? `${process.env.REACT_APP_URL}${candidate?.showCandidate?.results?.profile_image}`
                            : boy
                        }
                        alt="Recruiter"
                      />
                    </Box>
                    <Box className={styles?.imageBox}>
                      {candidate?.showCandidate?.results?.candidate_resume && (
                        <Typography
                          className={styles?.a}
                          onClick={() => setViewResume(true)}
                        >
                          View Resume
                        </Typography>
                      )}
                      {candidate?.showCandidate?.results?.candidate_resume && (
                        <a
                          // href={`data:application/pdf;base64,${candidate?.showCandidate?.results?.candidate_resume?.resume_path}`}
                          href={`${process.env.REACT_APP_URL}${candidate?.showCandidate?.results?.candidate_resume?.resume_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={`data:application/pdf;base64,${candidate?.showCandidate?.results?.candidate_resume?.preview_resume_path}`}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          Download
                        </a>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="h5" style={{ paddingLeft: "0px" }}>
                    {" "}
                    {candidate?.showCandidate?.results?.first_name +
                      " " +
                      candidate?.showCandidate?.results?.last_name || "Name"}
                  </Typography>
                </Box>
                <Box className={styles.info}>
                  {information?.map(
                    (e, i) =>
                      e.ans !== "" && (
                        <Box className={styles.infoSection} key={i}>
                          <Typography variant="h5">{e?.label}</Typography>
                          <Typography style={{ margin: "10px 0" }}>
                            {e?.ans}
                          </Typography>
                        </Box>
                      )
                  )}
                </Box>
              </Box>
            )}
            <Box className={styles.selectBox1}>
              <SelectSection
                title={"Job Offer Letter"}
                cata={"Job Offer Letter"}
                results={applyjobs?.candidateForm1}
                uuid={uuid}
                des={"Select a form from the dropdown menu "}
                des2={`You have sent the offer letter to candidate.`}
                id={1}
              />
            </Box>
            <Box className={styles.selectBox2}>
              <SelectSection
                title={"Application Form"}
                cata={"Application Form"}
                results={applyjobs?.candidateForm2}
                uuid={uuid}
                des={
                  "Select any one application form from the options below. if the relevant form is Not Available, kindly go back to forms tab & create or upload a new one."
                }
                des2={`You have sent the  application form to candidate.`}
                id={2}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} lg={4} xs={12}>
          {width > 901 && (
            <Box className={styles.profileBox}>
              <Box className={styles.imageBox}>
                <Box className={styles.imageBox2} paddingLeft={2.5}>
                  <Box className={styles.imageContainer}>
                    <img
                      src={
                        candidate?.showCandidate?.results?.profile_image
                          ? `${process.env.REACT_APP_URL}${candidate?.showCandidate?.results?.profile_image}`
                          : boy
                      }
                      alt="Recruiter"
                    />
                  </Box>
                  <Box className={styles?.imageBox}>
                    {candidate?.showCandidate?.results?.candidate_resume && (
                      <Typography
                        className={styles?.a}
                        onClick={() => setViewResume(true)}
                      >
                        View Resume
                      </Typography>
                    )}
                    {candidate?.showCandidate?.results?.candidate_resume && (
                      <a
                        // href={`data:application/pdf;base64,${candidate?.showCandidate?.results?.candidate_resume?.resume_path}`}
                        href={`${process.env.REACT_APP_URL}${candidate?.showCandidate?.results?.candidate_resume?.resume_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={`data:application/pdf;base64,${candidate?.showCandidate?.results?.candidate_resume?.preview_resume_path}`}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Download
                      </a>
                    )}
                  </Box>
                </Box>
                <Typography variant="h5">
                  {" "}
                  {candidate?.showCandidate?.results?.first_name +
                    " " +
                    candidate?.showCandidate?.results?.last_name || "Name"}
                </Typography>
              </Box>
              <Box className={styles.info}>
                {information?.map(
                  (e, i) =>
                    e.ans !== "" && (
                      <Box className={styles.infoSection} key={i}>
                        <Typography variant="h5">{e?.label}</Typography>
                        <Typography>{e?.ans}</Typography>
                      </Box>
                    )
                )}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Box className={styles.tabelSection}>
        <Box className={styles.table1}>
          <Box className={styles.table1a}>
            <Typography variant="h4">References</Typography>
            <Box className={`${styles.buttons} button-primary`}>
              <button
                // className={styles.addTabel}
                onClick={() => {
                  setOpenReff(true);
                  dispatch(resetSingleCandidateReff());
                }}
              >
                Request References from Candidate
              </button>
              <button
                // className={styles.addTabel}
                className="secondary-btn"
                onClick={() => {
                  setOpenReff2(true);
                  dispatch(resetSingleCandidateReff());
                }}
              >
                Add References Manually
              </button>
              {/* <AiOutlinePlus /> */}
            </Box>
          </Box>
          <SingleCandidateTabel
            uuid={uuid}
            titles={[
              "ID",
              " Name",
              "Phone Number",
              "Email Address",
              " Job Title",
              " Status",
              "Actions",
            ]}
            value={1}
            rows={singleCandidate?.singleCandidateReff?.results?.data}
          />
        </Box>
        <Box className={styles.table1}>
          <Box className={styles.table1a}>
            <Typography variant="h4">Licenses & Certification</Typography>
            <Box
              className={`${styles.buttons} button-primary`}
              onClick={() => {
                dispatch(resetSingleCandidateReff());
                setOpenCertificate(true);
              }}
            >
              {/* <AiOutlinePlus /> */}
              <button className="secondary-btn"> Add More</button>
            </Box>
          </Box>

          <SingleCandidateTabel
            className={styles.titleth}
            titles={[
              "Industries Name",
              "License Name",
              "Request Date",
              "Verification Status",
              "Actions",
            ]}
            value={2}
            rows={singleCandidate?.singleCandidateCertificates?.results?.data}
          />
        </Box>
      </Box>
      <Box className={styles.list}>
        <Box className={styles.selectBox1}>
          <SelectSection
            cata={"Induction Form"}
            results={applyjobs?.candidateForm3}
            uuid={uuid}
            id={3}
            title={"Induction Form"}
            des={
              "Select any one application form from the options below. if the relevant form is Not Available, kindly go back to forms tab & create or upload a new one."
            }
          />
        </Box>
        <Box className={styles.selectBox2}>
          <SelectSection
            title={"Miscellaneous Form"}
            cata={"Miscellaneous Form"}
            results={applyjobs?.candidateForm4}
            uuid={uuid}
            id={4}
            des={`Select any one application form from the options below. if the relevant form is Not Available, kindly go back to forms tab & create or upload a new one.`}
          />
        </Box>
        <Box className={styles.calendarBox}>
          <Typography variant="h4">Interviews</Typography>
          <Typography variant="h6">Click below to Schedule</Typography>
          <Box className={`button-primary ${styles.button}`}>
            <Button
              onClick={() => {
                dispatch(resetSingleCandidateReff());
                setOpen(true);
              }}
            >
              Schedule
            </Button>
          </Box>
          <SingleCandidateTabel
            titles={[
              "Subject",
              "Time",
              "Date",
              " Location",
              "Status",
              "Actions",
            ]}
            rows={singleCandidate?.singleCandidateInterview?.results?.data}
            value={3}
            interview={true}
          />

          <PopupForm open={open} setOpen={setOpen} disableCross={true}>
            <Interview open={open} setOpen={setOpen} />
          </PopupForm>
          <PopupForm
            open={openCertificate}
            setOpen={setOpenCertificate}
            disableCross={true}
          >
            <CertificateAdd
              open={openCertificate}
              setOpen={setOpenCertificate}
            />
          </PopupForm>
          <PopupForm open={openReff} setOpen={setOpenReff} disableCross={true}>
            <ReffernceAdd open={openReff} setOpen={setOpenReff} />
          </PopupForm>

          <ReffernceAdd2 open={openReff2} setOpen={setOpenReff2} />
          <ViewResume
            openModal={viewResume}
            setOpenModal={setViewResume}
            resume={candidate?.showCandidate?.results?.candidate_resume}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Candidate;
