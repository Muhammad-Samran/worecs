import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { deleteImage } from "../../../store/actions/companyActions";

const ImageUploader = ({
  label,
  onChange,
  valuenew,
  name,
  value,
  setEdit,
  edit,
  disabled,
}) => {
  const dispatch = useDispatch();
  const [image, showImage] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const company = useSelector((state) => state?.company);
  useEffect(() => {
    if (company?.updatedCompany?.success === false) {
      showImage(false);
    }
  }, [company?.updatedCompany]);

  useEffect(() => {
    if (edit) {
      auth?.results?.company_detail?.logo && showImage(true);
    }
  }, [edit]);
  useEffect(() => {
    if (!edit && valuenew) {
      showImage(URL?.createObjectURL(valuenew));
    }
  }, [valuenew]);

  return (
    <Box className={styles.imageUploaderWrapper}>
      <label>{label}</label>
      <Box className={styles.imageUploader}>
        <>
          {image ? (
            <>
              <Box className={styles?.crossImageBox}>
                <img
                  src={edit ? `${process.env.REACT_APP_URL}${valuenew}` : image}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "120px",
                    objectFit: "contain",
                  }}
                />
                <MdOutlineClose
                  className={styles.cross}
                  onClick={() => {
                    if (auth?.results?.workspace_type !== "recruitment") {
                      return;
                    }
                    if (auth?.results?.company_detail?.logo) {
                      dispatch(
                        deleteImage(auth?.results?.company_detail?.uuid)
                      ).then(() => {
                        showImage(false);
                      });
                    }
                    showImage(false);
                  }}
                />
              </Box>
            </>
          ) : (
            <>
              {" "}
              <label htmlFor="file-input">
                <Box className={styles.imageBox}>
                  {/* <Typography>Click to upload an image</Typography> */}
                </Box>
                <input
                  accept="image/*"
                  id="file-input"
                  disabled={disabled}
                  type="file"
                  value={value}
                  onChange={onChange}
                  name={name}
                />
              </label>
              <Typography>PNG or JPG file of 1500 x 500 pixels.</Typography>
            </>
          )}
        </>
      </Box>
    </Box>
  );
};

export default ImageUploader;
