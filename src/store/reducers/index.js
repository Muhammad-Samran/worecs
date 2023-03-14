import { combineReducers } from "redux";
import { alertReducers } from "./alertReducers";
import { authReducers } from "./authReducers";
import { companyReducers } from "./companyReducers";
import { industryReducers } from "./industryReducers";
import { pricingReducers } from "./pricingReducers";
import { applyJobReducers } from "./applyJobReducers";
import { recruiterCandidateReducers } from "./recruiterCandidateReducers";
import { recruiterJobsReducers } from "./recruiterJobsReducers";
import { recruiterMembersReducers } from "./recruiterMembersReducers";
import { singleCandidateScreenReducer } from "./singleCandidateScreenReducer";
import { Rprofile } from "./profileReducers";
import { LOGOUT_USER } from "../constants/constants";
import { ordersReducer } from "./ordersReducers";
import { homeJobReducers } from "./homeJobReducers";

const reducerss = combineReducers({
  alert: alertReducers,
  auth: authReducers,
  industry: industryReducers,
  member: recruiterMembersReducers,
  company: companyReducers,
  rjobs: recruiterJobsReducers,
  rcandidate: recruiterCandidateReducers,
  singleCandidate: singleCandidateScreenReducer,
  pricing: pricingReducers,
  applyJob: applyJobReducers,
  rprofile: Rprofile,
  rorders: ordersReducer,
  hjob: homeJobReducers,
});

export const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    // console.log("in");
    state = undefined;
  }

  return reducerss(state, action);
};

export default reducerss;
