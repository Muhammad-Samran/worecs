import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardActivity from "../../components/dashboard/activity";
import SEO from "../../components/meta-tags";
import { routes } from "../../routes";
import { resetCompany } from "../../store/actions/companyActions";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const company = useSelector((state) => state?.company);
  useEffect(() => {
    dispatch(resetCompany());
  }, []);

  return (
    <div>
      <SEO title={"Activity Page"} />
      <DashboardActivity />
    </div>
  );
};

export default Dashboard;
