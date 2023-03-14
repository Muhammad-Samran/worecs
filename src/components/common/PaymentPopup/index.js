import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import { useDispatch, useSelector } from "react-redux";
import image1 from "../../../assets/pricing/11.svg";
import image2 from "../../../assets/pricing/12.svg";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import { getTrail } from "../../../store/actions/pricingActions";

export default function FormDialog({ open, setOpen, setOpen2 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    localStorage.setItem("popup", false);
    setOpen(false);
  };
  const gotToPricing = () => {
    navigate(routes?.PRICING);
    localStorage.setItem("popup", false);
    setOpen(false);
  };
  const gettrailPeriod = () => {
    // dispatch(getTrail());
    setOpen2(true);
    localStorage?.setItem("popup", false);
    setOpen(false);
  };

  return (
    <>
      <Box className={"mdparent"}>
        <Dialog open={open} onClose={handleClose} className={styles.modelMail}>
          <DialogTitle>
            <Typography component={"h2"}>Payment</Typography>
          </DialogTitle>

          <DialogActions className={styles.buttonSection}>
            <Grid container spacing={2} className={styles.buttonSection2}>
              <Grid
                item
                xs={12}
                lg={auth?.results?.remaining_days < 1 ? 6 : 12}
                className={styles.buttonSection3}
              >
                <Box className={styles.box1}>
                  <img src={image2} onClick={() => gotToPricing()} />
                  <Typography component={"h5"}>Pay</Typography>
                </Box>
              </Grid>
              {auth?.results?.remaining_days < 1 && (
                <Grid item xs={12} lg={6} className={styles.buttonSection3}>
                  <Box className={styles.box1}>
                    <img src={image1} onClick={gettrailPeriod} />
                    <Typography component={"h5"}>Trial</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
