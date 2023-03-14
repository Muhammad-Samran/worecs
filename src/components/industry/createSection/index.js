import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsChevronDoubleRight } from "react-icons/bs";
import TextInput from "../../common/TextInput";
import styles from "./styles.module.scss";

import CustomSelect from "../../common/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateIndustry,
  getAllCertificates,
  getAllCertificatesIndustry,
  resetModel,
  UpdateIndustry,
} from "../../../store/actions/industryActions";

const Create = ({ setOpen }) => {
  const dispatch = useDispatch();
  const certificates = useSelector((state) => state?.industry?.certificates);
  const loading = useSelector((state) => state?.industry);
  const certificatesIndustries = useSelector(
    (state) => state?.industry?.certificatesIndustries
  );
  const editedIndustries = useSelector(
    (state) => state?.industry?.editedIndustries
  );
  // console.log(editedIndustries);
  const auth = useSelector((state) => state?.auth);

  // maping for multi select
  let multiSelect =
    editedIndustries?.results?.industry_certification_license.length >= 0
      ? editedIndustries?.results?.industry_certification_license?.map((e) => {
          return e;
        })
      : [editedIndustries?.results?.industry_certification_license[0]];
  let multiSelect2 =
    editedIndustries?.results?.industry_certification_license.length >= 0 &&
    editedIndustries?.results?.industry_certification_license?.map((e) => {
      return { value: e?.id, label: e?.name };
    });

  const [data, setData] = useState(multiSelect || []);

  const [createData, setcreateData] = useState({
    name: editedIndustries?.results?.name || "",
    description: editedIndustries?.results?.description || "",
  });
  const [industryId, setIndustryId] = useState(multiSelect2 || []);
  // console.log(industryId);

  const [showSelect, setShowSelect] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    dispatch(getAllCertificatesIndustry());
    dispatch(getAllCertificates(industryId?.value || industryId?.id));
  }, [dispatch, industryId]);
  // useEffect(() => {
  //   dispatch(getAllCertificates(industryId));
  // }, [editedIndustries]);

  // const options = certificates?.results?.map((e, i) => ({
  //   value: e?.id,
  //   label: e?.text,
  // }));

  // const optionsCreateIndustry =
  // candidate?.createdIndustry?.results?.map((parent) => ({
  //   label: parent?.name,
  //   options: parent?.industry_certification_license?.map((e) => {
  //     return { label: e?.name, value: e.id, parent: parent.id };
  //   }),
  // })) || [];

  const options2 = certificatesIndustries?.results?.map((e, i) => ({
    label: e?.name,
    options: e?.license?.map((el) => ({
      value: el?.id,
      label: el?.name,
    })),
  }));

  const handleSubmit = async () => {
    let ids = industryId?.map((e) => e?.value?.toString() || e?.id?.toString());

    if (
      createData?.name === "" ||
      createData?.description === "" ||
      !industryId ||
      industryId.length <= 0
    ) {
      setError("Please Enter the required Fields");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const local_data = {
      ...createData,
      workspace_id: auth?.results?.workspace_id,
      recruiter_id: auth?.results?.recruiter_id,
      industry_certification_license_id: ids,
      // uuid: editedIndustries?.results?.data?.uuid,
    };
    const local_data2 = {
      ...createData,
      workspace_id: auth?.results?.workspace_id,
      recruiter_id: auth?.results?.recruiter_id,
      industry_certification_license_id: ids,
      uuid: editedIndustries?.results?.uuid,
    };

    loading?.edit
      ? dispatch(UpdateIndustry(local_data2, auth?.workspace_id))
      : dispatch(CreateIndustry(local_data, auth?.workspace_id));
  };

  useEffect(() => {
    if (loading?.createdIndustry) {
      if (loading?.createdIndustry?.success) {
        setError("Created ");
        setTimeout(() => {
          setOpen(false);
          setError("");
        }, 2000);
      } else {
        setError(loading?.createdIndustry?.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  }, [loading?.createdIndustry]);
  useEffect(() => {
    if (loading?.updateIndustry) {
      if (loading?.updateIndustry?.success) {
        setError("Updated ");
        setTimeout(() => {
          setOpen(false);
          setError("");
        }, 2000);
      } else {
        setError(loading?.updateIndustry?.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  }, [loading?.updateIndustry]);

  return (
    <Box className={styles.parent}>
      <Typography variant="h2">
        {editedIndustries?.results ? "Update" : "Create Your Own Industry"}

        {/* <span> Industry</span> */}
      </Typography>
      <Typography></Typography>
      <form>
        <Box className={styles.contentBox}>
          <TextInput
            label=" Name"
            name="industry_name"
            type="text"
            compolsory={true}
            value={createData?.name}
            onChange={(e) =>
              setcreateData({ ...createData, name: e?.target.value })
            }
            customClass={styles.input}
          />
          <TextInput
            label=" Description"
            name="industry_description"
            type="text"
            compolsory={true}
            value={createData?.description}
            onChange={(e) =>
              setcreateData({ ...createData, description: e?.target.value })
            }
            customClass={styles.input}
          />{" "}
          <CustomSelect
            label={`Certification & Licenses`}
            options={options2}
            isMulti={true}
            onChange={(e) => {
              setIndustryId(e);
            }}
            // onChange={(e) => console.log(e)}
            placeholder={"Select"}
            value={industryId}
            // defaultValue={{
            //   value: industryId?.id || industryId?.value,
            //   label: industryId?.name || industryId?.label,
            // }}
          />
          {/* <h1></h1>
          {industryId && (
            <CustomSelect
              label={`Certification & Licenses`}
              options={options}
              isMulti
              value={data?.map((e) => {
                return {
                  label: e.name || e?.label,
                  value: e.id || e?.value,
                };
              })}
              // defaultValue={
              //   data.length === 0
              //     ? ""
              //     : data?.map((e) => {
              //         return {
              //           label: e.name || e?.label,
              //           value: e.id || e?.value,
              //         };
              //       })
              // }
              onChange={(e) => setData([...e])}
              // defaultValue={data}
              // defaultValue={data?.map((e) => {
              //   <React.Fragment key={e}>{[{ label: e }]}</React.Fragment>;
              //   return;
              // })}
              // defaultValue={data?.map((e) => [{ label: e }])}
              // onChange={(e) => console.log(e)}
            />
          )} */}
          <Box className={`button-primary ${styles.button} `}>
            <Button onClick={handleSubmit} disabled={loading?.loading}>
              {loading?.loading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                <>
                  {editedIndustries.results ? "Update" : "Create Industry"}

                  <span>
                    {" "}
                    <BsChevronDoubleRight />
                  </span>
                </>
              )}
            </Button>
          </Box>
          {error?.toString()?.trim() !== "" && (
            <span
              style={{
                color:
                  loading?.createdIndustry?.success ||
                  loading?.editedIndustries?.success === true
                    ? "green"
                    : "red",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {" "}
              {error}
            </span>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default Create;
