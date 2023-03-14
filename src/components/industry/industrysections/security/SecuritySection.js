import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import "./style.css";
import { BsChevronDoubleRight, BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateComanpyOnIndustry } from "../../../../store/actions/industryActions";

const SecuritySection = ({ open, setOpen }) => {
  const industry = useSelector((state) => state?.industry?.singleIndustry);
  const updateIndustry = useSelector(
    (state) => state?.industry?.updateIndustry
  );

  const loading = useSelector((state) => state?.industry?.loading);
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const submitData = () => {
    dispatch(
      updateComanpyOnIndustry({
        uuid: auth?.results?.company_detail?.uuid,
        industry_id:
          industry?.results?.industry_certification_license[0]?.industry?.id,
      })
    );
  };
  useEffect(() => {
    if (updateIndustry?.success) {
      setOpen(false);
    }
  }, [updateIndustry, updateIndustry?.success]);
  return (
    <Grid container spacing={4}>
      <Grid item sm={6}>
        <Box>
          <Box marginBottom={1}>
            <Typography variant="h4" className="industrymodel_heading_h4">
              {/* {Data.title} */}
              {industry?.results?.name}
            </Typography>
          </Box>
          <Typography variant="body1" className="industrymodel_para_body">
            {/* {Data.data} */}
            {industry?.results?.short_description}
          </Typography>
        </Box>
      </Grid>
      <Grid item sm={6}>
        <Box>
          <Box marginBottom={1}>
            <Typography variant="h4" className="industrymodel_heading_h4">
              Key Background Checks:
            </Typography>
          </Box>
          <Box marginLeft={3} className={"boxHight"}>
            <div
              dangerouslySetInnerHTML={{
                __html: industry?.results?.description,
              }}
            ></div>
            {/* <ul>
              {industry?.results?.industry_certification_license?.map(
                (e, i) => (
                  <li key={i}>{e?.name}</li>
                )
              )}
            </ul> */}
          </Box>
          {auth?.results?.company_detail?.industry?.id ===
          industry?.results?.industry_certification_license[0]?.industry?.id ? (
            ""
          ) : (
            <Box className={"button-primary"}>
              <Button disabled={loading} onClick={() => submitData()}>
                {loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Select Industry"
                )}
              </Button>
            </Box>
          )}
        </Box>
        {/* <Box marginTop={12} className="industrymodel_btn_box">
          <Button className="industrymodel_btn" variant="contained">
            continue <BsChevronDoubleRight />
          </Button>
        </Box> */}
      </Grid>
    </Grid>
  );
};

export default SecuritySection;
