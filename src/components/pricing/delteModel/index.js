import React, { useState } from "react";
import TextInput from "../../common/TextInput/index";
import "./styles.scss";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import {
  deleteSubs,
  resetPricing,
  verifyCopoun,
} from "../../../store/actions/pricingActions";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";
import { routes } from "../../../routes";

const InterviewPopup = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pricing = useSelector((state) => state?.pricing);

  const delteFuntion = () => {
    if (pricing?.isLoading) {
      return;
    }
    dispatch(deleteSubs()).then(() => {
      setOpen(false);
      navigate(routes?.DASHBOARD);
    });
  };

  return (
    <>
      <Box style={{ width: "100%" }} className={"parentxy"}>
        <h3>Are you sure you want to Unsubscribe? </h3>
        <Box className={`button-primary  buttondelete`}>
          <Button onClick={() => delteFuntion()}>Confirm</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Box>
      </Box>
    </>
  );
};

export default InterviewPopup;
