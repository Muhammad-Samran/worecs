import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../../../assets/industries/model/x.svg";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import FileViewer from "react-file-viewer";

export default function CustomModal({ openModal, setOpenModal, resume }) {
  const handleClose = () => setOpenModal(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const result = `${process.env.REACT_APP_URL}${resume?.resume_path}`.split(
    "."
  );
  const ext = result[result.length - 1];

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modalParent}>
          <Box className={`${styles.modalwapper}`}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" align="center" className={styles.heading}>
              Resume
            </Typography>
            {ext === "pdf" ? (
              <Box className={styles.viewer}>
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}
                >
                  <Viewer
                    fileUrl={`data:application/pdf;base64,${resume?.preview_resume_path}`}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </Box>
            ) : (
              <FileViewer
                fileType={ext}
                filePath={`data:application/docx;base64,${resume?.preview_resume_path}`}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
