import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import SEO from "../../components/meta-tags";
import { routes } from "../../routes";
import { getAllRecruiterCandidate } from "../../store/actions/recruiterCandidateActions";

const Candidates = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecruiterCandidate());
  }, []);
  const location = useLocation();
  if (location.pathname === "/dashboard/candidate") {
    return <Navigate to={routes?.ALL_CANDIDATES} replace />;
  }
  return (
    <>
      <SEO title={"Candidate Page"} />
      <Outlet />
    </>
  );
};

export default Candidates;
