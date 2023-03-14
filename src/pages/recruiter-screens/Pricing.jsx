import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import SEO from "../../components/meta-tags";
import Main from "../../components/pricing/main";
import {
  getIndustryPricing,
  getPricingDetailsFunc,
  getSubscription,
} from "../../store/actions/pricingActions";

const Pricing = () => {
  const dispatch = useDispatch();
  const locataion = useLocation();
  const auth = useSelector((state) => state?.auth);

  useEffect(() => {
    dispatch(getPricingDetailsFunc());
    dispatch(
      getIndustryPricing({
        industry_id: auth?.results?.company_detail?.industry?.id,
      })
    );
    dispatch(getSubscription());
  }, []);
  return (
    <>
      <SEO title={"Pricing Page"} />
      {locataion?.pathname === "/dashboard/pricing" ? <Main /> : <Outlet />}
    </>
  );
};

export default Pricing;
