import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import add from "../../../assets/industries/add.svg";
import eng from "../../../assets/industries/eng.svg";
import gig from "../../../assets/industries/gig.svg";
import health from "../../../assets/industries/health.svg";
import hospital from "../../../assets/industries/hospital.svg";
import req from "../../../assets/industries/req.svg";
import shop from "../../../assets/industries/shop.svg";
import transport from "../../../assets/industries/transport.svg";
import CustomModel from "../model/index";
import IndustryModels from "../industrysections/model/index";
import real from "../../../assets/industries/real.svg";
import InfoSection from "../InfoSection";
import CreateSection from "../createSection";
import SingleIndustry from "../singleIndustry/index";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIndustry,
  editIndustry,
  resetModel,
  singleIndustry,
  StatusChange,
} from "../../../store/actions/industryActions";
import { ImCross } from "react-icons/im";
import {
  AiFillCloseCircle,
  AiFillEdit,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsFillCircleFill } from "react-icons/bs";
import DeleteModel from "../../common/DeleteModal";
import SecuritySection from "../industrysections/security/SecuritySection";
import data from "./data";
import { routes } from "../../../routes";
import { Link } from "react-router-dom";

const Industry = () => {
  const adminIndustryList = useSelector((state) => state?.industry);
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  const sortData = adminIndustryList?.industryList?.results?.data?.sort(
    (b, a) => b.id - a.id
  );

  const sortDataCreate =
    adminIndustryList?.createdIndustries?.results?.data?.sort(
      (b, a) => b.id - a.id
    );

  // for model one
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [deleteSelect, setDeleteSelect] = React.useState("");
  const handleOpen = (set) => set(true);

  const openDetail = (item, i) => {
    dispatch(singleIndustry(item?.uuid)).then(() => {
      setOpen3(true);
      setSelected(i);
    });
  };
  // const list = [
  //   { name: "Real Estate", Icon: real },
  //   { name: "Hospitality", Icon: hospital },

  //   { name: "Gig Economy", Icon: gig },
  //   { name: "Healthcare", Icon: health },
  //   { name: "Recruitment", Icon: req },
  //   { name: "Transport & Logistics", Icon: transport },
  //   { name: "Aged Care & NDIS", Icon: shop },
  //   { name: "Engineering", Icon: eng },
  //   { name: "Advertisment", Icon: add },
  // ];
  useEffect(() => {
    !open2 && dispatch(resetModel());
  }, [open2]);

  const deleteCreatedIndustry = (item, id) => {
    dispatch(deleteIndustry(item?.uuid, id));
  };
  const openDelteModal = (item) => {
    setDeleteOpen(true);
    setDeleteSelect(item?.id);
  };
  const EditIndustry = async (item) => {
    dispatch(editIndustry(item?.uuid)).then((e) => setOpen2(true));
  };
  const statusChange = async (item) => {
    dispatch(
      StatusChange(
        {
          uuid: item?.uuid,
          recruitment_industry_status: item?.recruitment_industry_status
            ? 0
            : 1,
        },
        auth?.workspace_id
      )
    );
  };
  const restFucntion = () => {
    dispatch(resetModel());
  };

  useEffect(() => {}, []);
  return (
    <>
      <Box className={styles.parent}>
        <Typography variant="h4">Industry</Typography>
        <Box className={styles.gridSystem}>
          <Grid container spacing={2}>
            {/*  {rows === undefined && rcandidate.loading ? (
                <div>loading...</div>
              ) : rows === undefined && !rcandidate.loading ? (
                <div>Somthing Went Worng</div>
              ) : rows?.length === 0 ? (
                <div>no data...</div> */}
            {sortData === undefined && adminIndustryList.industryLoading ? (
              <Box
                style={{
                  postion: "relative",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <CircularProgress
                  style={{ color: "black", textAlign: "center" }}
                />
              </Box>
            ) : sortData === undefined && !adminIndustryList.industryLoading ? (
              <Box>Something Went Wrong</Box>
            ) : sortData?.length === 0 ? (
              <Box></Box>
            ) : (
              sortData?.map((e, i) => (
                <React.Fragment key={e?.id}>
                  <Grid item md={6} xs={12} lg={4} key={i}>
                    <Box
                      className={`${styles.boxName} ${
                        auth?.results?.company_detail?.industry?.id === e?.id &&
                        styles.activeBox
                      }`}
                      onClick={() => {
                        openDetail(e, i);
                        dispatch(resetModel());
                      }}
                    >
                      <Box className={styles.imageBox}>
                        <img
                          src={
                            e?.icon
                              ? process.env.REACT_APP_URL + "/" + e?.icon
                              : real
                          }
                          alt={e?.name}
                        />
                      </Box>
                      <Typography variant="h4">{e?.name}</Typography>
                    </Box>
                  </Grid>
                  {selected === i && (
                    <IndustryModels open={open3} setOpen={setOpen3}>
                      <SecuritySection
                        open={open3}
                        setOpen={setOpen3}
                        removedButton={true}
                        // Data={IndustryData[selected]}
                      />
                      {/* <InfoSection removedButton={true} /> */}
                    </IndustryModels>
                  )}
                </React.Fragment>
              ))
            )}
          </Grid>
        </Box>
        <Box className={styles.contactUs}>
          <span>
            If your industry is not available please email customer support with
            the industry{"  "}
            <a href="mailto:support@worecs.com.au" target="_blank">
              support@worecs.com.au
            </a>
          </span>
        </Box>
        {/* {adminIndustryList?.createdIndustries?.results?.data?.length > 0 && (
          <>
            <Typography variant="h4">New Industry</Typography>
            <Box className={styles.gridSystem}>
              <Grid container spacing={2}>
                {sortDataCreate === undefined &&
                adminIndustryList.createdLoading ? (
                  <Box>
                    <CircularProgress />
                  </Box>
                ) : sortDataCreate === undefined &&
                  !adminIndustryList.createdLoading ? (
                  <Box></Box>
                ) : sortDataCreate?.length === 0 ? (
                  <Box></Box>
                ) : (
                  sortDataCreate.map((e, i) => (
                    <React.Fragment key={e?.id}>
                      <Grid item md={6} xs={12} lg={4} key={i}>
                        <Box className={styles.boxName}>
                          {e?.is_user_defined === 0 && (
                            <>
                              <Box
                                className={styles.hoverDelete}
                                onClick={() => openDelteModal(e)}
                              >
                                <AiFillCloseCircle
                                  style={{ fontSize: "18px" }}
                                />
                              </Box>
                              <Box
                                className={styles.hoverEdit}
                                onClick={() => EditIndustry(e)}
                              >
                                <AiFillEdit style={{ fontSize: "18px" }} />
                              </Box>

                              {deleteSelect === e?.id && (
                                <DeleteModel
                                  deleteOpen={deleteOpen}
                                  setDeleteOpen={setDeleteOpen}
                                  item={e}
                                  deleteName={"industry"}
                                  workspaceId={auth?.results?.workspace_id}
                                  deleteFunc={deleteCreatedIndustry}
                                  deletedName={adminIndustryList}
                                  restFucntion={restFucntion}
                                />
                              )}
                            </>
                          )}

                          <Box className={styles.imageBox}>
                            <img src={real} alt={e?.name} />
                          </Box>
                          <Typography variant="h4">{e?.name}</Typography>
                        </Box>
                      </Grid>
                    </React.Fragment>
                  ))
                )}
              </Grid>
            </Box>
          </>
        )}
        <Box className={styles.createOwn}>
          <Typography variant="h4">Create Your Own Industry</Typography>
          {adminIndustryList?.createdIndustries?.results?.data?.length < 0 && (
            <Typography>
              Currently, No Sector Is Added By you. Lets Add Your Own Industry
              And Relevant Forms
            </Typography>
          )}

          <Box className={`${styles.button} button-primary`}>
            <Button onClick={() => handleOpen(setOpen)}>Add New</Button>
            <CustomModel open={open} setOpen={setOpen}>
              <InfoSection setOpen2={setOpen2} setOpen={setOpen} />
            </CustomModel>
            <CustomModel open={open2} setOpen={setOpen2}>
              <CreateSection setOpen={setOpen2} />
            </CustomModel>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default Industry;
