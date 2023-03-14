import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../components/interview/main";
import SEO from "../../components/meta-tags";
import { getAllRecruiterInterview } from "../../store/actions/singleCandidateScreenActions";

const Interview = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllRecruiterInterview({
        //   candidate_id: candidate?.showCandidate?.results?.id || candidateID,
        workspace_id: auth?.results?.workspace_id,
      })
    );
  }, []);
  return (
    <>
      <SEO title={"Interview Page"} />
      <Main />
    </>
  );
};

export default Interview;
