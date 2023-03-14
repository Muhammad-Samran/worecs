import React from "react";
import styles from "./styles.module.scss";
import { Box, Grid, Typography, Button } from "@mui/material";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../routes";
import FaqsCard from "../single-faqs-card";
import imgCenter from "../../../assets/faqs/imgCenter.svg";
import imgLeft from "../../../assets/faqs/imgLeft.svg";
import imgRight from "../../../assets/faqs/imgRight.svg";

const Faqs = () => {
  const navigate = useNavigate();
  const faqsData = [
    {
      title: "Can I get a customised plan matching my requirements?",
      content:
        "If you have signed up as a recruiter, you will have an option to use our custom calculator and based upon your input final costing will be visible. If you have signed up as a candidate, then the service is free of cost.",
    },
    {
      title: "How many forms can I create for candidates?",
      content:
        "Currently, there is no limit on form creation. You can create as many forms as you require.",
    },
    {
      title: "Do you have an electronic signature feature? ",
      content:
        "Yes, we do have an electronic signature feature on our pricing page as “E-Worecs (electronic signatures)”. It is available on a subscription plan only.",
    },
    {
      title: "How many jobs can I advertise?",
      content:
        "You can advertise as many jobs as you want. Currently, there is no limit on the number of job posts.",
    },
    {
      title: "Can I integrate Worecs with my existing CRM?",
      content:
        " Yes, it is a possibility, for further support please get in contact with our technical support team to understand the requirements of this integration and assist with your enquiry.",
    },
    {
      title: "Is my data secure?",
      content:
        "Yes, Worecs takes data security very seriously, and blockchain based servers are used to limit any third party hacking attempts. ",
    },
  ];
  return (
    <Box className={styles.parent}>
      <Box className={styles.header}>
        <Typography variant="h4">Help Desk</Typography>
      </Box>
      <Box className={styles.faq}>
        <Box className={styles.faqHeader}>
          <Typography variant="h5">FAQs</Typography>
          {/* <Box className={styles.searchBox}>
            <BsSearch />
            <input type="text" placeholder="Search..." />
          </Box> */}
        </Box>
        <Box className={styles.faqContent}>
          <Typography>
            Get answers to the most frequently asked questions about worecs
          </Typography>
          <Link to={routes.FAQS}>
            Please chat with our exceptional customer service.
          </Link>
        </Box>
        <Box className={styles.cardContainer}>
          <Grid container spacing={2}>
            {faqsData.map((data, i) => {
              return (
                <Grid item xs={12} md={6}>
                  <FaqsCard
                    title={data.title}
                    content={data.content}
                    key={data.title}
                    style={{
                      marginLeft: i % 2 === 0 ? "auto " : "",
                      "@media (max-width:900px)": {
                        marginLeft: "unset",
                        maxWidth: "100%",
                      },
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box className={styles.supportSection}>
          <Box className={styles.supportImages}>
            <img src={imgRight} alt="imgRight" className={styles.leftImg} />
            <img src={imgCenter} alt="imgCenter" className={styles.centerImg} />
            <img src={imgLeft} alt="imgLeft" className={styles.rightImg} />
          </Box>
          <Box className={styles.supportContent}>
            <Typography variant="h6">Still have questions?</Typography>
            <Typography>
              Can't find the answer you're looking for? Please chat to our
              friendly team.
            </Typography>
            <Box className="button-primary">
              <Button
                onClick={() => navigate(routes?.CONTACT)}
                className={styles.btnContact}
              >
                Contact Us
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Faqs;
