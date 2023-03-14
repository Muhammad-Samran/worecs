import React from "react";
import { useSelector } from "react-redux";
import Main from "../../components/jobs/main";
import CandidateScreen from "../../components/candidate_screens/jobs/index";
import SEO from "../../components/meta-tags";
const Jobs = () => {
  const auth = useSelector((state) => state?.auth);

  return (
    <>
      <SEO title={"Jobs"} />
      {auth?.user === "recruitment" ? <Main /> : <CandidateScreen />}
    </>
  );
};

export default Jobs;
