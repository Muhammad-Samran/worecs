import React, { useState } from "react";
import { Box, Button, Step, Stepper, Typography } from "@mui/material";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import Section1 from "../section1";
import Section2 from "../section2";
import Section3 from "../section3";
import { routes } from "../../../routes";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";

const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

const Main = ({ active, setActive }) => {
  const [data, setData] = useState({});
  const navigation = useNavigate();
  const [functionCall, setfucntion] = useState(false);
  const dispatch = useDispatch();
  const [diabled, isDisabled] = React.useState(false);
  const ChangeEvent = () => {
    if (!data?.type) {
      return dispatch(ShowAlert("Please select the one of this", "error"));
    }
    if (active === 1) {
      setfucntion(true);
      if (
        !data?.first_name ||
        !data?.last_name ||
        !data?.email ||
        !data?.password ||
        !data?.contact_number ||
        !data?.password_confirmation
      ) {
        return dispatch(
          ShowAlert(
            "Please fill all the required fields to go further",
            "error"
          )
        );
      }
    }
    if (active === steps.length - 1) {
      isDisabled(true);
      navigation(routes.LOGIN);
      localStorage.removeItem("section-no");
    }
    setActive((prev) => prev + 1);
    localStorage.setItem("section-no", active + 1);
  };
  const back = () => {
    setActive((prev) => prev - 1);
    localStorage.setItem("section-no", active - 1);
  };
  return (
    <Box className={styles.mainHead}>
      <Box className={styles.content}>
        <Typography variant="h2">
          Welcome to  Worecs! 
        </Typography>

        <Stepper activeStep={active} alternativeLabel>
          {steps.map((label, index) => (
            <Step
              key={label}
              className={`  ${active === index ? "indicator-box1" : ""}
            ${active === 2 ? "indicator-box2" : ""}`}
            >
              <div
                className={`${styles.boxParent} ${
                  active === index ? styles.active : ""
                }
                
                  `}
              >
                <div className={styles.boxStep}></div>
              </div>
            </Step>
          ))}
        </Stepper>
        {active === 0 ? (
          <Section1 data={data} setData={setData} />
        ) : active === 1 ? (
          <Section2
            data={data}
            setData={setData}
            active={active}
            setActive={setActive}
          />
        ) : active === 2 ? (
          <Section3 data={data} setData={setData} />
        ) : (
          ""
        )}

        {diabled ? (
          ""
        ) : (
          <>
            {active === 0 && (
              <Box className={styles.buttonNext}>
                <Button onClick={ChangeEvent}>
                  <BsChevronRight />
                </Button>
              </Box>
            )}
          </>
        )}
        {active !== 0 && (
          <Box className={styles.buttonPrev}>
            <Button onClick={back}>
              <BsChevronLeft />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Main;
