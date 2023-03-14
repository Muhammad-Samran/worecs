import {
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import logo from "../../assets/dashboard/logo.svg";
import { ReactComponent as Notification } from "../../assets/dashboard/bell.svg";
import Home from "../../assets/icons/home.svg";
import Notifications from "../../assets/icons/notifications.svg";
import Shopping from "../../assets/icons/shopping.svg";
import { BsChevronDown } from "react-icons/bs";
import { routes } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../store/actions/alertActions";
import { Logout } from "../../store/actions/authActions";
import { editCompany } from "../../store/actions/companyActions";
import { RiHome2Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import ChangePasswordModal from "../../../src/components/candidate_screens/profile/Modal/change-password";

const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [changePassword, setChangePassword] = React.useState(false);
  const company = useSelector((state) => state?.company);
  const auth = useSelector((state) => state?.auth);
  const profiles = useSelector((state) => state?.rprofile);
  const pricing = useSelector((state) => state?.pricing);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenu = Boolean(anchorEl2);
  const isCartMenu = Boolean(anchorEl3);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNotification = () => {
    setAnchorEl2(null);
  };
  const handleCloseCart = () => {
    setAnchorEl3(null);
  };
  const profile = () => {
    navigate(
      auth?.user === "candidate" ? routes.CANDIDATE_PROFILE : routes.PROFILE
    );
    setAnchorEl(null);
  };
  const logout = () => {
    dispatch(Logout()).then(() => {
      navigate(routes.LOGIN);
    });

    setAnchorEl(null);
  };
  const editCompanyy = () => {
    dispatch(editCompany(company.allCompany.results.uuid)).then(() => {
      navigate(routes.COMPANY);
    });

    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileNotificationOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleCartMenu = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const renderNotification = (
    <Menu
      sx={{ width: 420, maxWidth: "100%" }}
      anchorEl={anchorEl2}
      open={isNotificationMenu}
      onClose={handleCloseNotification}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuList>
        <MenuItem>Notifications are inProgress!</MenuItem>
        {/* <MenuItem>Someone Liked Your Profile</MenuItem>
        <MenuItem>Someone Liked Your Profile</MenuItem>

        <MenuItem>Someone Liked Your Profile</MenuItem> */}
      </MenuList>
    </Menu>
  );
  const renderCart = (
    <Menu
      sx={{ width: 420, maxWidth: "100%" }}
      anchorEl={anchorEl3}
      open={isCartMenu}
      onClose={handleCloseCart}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MenuList>
        <MenuItem>
          Price: <b> {pricing?.price?.toFixed(2)}</b>
        </MenuItem>
      </MenuList>
    </Menu>
  );
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profile}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          setChangePassword(true);
        }}
      >
        Change Password
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}

      {auth?.user !== "candidate" && (
        <MenuItem onClick={editCompanyy}>Company Detail</MenuItem>
      )}

      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box className={styles.header}>
        <Box as="nav">
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={12} sm={6}>
              {/* <img src={logo} alt="logo" /> */}
              <Typography component={"h4"}>
                {auth?.user === "recruitment"
                  ? company?.allCompany?.results?.name || "Company Name"
                  : ""}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12} sm={6}
              // paddingRight={1.7}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <IconButton sx={{ fontSize: "1rem", padding: "11px" }}>
                <Link
                  to={
                    auth?.user === "recruitment"
                      ? "/dashboard/activity"
                      : "/dashboard/candidate"
                  }
                >
                  <img src={Home} className={styles.homebtn} />
                </Link>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                className={styles.notification}
                onClick={handleProfileNotificationOpen}
              >
                <Badge badgeContent={0} color="error">
                  <img src={Notifications} className={styles.homebtn} />
                </Badge>{" "}
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                className={styles.notification}
                onClick={handleCartMenu}
              >
                <Badge badgeContent={0} color="error">
                  <img src={Shopping} className={styles.homebtn} />
                </Badge>{" "}
              </IconButton>
              <Box
                marginLeft={1.5}
                onClick={handleProfileMenuOpen}
                className={styles.profileMenu}
              >
                <Typography variant="h5">
                  {profiles?.profile?.results?.first_name}
                </Typography>
                <BsChevronDown />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {renderMenu}
        {renderNotification}
        {renderCart}
        <ChangePasswordModal
          openModal={changePassword}
          setOpenModal={setChangePassword}
        />
      </Box>
    </>
  );
};

export default Header;
