import { useSelect } from "@mui/base";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentPopup from "../components/common/PaymentPopup/index";
import ConfirmPopup from "../components/common/PaymentPopup/confirmBox";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import { routes } from "../routes";
import { ShowAlert } from "../store/actions/alertActions";
import { getCompany } from "../store/actions/companyActions";
import { refreshToken } from "../store/actions/authActions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company = useSelector((state) => state.company);
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const myPopup = JSON.parse(localStorage?.getItem("popup") || true);

  // const companylocalStorage=localStorage?.getItem('company')
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(refreshToken());
  // }, []);

  useEffect(() => {
    if (auth?.user === "recruitment") {
      if (!auth?.results?.company_detail?.name && !location?.state?.company) {
        // dispatch(ShowAlert("Please create company first", "error"));
        navigate(routes.COMPANY);
      }
    }
  }, [navigate, auth?.results?.company_detail]);
  useEffect(() => {
    if (
      auth?.results?.trial_use !== "1" &&
      auth?.results?.plan_status !== 1 &&
      myPopup
    ) {
      setOpen(true);
    }
  }, [auth?.results?.trial_use, auth?.results?.plan_status]);

  return (
    <>
      {auth?.user === "recruitment" && (
        <>
          <PaymentPopup open={open} setOpen={setOpen} setOpen2={setOpen2} />
          <ConfirmPopup open={open2} setOpen={setOpen2} />
        </>
      )}
      <Box>
        <SideBar />
        <Box className="hoc">
          {auth?.user === "recruitment" ? (
            auth?.results?.plan_status !== 1 &&
            auth?.results?.subscription_status !== 1 ? (
              <Box className="trail-header">
                {auth?.results?.trial_use !== "1" ||
                auth?.results?.remaining_days < 1 ? (
                  <Box className={`button-primary `} sx={{ margin: "0" }}>
                    <Button
                      className={"secondary-btn"}
                      onClick={() => {
                        if (auth?.results?.remaining_days) {
                          return;
                        }
                        setOpen2(true);
                      }}
                    >
                      {auth?.results?.remaining_days > 0
                        ? ` Trial Period : ${auth?.results?.remaining_days} days left`
                        : "   Start free trial "}
                    </Button>
                  </Box>
                ) : (
                  <Box className={`button-primary `} sx={{ margin: "0" }}>
                    <Button className={"secondary-btn"}>
                      Trial Period : {auth?.results?.remaining_days} days left
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <Header />
          <main className="content-box">
            <Outlet />
          </main>
        </Box>
      </Box>
    </>
  );
};

export default Home;
