import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../components/industry/main/index";
import SEO from "../../components/meta-tags";
import {
  getAllCatagories,
  getAllCreatedIndustry,
} from "../../store/actions/industryActions";

const Industry = () => {
  const adminIndustryList = useSelector(
    (state) => state?.industry?.createdIndustries
  );
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCatagories());
    dispatch(getAllCreatedIndustry(auth?.workspace_id));
  }, [dispatch, auth?.workspace_id]);
  // useEffect(() => {
  //   if (adminIndustryList?.results?.data?.length > 0) {
  //     dispatch(getAllCreatedIndustry(auth?.workspace_id));
  //   }
  // }, [dispatch, adminIndustryList?.results?.data?.length]);
  return (
    <>
      <SEO title={"Industry"} />
      <Main />
    </>
  );
};

export default Industry;
