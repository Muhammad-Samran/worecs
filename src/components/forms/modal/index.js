import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./styles.module.scss";
import Typography from "@mui/material/Typography";
import { ReactComponent as Cross } from "../../../assets/industries/model/x.svg";
import TextInput from "../../common/TextInput";
import CustomSelect from "../../common/Select";
import { Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  getFormCategory,
  createForm,
  updateForm,
  draftSave,
} from "../../../api/candidate/candidate.class";
import MultiPersons from "./multiPersons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";
import CircularProgress from "@mui/material/CircularProgress";
// import Checkbox from "../../common/checkbox";

export default function CustomModal({
  openModal,
  setOpenModal,
  formData,
  uuid,
  draft,
  apiDraft,
}) {
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [send, setSend] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [category, setCategory] = useState();

  const [categoryOptions, setCategoryOptions] = useState();
  const [formValues, setFormValues] = useState([
    { to_email: "", contact_number: "", country_code: "AU" },
  ]);

  const initialValues = {
    form_name: "",
    form_category: "",
  };

  const validationSchema = Yup.object().shape({
    form_name: Yup.string().required("Required"),
    form_category: Yup.object().required("Required"),
  });
  const onSubmit = async (values) => {
    try {
      setLoader(true);
      let payload = {
        form_builder_json: formData,
        form_builder_category_id: values.form_category.value,
        workspace_id: auth?.results?.workspace_id,
        name: values.form_name,
        recruiter_id: auth?.results?.recruiter_id,
      };

      let data = {};
      if (formValues?.length > 0) {
        formValues.forEach((record, index) => {
          data["sender_information_" + index] = record;
        });
      }
      // console.log("data", data);
      // console.log("uuid", uuid);
      // console.log("draft", draft);

      if (!uuid && data && draft == "0") {
        // console.log("create Form");
        const response = await createForm({
          ...payload,
          form_requests: data,
        });
        dispatch(ShowAlert(response?.data?.message, "success"));
        if (response.data.success) {
          setLoader(false);
          handleClose();
          navigate("/dashboard/forms");
        }
      } else if (uuid && draft === "0" && apiDraft !== "saveDraft") {
        // console.log("update Form");
        const response = await updateForm({
          ...payload,
          uuid: uuid,
        });
        dispatch(ShowAlert(response?.data?.message, "success"));
        if (response.data.success) {
          // dispatch(ShowAlert(response?.data?.message, "success"));
          setLoader(false);
          handleClose();
          navigate("/dashboard/forms");
        }
      } else if (draft === "1") {
        // console.log("draft >> 1");
        const response = await createForm({
          ...payload,
          isDraft: draft,
        });
        dispatch(ShowAlert(response?.data?.message, "success"));
        if (response.data.success) {
          // dispatch(ShowAlert(response?.data?.message, "success"));
          setLoader(false);
          handleClose();
          navigate("/dashboard/draft");
        }
      } else if (
        uuid &&
        data.sender_information_0.to_email == "" &&
        draft === "0" &&
        apiDraft === "saveDraft"
      ) {
        // console.log("save draft >> 0");
        const response = await draftSave({
          ...payload,
          isDraft: draft,
          uuid: uuid,
        });
        dispatch(ShowAlert(response?.data?.message, "success"));
        if (response.data.success) {
          // dispatch(ShowAlert(response?.data?.message, "success"));
          setLoader(false);
          handleClose();
          navigate("/dashboard/forms");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const api = async () => {
      try {
        const response = await getFormCategory({
          workspace_id: auth.results.workspace_id,
        });
        setCategory(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    api();
  }, []);

  useEffect(() => {
    if (category?.length > 0) {
      category.forEach((record) => {
        const data = [{ value: record.id, label: record.name }];
        setCategoryOptions((prev) => [...prev, ...data]);
      });
    }
    return () => {
      setCategoryOptions("");
    };
  }, [category]);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class={styles.modalParent}>
          <Box className={styles.modalwapper}>
            <Box className={styles.cross} onClick={handleClose}>
              <Cross />
            </Box>
            <Typography variant="h4" className={styles.heading}>
              Confirm Form Submission
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} style={{ width: "90%" }}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, md: 3 }}
                  >
                    <Grid item xs={12} md={6}>
                      <TextInput
                        type="text"
                        name="form_name"
                        label="Form Name"
                        placeholder="Form Name"
                        onChange={handleChange}
                      />
                      <span>
                        {errors.form_name &&
                          touched.form_name &&
                          errors.form_name}
                      </span>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomSelect
                        customClass={styles.Input}
                        type="text"
                        name="form_category"
                        onChange={(option) =>
                          setFieldValue("form_category", option)
                        }
                        value={values.form_category}
                        options={categoryOptions}
                        sx={{ maxWidth: "initial" }}
                        label="Form Category"
                      />
                      <span>
                        {errors.form_category &&
                          touched.form_category &&
                          errors.form_category}
                      </span>
                    </Grid>
                  </Grid>
                  <Box className="pt-3">
                    <FormControlLabel
                      label="Want to send request?"
                      control={
                        <Checkbox
                          onChange={(e) => setSend(e.target.checked)}
                          checked={send}
                          sx={{
                            color: "#00CFC5",
                            "&.Mui-checked": {
                              color: "#00CFC5",
                            },
                          }}
                        />
                      }
                    />
                  </Box>
                  <Box className={styles.statusbox}>
                    {send &&
                      (uuid || draft === "1" ? (
                        <></>
                      ) : (
                        <MultiPersons
                          setFormValues={setFormValues}
                          formValues={formValues}
                        />
                      ))}

                    <Box className={`${styles.button} button-primary`}>
                      <Button className="secondary-btn" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {loader ? (
                          <Box>
                            <CircularProgress />
                          </Box>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
