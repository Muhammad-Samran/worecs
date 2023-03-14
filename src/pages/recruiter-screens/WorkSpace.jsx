import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkSpaces from "../../components/workspace/main";
import { getAllRecruiterMembers } from "../../store/actions/recruiterMembers";

const WorkSpace = () => {
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecruiterMembers(auth?.results.workspace_id));
  }, [dispatch, auth?.results.workspace_id]);
  return (
    <>
      <WorkSpaces />
    </>
  );
};

export default WorkSpace;
