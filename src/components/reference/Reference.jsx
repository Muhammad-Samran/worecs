import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { CustomTable } from "./CustomTable";
import { ReactComponent as RefIcon } from "../../assets/candidates/ref.svg";
import styles from "./styles.module.scss";
import {
  getApprovedReferences,
  getReferences,
} from "../../api/candidate/candidate.class";
import { ReactComponent as AddIcon } from "../../assets/candidates/add.svg";

const Reference = () => {
  const [reference, setReference] = useState(false);
  const [data, setData] = useState([]);
  const [updation, setUpdation] = useState(false);
  useEffect(() => {
    const tableData = async () => {
      try {
        // const response = await getApprovedReferences();
        const response = await getReferences();
        console.log(response);
        setData(response?.data?.results?.data);
      } catch (e) {
        console.log(e);
      }
    };

    tableData();
  }, [updation]);
  return (
    <>
      <Box className={`d-flex ${styles.parent}`}>
        <Box className={styles.button}>
          <Typography variant="h4">References</Typography>
        </Box>
        <Box
          // sx={{ mt: "30px" }}
          className={`${styles.editicon} px-1 mx-2`}
          onClick={() => {
            setReference(true);
          }}
          style={{
            color: "#00CFC5",
            fontFamily: "poppins-semi-bold",
            fontSize: "12px",
            alignItems: "center",
            display: "flex",
            border: "1px solid #00CFC5",
            borderRadius: "10px",
          }}
        >
          <AddIcon /> <span style={{ padding: "5px" }}>Add</span>
        </Box>
      </Box>

      <CustomTable
        data={data}
        setReference={setReference}
        reference={reference}
        setUpdation={setUpdation}
      />
    </>
  );
};

export default Reference;
