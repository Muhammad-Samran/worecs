import React, { useEffect, useState } from "react";

import TextInput from "../../common/TextInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import CustomSelect from "../../common/Select";
// formik and yup for validation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneFeild from "../../common/phoneFeild";
import { useDispatch, useSelector } from "react-redux";
import {
  createMember,
  updateMember,
} from "../../../store/actions/recruiterMembers";

const InterviewPopup = ({ setOpen, open }) => {
  const [selectValue, setSelectValue] = useState("Member");
  const auth = useSelector((state) => state?.auth);
  const member = useSelector((state) => state?.member);

  const dispatch = useDispatch();

  const initialValues = {
    first_name: member?.editedMember?.results?.first_name || "",
    last_name: member?.editedMember?.results?.last_name || "",
    email: member?.editedMember?.results?.email || "",
    contact_number: member?.editedMember?.results?.contact_number || "",
  };
  useEffect(() => {
    if (member?.createdMember?.success === true) {
      setOpen(false);
    }
  }, [member]);
  const [country_code, setCountryCode] = useState(
    member?.editedMember?.results?.country_code || ""
  );

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    contact_number: Yup.string()
      .required("Phone Required")
      .min(11, "Phone Should be more then 11 digits"),
  });
  const onSubmit = async (values, { resetForm }) => {
    const local_data = {
      ...values,
      invitation: "member",
      terms: 1,
      country_code: country_code.trim() === "" ? "AU" : country_code,
      type: "recruitment",
      invitation_type: "new_member",
      workspace_id: auth?.results?.workspace_id,
    };
    const local_data2 = {
      ...values,
      uuid: member?.editedMember?.results?.uuid,
      country_code: country_code.trim() === "" ? "AU" : country_code,
    };
    // console.log(local_data2);
    if (member?.editedMember?.results) {
      dispatch(updateMember(local_data2, auth?.results?.workspace_id)).then(
        () => {
          setOpen(false);
        }
      );
    } else {
      dispatch(createMember(local_data, auth?.results?.workspace_id));
      !open && resetForm();
    }
  };

  const options = [
    { value: "member", label: "Member" },
    { value: "Owner", label: "Owner" },
  ];

  return (
    <Box className="interviewParrent">
      <Typography variant="h4"> Member Details</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box className={"box-parent-textInput"}>
              <TextInput
                type="text"
                name="first_name"
                placeholder="First name"
                customClass={"inputInterview"}
                onChange={handleChange}
                // onBlur={handleBlur}

                value={values.first_name}
              />
              <span>
                {errors.first_name && touched.first_name && errors.first_name}
              </span>
            </Box>
            <Box className={"box-parent-textInput"}>
              <TextInput
                type="text"
                name="last_name"
                placeholder="Last Name"
                customClass={"inputInterview"}
                onChange={handleChange}
                // onBlur={handleBlur}

                value={values.last_name}
              />
              <span>
                {errors.last_name && touched.last_name && errors.last_name}
              </span>
            </Box>
            <Box className={"box-parent-textInput"}>
              <TextInput
                type="text"
                name="email"
                placeholder="Email"
                customClass={"inputInterview"}
                onChange={handleChange}
                // onBlur={handleBlur}

                value={values.email}
                disabled={member?.editedMember?.results?.email && true}
              />
              <span>{errors.email && touched.email && errors.email}</span>
            </Box>

            <Box className={"box-parent-textInput"}>
              <PhoneFeild
                customClass={"inputInterview"}
                name="contact_number"
                type="tel"
                labelFalse={true}
                placeholder={"+614 234 678"}
                onCountryChange={(e) => setCountryCode(e)}
                country="AU"
                value={values.contact_number}
                onChange={handleChange}

                // onBlur={handleBlur}
              />
              <span>
                {" "}
                {errors.contact_number &&
                  touched.contact_number &&
                  errors.contact_number}
              </span>
            </Box>
            {/* <Box className={"box-parent-textInput"}>
              <CustomSelect
                options={options}
                customClass={"interviewSelect"}
                placeholder="Role"
                // value={values.invitation}
                // onChange={setFieldValue}
                // onBlur={setFieldTouched}
                defaultValue={options[0]}
                onChange={(location) => setSelectValue(location.value)}
              />
              <span>
           
                {errors.invitation && touched.invitation && errors.invitation}
              </span>
            </Box> */}

            <Box className="button-primary buttoninterview">
              <Button onClick={() => setOpen(false)} className="secondary-btn">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={member?.loading}>
                {member?.loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : member?.editedMember?.results ? (
                  "Update User"
                ) : (
                  "Send Invite"
                )}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default InterviewPopup;
