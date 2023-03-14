import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import upload from "../../../assets/profile/upload.svg";
import { ImCross } from "react-icons/im";
import { ReactComponent as Cross } from "../../../assets/industries/model/x.svg";
import { MdOutlineClose } from "react-icons/md";
import { useState } from "react";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, UploadImage } from "../../../store/actions/profileActions";
import CofirmBox from "../confirmBox/index";
import { useEffect } from "react";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

export default function BasicModal({ open, setOpen, children }) {
  const profile = useSelector((state) => state?.rprofile);
  const [open2, setOpen2] = useState(false);

  const handleClose = (_, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    setImage({
      name: "",
      image1: profile?.profile?.results?.profile_image
        ? `${process.env.REACT_APP_URL}${profile?.profile?.results?.profile_image}`
        : "",

      image2: "",
    });
    setOpen(false);
    setOpen(false);
  };
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);

  const [image, setImage] = useState({
    name: "",
    image1: profile?.profile?.results?.profile_image
      ? `${process.env.REACT_APP_URL}${profile?.profile?.results?.profile_image}`
      : "",

    image2: "",
  });

  // useEffect(() => {
  //   console.log(image?.image1);
  //   if (profile?.profile?.results?.profile_image) {
  //     setImage({
  //       ...image,
  //       image1: profile?.profile?.results?.profile_image,
  //     });
  //   } else {
  //     setImage({
  //       ...image,
  //       image1: "",
  //     });
  //   }
  // }, [profile?.profile?.results]);
  useEffect(() => {
    if (profile?.ImageUpload?.success === false) {
      setImage({
        name: "",
        image1: "",
        image2: "",
      });
    }
  }, [profile?.ImageUpload]);
  const fileAdd = (e) => {
    if (!e.target.files[0]) return;
    setImage({
      ...image,
      image1: URL.createObjectURL(e.target.files[0]),
      name: e.target.files[0].name,
      image2: e?.target?.files[0],
    });
  };
  const removeFile = () => {
    setOpen2(true);
    setOpen(false);
    // dispatch(resetPr)
    // setImage({
    //   name: "",
    //   image1: "",
    //   image2: "",
    // });
  };

  const handleSubmit = () => {
    const local_data = {
      profile_image: image?.image2,
      uuid: auth?.results?.uuid,
      recruiter_id:
        auth?.user === "candidate"
          ? auth?.results?.candidate_id
          : auth?.results?.recruiter_id,
    };
    dispatch(
      UploadImage(local_data, {
        uuid: auth?.results?.uuid,
        customer_id:
          auth?.user === "candidate"
            ? auth?.results?.candidate_id
            : auth?.results?.recruiter_id,
      })
    );
  };
  useEffect(() => {
    if (profile?.ImageUpload?.success) {
      setOpen(false);
    }
  }, [profile?.ImageUpload]);

  return (
    <>
      <CofirmBox
        open={open2}
        setOpen={setOpen2}
        image={image}
        setImage={setImage}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`${styles.industryModel}`}
      >
        <Box className={`${styles.boxModel} xym1`}>
          <Box className={styles.cross} onClick={handleClose}>
            <Cross />
          </Box>
          <Box className={styles.body}>
            <Box className={styles.heading}>Change your Profile Picture</Box>
            <Box className={styles.preview}>
              {image?.image1 ? (
                <>
                  {
                    <Tooltip title="Remove image">
                      <Box className={styles?.crossIconsImage}>
                        <MdOutlineClose
                          fontSize={20}
                          onClick={() => {
                            !profile?.profile?.results?.profile_image
                              ? setImage({
                                  name: "",
                                  image1: "",
                                  image2: "",
                                })
                              : removeFile();
                          }}
                        />
                      </Box>
                    </Tooltip>
                  }

                  <img
                    src={image?.image1}
                    alt={"sd"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100px",
                      objectFit: "cover",
                    }}
                  />
                  {/* <p>{image?.name}</p> */}
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      height: "170px",
                      marginBottom: "10px",
                    }}
                  >
                    <Box className={styles.imageUpload}>
                      <label htmlFor="file-input">
                        {!image.image1 && (
                          <img
                            src={upload}
                            alt="Upload"
                            style={{ maxWidth: "50px" }}
                          />
                        )}
                      </label>

                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={fileAdd}
                      />
                    </Box>
                  </Box>
                </>
              )}
            </Box>
            <Box className={`button-primary ${styles.buttoninterview}`}>
              {/* <Button
                onClick={removeFile}
                className="secondary-btn"
                disabled={!profile?.profile?.results?.profile_image}
              >
                delete
              </Button> */}
              <Button
                onClick={handleSubmit}
                disabled={
                  profile?.loading || profile?.profile?.results?.profile_image
                }
              >
                {profile?.loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "  Upload"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
