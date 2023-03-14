import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Main from "../../components/company/main";
import SEO from "../../components/meta-tags";
import { routes } from "../../routes";
import { editCompany } from "../../store/actions/companyActions";
const Company = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const company = useSelector((state) => state?.company);
  useEffect(() => {
    if (company?.updatedCompany && company?.updatedCompany?.success) {
      navigate(routes.DASHBOARD);
    }
  }, [navigate, company?.updatedCompany]);
  useEffect(() => {
    if (company?.createdCompany && company?.createdCompany?.success) {
      navigate(routes.DASHBOARD, {
        state: {
          company: true,
        },
      });
    }
  }, [navigate, company?.createdCompany]);

  return (
    <div>
      <SEO title={"Company"} />
      <Main />
    </div>
  );
};

export default Company;
