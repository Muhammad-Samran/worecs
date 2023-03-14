import React, { useState } from "react";

import TextInput from "../../common/TextInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.scss";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import CustomSelect from "../../common/Select";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ShowAlert } from "../../../store/actions/alertActions";
import {
  createSingleInterviewFunc,
  resetSingleCandidateReff,
  updateSingleInterviewFunc,
} from "../../../store/actions/singleCandidateScreenActions";
import { ReactComponent as Add } from "../../../assets/interview/addInterview.svg";
import { ReactComponent as Close } from "../../../assets/interview/close.svg";
import { useEffect } from "react";
import { getExisitingCandidateFunc } from "../../../store/actions/recruiterCandidateActions";
import TimeRange from "react-time-range";

const InterviewPopup = ({ opne, setOpen }) => {
  const auth = useSelector((state) => state?.auth);
  const candidate = useSelector((state) => state?.rcandidate);
  const singleCandidate = useSelector((state) => state?.singleCandidate);
  const [valueee, onChangeee] = useState("10:00");

  const getExisitCandi = candidate?.getExisitingCandidate?.results?.map(
    (data) => ({
      label: data?.text,
      value: data?.id,
    })
  );

  const [selectValue, setSelectValue] = useState(0);
  const [startDate, setStartDate] = useState(
    singleCandidate?.editInterView?.results?.date
      ? new Date(singleCandidate?.editInterView?.results?.date)
      : new Date()
  );
  // console.log(startDate);
  const candidateID = JSON.parse(localStorage.getItem("candidateID"));

  const dispatch = useDispatch();

  const options = [
    { value: "Office", label: "Office" },
    { value: "Online", label: "Online" },
  ];
  const options2 = [
    { value: "Custom Support", label: "Custom Support" },
    { value: "Technical Support", label: "Technical Support" },
    { value: " Billing Support    ", label: " Billing Support    " },
    { value: "Feedback", label: "Feedback" },
  ];

  // console.log(singleCandidate?.editInterView?.results?.time.split(" "));
  const date = new Date();
  const mapTags =
    singleCandidate?.editInterView?.results?.candidate_interview_invitation?.map(
      (e) => (e?.length === 0 ? [] : { email: e?.email })
    );
  const [inputList, setInputList] = useState(
    mapTags?.length > 0 ? mapTags : []
  );

  const [values, setValues] = useState({
    email: "",
    title: singleCandidate?.editInterView?.results?.title || "",
    emails: "",
    tags: [],
    description: singleCandidate?.editInterView?.results?.description || "",

    time: singleCandidate?.editInterView?.results?.start_time
      ? moment(
          singleCandidate?.editInterView?.results?.start_time,
          "hh:mm A"
        ).format()
      : moment(),
    time2: singleCandidate?.editInterView?.results?.end_time
      ? moment(
          singleCandidate?.editInterView?.results?.end_time,
          "hh:mm A"
        ).format()
      : moment(),
    type: {
      value: singleCandidate?.editInterView?.results?.type,
      label: singleCandidate?.editInterView?.results?.type,
    } || { value: "", label: "" },
    topic: singleCandidate?.editInterView?.results?.topic || "",
    address: singleCandidate?.editInterView?.results?.address || "",
  });

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
  }

  const [Customerror, setErrors] = useState({});
  const validate = (data) => {
    const newError = {};
    for (let key in data) {
      let value = data[key];
      switch (key) {
        case "title":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          break;
        case "description":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          break;
        case "time":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
        case "time2":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          // else if (new Date().getTime() <= new Date().getTime(values?.time))
          //   newError[key] = "Please select correct date";
          break;
        case "type":
          if (value.length === 0 || value.toString() === "")
            newError[key] = "fields is Required";
          break;
        // case "topic":
        //   if (value.length === 0 || value.toString() === "")
        //     newError[key] = "fields is Required";
        //   break;
        case "emails":
          if (!ValidateEmail(value))
            newError[key] = "Please Add Email In Correct Format";
          else if (values?.tags?.includes(value))
            newError[key] = "Email Already in Tags";
          break;
        default:
      }
    }
    return newError;
  };
  const onChange = (e) => {
    const { name, value } = e?.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (Customerror.hasOwnProperty(name)) {
      delete Customerror[name];
      setErrors(Customerror);
    }
  };
  // console.log(values?.tags);
  const submitData = async (e) => {
    const condition =
      inputList?.length > 0 &&
      inputList?.find((e, i) => (e?.email?.trim() === "" ? true : false));

    if (condition?.email === "") {
      return dispatch(ShowAlert("Please fill all fields", "error"));
    }
    e.preventDefault();
    const validateSelect = validate(values);
    if (values.emails === "") {
      delete validateSelect["emails"];
    }
    if (Object?.keys(validateSelect)?.length > 0) {
      dispatch(ShowAlert("Please fill all fields", "error"));
      setErrors(validateSelect);
      return;
    }
    let objectCreate = {};

    const newArray = [...values?.tags, ...inputList];
    let recruitment_industries = newArray?.map((e, index) => {
      return (objectCreate[`email_invitation_${index}`] = {
        email: e?.email,
      });
    });

    const local_data = {
      ...values,
      email_invitations: objectCreate,
      type: values?.type?.value.toLowerCase(),
      address: values?.address,
      // values?.type?.value === "Office"
      //   ? "20-40 Meagher St, Sydney NSW 2008, Australia"
      //   : "",
      date: moment(startDate).format("DD-MM-YYYY"),

      recruiter_id: auth?.results?.recruiter_id,
      workspace_id: auth?.results?.workspace_id,
      candidate_id: values?.email?.value,
      // start_time: startDate,
      start_time: moment(values?.time).format("h:mm:ss a"),
      end_time: moment(values?.time2).format("h:mm:ss a"),
      duration: "60",
      host_video: "1",
      agenda: "testsetset",
      participant_video: "1",
    };
    const local_data2 = {
      ...values,
      uuid: singleCandidate?.editInterView?.results?.uuid,
      type: values?.type?.value.toLowerCase(),
      email_invitations: objectCreate,
      address: values?.address,
      // values?.type?.value.toLowerCase() === "Office".toLowerCase()
      //   ? "20-40 Meagher St, Sydney NSW 2008, Australia"
      //   : "",

      date: moment(startDate).format("DD-MM-YYYY"),
      recruiter_id: auth?.results?.recruiter_id,
      workspace_id: auth?.results?.workspace_id,
      candidate_id: singleCandidate?.editInterView?.results?.candidate?.id,
      // start_time: startDate,
      start_time: moment(values?.time).format("h:mm:ss a"),
      end_time: moment(values?.time2).format("h:mm:ss a"),
      duration: "60",
      host_video: "1",
      agenda: "testsetset",
      participant_video: "1",
      zoom_id: "82629994706",
      host_id: "FQVcUJkIQ1iNYCmcnvjumA",
    };

    if (singleCandidate?.editInterView?.success === true) {
      dispatch(
        updateSingleInterviewFunc(local_data2, {
          workspace_id: auth?.results?.workspace_id,
        })
      );
    } else {
      dispatch(
        createSingleInterviewFunc(local_data, {
          workspace_id: auth?.results?.workspace_id,
        })
      );
    }

    // createInterView
    //   "":"eyJpdiI6Im9BR2lqek9TWHpEYVB6YXgzOUY5eFE9PSIsInZhbHVlIjoiTmVNT2hCNmYxQkdvV0daSndYdFM1UT09IiwibWFjIjoiYWM0NWRjZmU2YmIyMGE5NmE5YjkwYTQ3YjJmMmNkZWJiMDExMGRiMjJhNTVlZTNlOWY1ZmIzODk1MWQ2YzdjZSIsInRhZyI6IiJ9",
    //   "workspace_id":"1",
    //   "candidate_id":"2",
    //   "title":"Web Development",
    //   "description":"Web Development description",
    //   "date":"29-09-2022",
    //   "time":"08:16",
    //   "type":"online",
    // "topic":"Test",
    // "start_time":"2022-09-29T20:00:00Z",
    // "duration":"60",
    // "host_video":1,
    // "agenda":"testsetset",
    // "participant_video":1
  };
  useEffect(() => {
    if (singleCandidate?.createInterView?.success === true) {
      setOpen(false);
      dispatch(resetSingleCandidateReff());
    }
  }, [singleCandidate?.createInterView]);

  useEffect(() => {
    if (singleCandidate?.updateInterView?.success === true) {
      setOpen(false);
      dispatch(resetSingleCandidateReff());
    }
  }, [singleCandidate?.updateInterView]);

  const onKeyDown = (e) => {
    const { key } = e;

    const trimmedInput = values?.emails?.trim();

    if (
      key === "Tab" &&
      trimmedInput.length &&
      !values?.tags?.includes(trimmedInput)
    ) {
      e.preventDefault();
      const validateSelect = validate(values);
      if (Object?.keys(validateSelect)?.length > 0) {
        // console.log(validateSelect);
        // dispatch(ShowAlert("Please Fill All fields", "error"));
        setErrors(validateSelect);
        // return;
        if (validateSelect.emails) {
          return;
        }
      }

      setValues({
        ...values,
        tags: [...values?.tags, { email: trimmedInput }],
        emails: "",
      });
    }
  };
  const removeIndex = (index) => {
    if (index === 0) {
      return;
    }
    let newIndex = values?.tags.splice(index, 1);

    setValues({ ...values });
    return newIndex;
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (e, index) => {
    e?.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (e) => {
    setInputList([...inputList, { email: "" }]);
    e?.preventDefault();
  };
  // console.log(values?.time, values?.time2);

  return (
    <Box className="interviewParrent">
      <Typography variant="h3">Schedule Interview</Typography>
      <form onSubmit={submitData}>
        <Box className="date-picker">
          <label>Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Date *"
            minDate={moment().toDate()}
          />
        </Box>
        <Box className={"timebox"}>
          {/* <TextInput
            type="time"
            name="time"
            label="Start Time"
            placeholder="Time *"
            value={values.time}
            onChange={onChange}
            customClass={"inputInterview"}
          /> */}

          <TimeRange
            onStartTimeChange={(e) =>
              setValues({ ...values, time: e?.startTime })
            }
            className="time-picker-custom"
            startLabel={"Start Time"}
            endLabel={"End Time"}
            onEndTimeChange={(e) => setValues({ ...values, time2: e?.endTime })}
            startMoment={values?.time}
            endMoment={values?.time2}
          />
          {/* <TimePicker onChange={onChangeee} value={valueee} />
          



          <TextInput
            type="time"
            name="time2"
            data-open="DatePickerID"
            label="End Time"
            placeholder="Time *"
            value={values.time2}
            onChange={onChange}
            customClass={"inputInterview"}
          /> */}
        </Box>

        <CustomSelect
          options={options}
          customClass={"interviewSelect"}
          placeholder="Location *"
          label="Location"
          name="type"
          value={values.type?.value ? values?.type : null}
          onChange={(e) => {
            setValues({ ...values, type: e });
            if (Customerror.hasOwnProperty("type")) {
              delete Customerror["type"];
              setErrors(Customerror);
            }
          }}
          // onChange={(location) => setSelectValue(location.value)}
        />
        {values?.type?.value === "Office" && (
          <TextInput
            type="text"
            name="address"
            label="Address"
            value={values?.address}
            onChange={onChange}
            placeholder="20-40 Meagher St, Sydney NSW 2008, Australia"
            customClass={"inputInterview"}
          />
        )}
        <CustomSelect
          options={getExisitCandi}
          customClass={"interviewSelect"}
          name="email"
          isDisabled={singleCandidate?.editInterView?.results}
          label={
            <>
              Email
              <span
                style={{
                  color: "red",
                  marginLeft: "3px",
                  position: "relative",
                  display: "initial",
                }}
              ></span>
            </>
          }
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          onFocus={() => {
            dispatch(
              getExisitingCandidateFunc({
                request_type: "getinterview_candidate",
              })
            );
          }}
          onChange={(e, action) => {
            setValues({
              ...values,
              email: e,
              tags: [{ email: e?.label }],
            });

            if (Customerror.hasOwnProperty("email")) {
              delete Customerror["email"];
              setErrors(Customerror);
            }
          }}
          placeholder={"Enter your email"}
          value={values.email}
        />
        {/* <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={candidate?.getExisitingCandidate?.results?.map(
            (e) => e?.text
          )}
          renderInput={(params) => (
            <>
              <label> Email</label>
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            </>
          )}
        /> */}

        {/* <CustomSelect
          options={options2}
          customClass={"interviewSelect"}
          placeholder="Subject *"
          name="type"
          value={values.title}
          onChange={(e) => {
            setValues({ ...values, title: e });
            if (Customerror.hasOwnProperty("title")) {
              delete Customerror["title"];
              setErrors(Customerror);
            }
          }}
          // onChange={(location) => setSelectValue(location.value)}
        /> */}
        <TextInput
          type="text"
          name="title"
          label="Subject"
          value={values.title}
          placeholder="Subject *"
          customClass={"inputInterview"}
          onChange={onChange}
        />
        <TextInput
          type="text"
          name="description"
          label="Description"
          placeholder="Description *"
          value={values.description}
          customClass={"inputInterview"}
          textarea={true}
          onChange={onChange}
        />
        {/* <TextInput
          type="text"
          name="topic"
          placeholder="Topic *"
          value={values.topic}
          onChange={onChange}
          customClass={"inputInterview"}
        /> */}

        <>
          {inputList?.map((e, i) => (
            <Box className="parrentCandidateCloseInvite" key={i}>
              <TextInput
                type="text"
                key={i}
                name="email"
                label=" Attendees"
                value={e?.email}
                placeholder="Candidate Email"
                customClass={"inputInterview"}
                onChange={(e) => handleInputChange(e, i)}
              />
              <Close
                className="candidateCloseInvite"
                onClick={(e) => handleRemoveClick(e, i)}
              />
            </Box>
          ))}
          <Box className={"addEmailCandidate"}>
            <Add onClick={(e) => handleAddClick(e)} />
            <Typography>Add Optional Attendees</Typography>
          </Box>
          {/* <button onClick={(e) => handleAddClick(e)}>add</button> */}
          {/* <TextInput
            type="text"
            name="emails"
            label="Invite others"
            value={values.emails}
            placeholder="Add email to invite and press TAB key"
            customClass={"inputInterview"}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          {Customerror?.emails && (
            <div className="error-class">{Customerror?.emails}</div>
          )}
          <div className={"tagsbox"}>
            {values?.tags?.length > 0 &&
              values?.tags?.map(
                (e, i) =>
                  e !== undefined && (
                    <div
                      className="tagbox"
                      key={i}
                      onClick={() => removeIndex(i)}
                    >
                      {e}
                    </div>
                  )
              )}
          </div> */}
        </>

        <Box className="button-primary buttoninterview">
          <Button
            className="secondary-btn"
            onClick={() => {
              setOpen(false);
              dispatch(resetSingleCandidateReff());
            }}
          >
            Cancel
          </Button>
          <Button onClick={submitData}>
            {singleCandidate?.loading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : singleCandidate?.editInterView?.success ? (
              " Update"
            ) : (
              " Send Invite"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default InterviewPopup;
