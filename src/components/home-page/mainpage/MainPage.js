import {
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import ContactPopUp from "../contactpopup/ContactPopUp";
import Contact_Us from "../contactus/Contact_Us";
import CustomModel from "../model/index";
import "./style.css";


const MainPage = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen = (set) => set(true);

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate()
  return (
    <>
      <Grid className="main_one" container>
        <Grid className="main__O">
        <Grid item paddingTop={8} className="heading_content">
          <Box paddingBottom={1}>
            <Typography variant="h4" className="main_heading_content" align="center">
              Hire Your Way
            </Typography>
          </Box>
          <Box variant="h6">
            <Typography className="heading_para" align="center">
              Join the number 1 business administration <br/> workflow platform
            </Typography>
          </Box>
          {/* <Box className="heading_search">
            <Box>
              <InputBase
              className="heading_search_inp"
                id="input-with-sx"
                placeholder="james@bond.com"
                variant="standard"
              />
            </Box>
            <Box className="heading_btn_box">
              <ContactPopUp name="heading_btn" />
            
            </Box>
          </Box> */}
          <Box className="heading_search_btn_box">
            {/* <Button className="heading_search_btn" variant="contained">Request Demo</Button> */}
            <Button className="heading_search_btn" onClick={() => handleOpen(setOpen)}>Request Demo</Button>
            <CustomModel open={open} setOpen={setOpen}>
              <ContactPopUp setOpen2={setOpen2} setOpen={setOpen} />
            </CustomModel>
            <CustomModel open={open2} setOpen={setOpen2}>
              <ContactPopUp setOpen={setOpen2} />
            </CustomModel>
          </Box>
        </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
