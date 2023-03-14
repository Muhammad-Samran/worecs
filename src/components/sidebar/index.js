import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import boy from "../../assets/sidebar/boy.svg";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Dashboard } from "../../assets/sidebar/dashboard.svg";
import { ReactComponent as Chart } from "../../assets/sidebar/chart.svg";
import { ReactComponent as Help } from "../../assets/sidebar/help.svg";
import { ReactComponent as Industry } from "../../assets/sidebar/industry.svg";
import { ReactComponent as Job } from "../../assets/sidebar/jobs.svg";
import { ReactComponent as Price } from "../../assets/sidebar/price.svg";
import { ReactComponent as Form } from "../../assets/sidebar/form.svg";
import { ReactComponent as User } from "../../assets/sidebar/users.svg";
import uploadicon from "../../assets/sidebar/uploadicon.png";
import { ReactComponent as Edit } from "../../assets/candidates/edit.svg";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { routes } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import CustomModel from "./model";
import useWindowDimensions from "../../customHooks/useWindowDimensions";
import { getProfile, resetModel } from "../../store/actions/profileActions";

const SideBar = () => {
  const [active, setActive] = useState(0);
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state?.rprofile);
  const { width } = useWindowDimensions();
  const [changeProfile, setChangeProfile] = useState(false);
  const mobile = width <= 992;
  const dispatch = useDispatch();
  const ref = useRef(true);
  let [con, setCon] = useState("");
  // console.log(con);
  useEffect(() => {
    // console.log(con);
    function handleClickOutside(event) {
      try {
        if (ref?.current && !ref?.current?.contains(event?.target)) {
          if (con === false) {
            setActive("");
          }
        }
      } catch (e) {}
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, con]);

  const sidebarItems = [
    {
      ulName: "Dashboard",
      icon: <Dashboard />,
      list: [
        // { name: "Activity", path: routes.DASHBOARD },
        // { name: "Members", path: routes.PROFILE },
      ],
      route: routes.DASHBOARD,
    },
    {
      ulName: "Industry",
      icon: <Industry />,
      list: [
        // { name: "Real Estate", path: routes.HOME },
        // { name: "Hospitality", path: routes.HOME },
        // { name: "Manufacturing", path: routes.HOME },
        // { name: "Gig Economy", path: routes.HOME },
        // { name: "Healthcare", path: routes.HOME },
        // { name: "Recruitment", path: routes.HOME },
        // { name: "Transport & Logistics", path: routes.HOME },
        // { name: "Aged Care & NDIS", path: routes.HOME },
      ],
      route: routes.INDUSTRY,
    },
    auth?.results?.workspace_type === "recruitment"
      ? {
          ulName: "Workspaces ",
          icon: <Chart />,
          list: [],
          route: routes.WORKSPACE,
        }
      : {},
    auth?.results?.workspace_type === "recruitment"
      ? {
          ulName: "Pricing",
          icon: <Price />,
          list: [
            { name: "Orders", path: routes.ORDER_LIST },

            auth?.results?.subscription_status === 1 && {
              name: "Subscription",
              path: routes.SUBSCRIPTION_GET,
            },
            auth?.results?.subscription_status === 1 && {
              name: "Upgrade Subscription",
              path: routes.SUBSCRIPTION_UPDATE,
            },
            auth?.results?.subscription_status === 1 && {
              name: "Cancel Subscription",
              path: routes.SUBSCRIPTION_DELETE,
            },
          ],
          route: routes.PRICING,
        }
      : {},
    {
      ulName: "Candidates",
      icon: <User />,
      list: [
        { name: "All Candidates", path: routes.ALL_CANDIDATES },
        { name: "New Request", path: routes.NEW_REQUEST },
      ],
      route: routes.CANDIDATE,
    },
    {
      ulName: "Interviews",
      icon: <Help />,
      route: routes.INTERVIEW,
    },
    // {
    //   ulName: "File",
    //   icon: <Form />,
    //   list: [
    //     { name: "All Files", path: routes.ALL_FILES },
    //     { name: "Archived Files", path: routes.ARCHIVED_FILES },
    //     { name: "Submission List", path: routes.SUB_FILE_LIST },
    //   ],
    //   route: routes.ALL_FILES,
    // },
    // {
    //   ulName: "File",
    //   icon: <Form />,
    //   list: [
    //     { name: "All Files", path: routes.ALL_FILES },
    //     // { name: "Create New Form", path: routes.CREATE_NEW_FORM },
    //     { name: "Archived Files", path: routes.ARCHIVED_FILES },
    //     { name: "Submission List", path: routes.SUB_FILE_LIST },
    //   ],
    //   route: routes.Files,
    // },
    {
      ulName: "Form Builder",
      icon: <Form />,
      list: [
        { name: "All", path: routes.FORMS },
        // { name: "Create New Form", path: routes.CREATE_NEW_FORM },
        { name: "Archived", path: routes.ARCHIVED },
        { name: "Draft", path: routes.DRAFT },
        { name: "Completed", path: routes.SUB_LIST },
      ],
      route: routes.FORMS,
    },
    {
      ulName: "Document Builder",
      icon: <Form />,
      list: [
        { name: "All ", path: routes.ALL_DOCUMENTS },
        { name: "Create ", path: routes?.CREATE_NEW_DOCUMENT },
        { name: "Archived", path: routes?.ALL_ARCHIVED },
      ],
      route: routes.ALL_DOCUMENTS,
    },
    {
      ulName: "Jobs",
      icon: <Job />,
      list: [],
      route: routes.JOBS,
    },
    {
      ulName: "Help Desk",
      icon: <Help />,
      list: [
        { name: "FAQS", path: routes.FAQS },
        { name: "Contact us", path: routes.CONTACT },
      ],
      route: routes.HELP_DESK,
    },
    {
      ulName: "Integrations",
      icon: <Job />,
      list: [],
      route: routes.INTEGRATIONS,
    },
  ];
  const candidatesItem = [
    {
      ulName: "Dashboard",
      icon: <Dashboard />,
      list: [
        // { name: "Activity", path: routes.DASHBOARD },
        // { name: "Members", path: routes.PROFILE },
      ],
      route: routes.CANDIDATE_DASHBOARD,
    },
    // {
    //   ulName: "Jobs",
    //   icon: <Job />,
    //   list: [
    //     // { name: "Activity", path: routes.DASHBOARD },
    //     // { name: "Members", path: routes.PROFILE },
    //   ],
    //   route: routes.CANDIDATE_JOBS,
    // },
    {
      ulName: "Profile",
      icon: <User />,
      list: [
        // { name: "Activity", path: routes.DASHBOARD },
        // { name: "Members", path: routes.PROFILE },
      ],
      route: routes.CANDIDATE_PROFILE,
    },
    {
      ulName: "Interviews",
      icon: <Help />,
      list: [
        // { name: "Activity", path: routes.DASHBOARD },
        // { name: "Members", path: routes.PROFILE },
      ],
      route: routes.CANDIDATE_INTERVIEW,
    },
    {
      ulName: "Form Completion Requests",
      icon: <Form />,
      list: [
        { name: "Requests List", path: routes.REQUEST_LIST },
        { name: "Submission List", path: routes.SUBMISSION_LIST },
      ],
      route: routes.REQUEST_LIST,
    },
    {
      ulName: "Reference",
      icon: <Chart />,
      route: routes.REF,
    },
    {
      ulName: "Certificates and Licenses",
      icon: <AiOutlineFileText color="gray" />,
      route: routes.CANDIDATE_LICENSE,
    },
    {
      ulName: "Help Desk",
      icon: <Help />,
      list: [
        { name: "FAQS", path: routes.FAQS },
        { name: "Contact us", path: routes.CONTACT },
      ],
      route: routes.FAQS,
    },
  ];
  const activeSlide = (index) => {
    if (active === index && mobile) {
      setCon(true);
      setActive("");
      return;
    }
    setCon(true);
    setTimeout(() => {
      setCon(false);
    }, 500);
    setActive(index);
    localStorage.setItem("item", index);
  };
  return (
    <>
      <CustomModel open={changeProfile} setOpen={setChangeProfile} />

      <Box className={styles.sidebar}>
        <Box className={styles.boxContent}>
          <Box className={styles.imageBox}>
            <Box
              className={styles.imageContainer}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(resetModel());
                setChangeProfile(true);
              }}
            >
              <Box className={styles.uploadIcon}>
                <Edit />
              </Box>
              <img
                src={
                  profile?.profile?.results?.profile_image
                    ? `${process.env.REACT_APP_URL}${profile?.profile?.results?.profile_image}`
                    : boy
                }
                alt="Recruiter"
              />
            </Box>
            {!mobile && (
              <Box>
                <Typography variant="h5">
                  {profile?.profile?.results?.first_name}
                </Typography>
                <Typography variant="h4">
                  {auth?.user !== "recruitment"
                    ? "Candidate"
                    : auth?.results?.workspace_type === "recruitment"
                    ? "Recruiter"
                    : "Member"}
                </Typography>
              </Box>
            )}
          </Box>
          <Box className={`${styles.sidebarContent} }`}>
            {(auth?.user === "recruitment"
              ? sidebarItems
              : candidatesItem
            )?.map(
              (item, index) =>
                Object.keys(item)?.length !== 0 && (
                  <React.Fragment key={index}>
                    <Box
                      className={styles.sidebarBox}
                      sx={{ position: "relative" }}
                      onClick={() => activeSlide(index)}
                    >
                      <NavLink
                        to={item?.route}
                        className={`${styles.navLink}  dashboardNavlink`}
                      >
                        <Box className={styles.menuBox}>
                          {item?.icon}
                          {!mobile && (
                            <>
                              <span>{item.ulName}</span>
                              <Box className={styles.arrow}>
                                {item?.list?.length > 0 ? (
                                  active === index ? (
                                    <BsChevronDown />
                                  ) : (
                                    <BsChevronRight />
                                  )
                                ) : (
                                  ""
                                )}
                              </Box>
                            </>
                          )}
                        </Box>
                      </NavLink>
                      {mobile && (
                        <>
                          <ul
                            ref={ref}
                            style={{
                              display:
                                active === index && item?.list?.length > 0
                                  ? "block"
                                  : "none",
                            }}
                            className={styles.mobileMenu}
                          >
                            <span>{item.ulName}</span>
                            {item?.list?.map((e, i) => (
                              <React.Fragment key={i}>
                                <NavLink
                                  className={`${styles.navLink2} dashboardNavlink  `}
                                  to={e.path}
                                >
                                  <li>{e?.name}</li>
                                </NavLink>
                              </React.Fragment>
                            ))}
                          </ul>
                        </>
                      )}

                      {!mobile && (
                        <ul
                          style={{
                            display:
                              active === index && item?.list?.length > 0
                                ? "block"
                                : "none",
                          }}
                        >
                          {item?.list?.map((e, i) => (
                            <React.Fragment key={i}>
                              <NavLink
                                className={`${styles.navLink2} dashboardNavlink `}
                                to={e.path}
                              >
                                <li>{e?.name}</li>
                              </NavLink>
                            </React.Fragment>
                          ))}
                        </ul>
                      )}
                    </Box>
                  </React.Fragment>
                )
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SideBar;
