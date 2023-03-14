import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { BsChevronDoubleRight, BsChevronRight } from "react-icons/bs";
import styles from "./styles.module.scss";

const InfoSection = ({ setOpen, setOpen2, removedButton }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const data = [
    {
      title: `Construction`,
      list: [
        "White Card",
        "High Risk Work License",
        "Trade Licenses Check",
        "First Aid Certificate Check",
        "National Police Check",
      ],
    },
    {
      title: `Education `,
      list: [
        "Teacher Registration Check",
        "Working with Children Check",
        "NDIS Worker Check",
        "National Police Check",
      ],
    },
    {
      title: `Health`,
      list: [
        "Registration to Practise Check",
        "Working with Children Check",
        "NDIS Worker Check",
        "National Police Check",
      ],
    },
    {
      title: `Finance`,
      list: [
        "CPA Qualification",
        "Chartered Accountant Qualification Check",
        "Chartered Financial Analyst Charterholder Check",
        "National Police Check",
        "Credit Check",
      ],
    },
    {
      title: `Hospitality`,
      list: [
        "RSA/RCG Check", 
        "Vevo rights to work Check",
        "National Police Check",
        "Working with Children Check",
      ],
    },
  ];
  return (
    <Box className={styles.gridParrent}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className={styles.content}>
            <Typography variant="h2">
              {/* Worecs Default Templates/Forms For
              <span className="text-primary">Recruitment </span> Industry */}
              Create your own Industry Create &  Industry 
            </Typography>
            <Box className={styles.desc}>
              <Typography>
              In case you are not able to find the relevant industry, you may create a new one and allocate licenses to it for further use in Worecs.
              </Typography>
              {/* <Typography>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </Typography> */}
            </Box>
            <Box className={`button-primary ${styles.button} `}>
                <Button
                  onClick={() => {
                    setOpen(false);
                    setOpen2(true);
                  }}
                >
                  Continue
                  <span>
                    {" "}
                    <BsChevronDoubleRight />
                  </span>
                </Button>
              </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={12} lg={6}>
          <Box className={styles.accordion}>
            <Box sx={{ maxHeight: "390px", overflow: "auto" }}>
              {data?.map((e, i) => (
                <Accordion
                  expanded={expanded === i}
                  onChange={handleChange(i)}
                  className={styles.accordionBody}
                >
                  <AccordionSummary
                    expandIcon={<BsChevronRight />}
                    aria-controls={i}
                    id={i}
                  >
                    <Typography
                      variant="h5"
                      className={`${i === expanded ? " " : ""}`}
                    >
                      {e?.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {e.list.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            {!removedButton && (
              <Box className={`button-primary ${styles.button} `}>
                <Button
                  onClick={() => {
                    setOpen(false);
                    setOpen2(true);
                  }}
                >
                  Continue
                  <span>
                    {" "}
                    <BsChevronDoubleRight />
                  </span>
                </Button>
              </Box>
            )}
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default InfoSection;
