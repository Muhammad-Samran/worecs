import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Home from "./pages/home";
import "grapesjs/dist/css/grapes.min.css";
import {
  Login,
  Signup,
  ForgetPass,
  NotFound,
  VerifyPassword,
  Verify,
  NewUserLogin,
  RejectPage,
  ResendPage,
} from "./pages/public-screens";
import ProtectedRoute from "./ProtectedRoute";
import Alerts from "./components/common/Alert";
import {
  AllCandidates,
  NewRequest,
  SingleCandidate,
  HELPDESK,
} from "./components/candidates";
import {
  WorkSpace,
  Candidates,
  Industry,
  Dashboard,
  Forms,
  HelpDesk,
  Company,
  Pricing,
  Order,
  OrderDetail,
} from "./pages/recruiter-screens";
import Faqs from "./components/helpdesk/faqs/";
import Contact from "./components/helpdesk/contactUs";
import Reference from "./components/reference/Reference";
import { Jobs, Profile } from "./pages/both_screens";
import CreateJob from "./components/jobs/createJob";
import DashboardActivityCandidate from "./pages/candidate-screens/Dashboard";

import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "./store/actions/authActions";
import InterviewScreen from "./pages/candidate-screens/InterviewScreen";
import Requests from "../src/components/candidate_screens/requests";
import SubmitsList from "../src/components/candidate_screens/submit";
import CandidateProfile from "./components/candidate_screens/profile";
import FormBuilder from "./components/forms/form-builder";
import LicenseCandidate from "./components/candidate_screens/license";
import Interview from "./pages/recruiter-screens/Interview";
import CreateForm from "./components/forms/form-builder";
import Documents from "./pages/recruiter-screens/documents";
import Integrations from "./components/integrations/main";
import FormView from "./pages/public-screens/FormView";
import ArchivedForm from "./components/forms/archived-form/ArchivedForm";
import DraftForm from "./components/forms/draft-form/DraftForm";
// import Guest from "./components/guest-user/guest";
import Home_Page from "./components/home-page/index";
import Latest_job from "./components/home-page/latest-jobs/Latest_job";
import Contact_Us from "./components/home-page/contactus/Contact_Us";
import SubmissionForm from "./components/forms/submission-form/SubmissionForm";
import Blog from "./components/home-page/blogs/Blog";
import PricingTable from "./components/home-page/pricingtable/PricingTable";
import GuestUser from "./components/guest-user/guest/GuestUser";
import { GuestReference } from "./pages/public-screens/reference";
import BlogPost from "./components/home-page/blogs/blogpost/BlogPost";
import JobDetails from "./components/home-page/jobsdetails/JobDetails";
// import AllFiles from "./components/files/all_files/Index";
import ArcheivedFiles from "./components/files/archeived_files";
import AllFiles from "./components/files/all_files/AllFiles";
import SubscriptionPage from "./components/pricing/subscriptionPage/index";
import SubscriptionUpdate from "./components/pricing/upgradeSubscription/index";
import SubscriptionDelete from "./components/pricing/downgradeSubscription/index";
import OneSignal from "./notifications/OneSignal";
import AllDocument from "./components/documents/main/index";
import CreateDocument from "./components/documents/create-form/index";
import ArchivedFormDocument from "./components/documents/archived-form/ArchivedForm";

// import AllFiles from "./components/files/all_files/AllFiles";

const App = () => {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    OneSignal();
  }, []);
  // useEffect(() => {
  //   if (auth?.results?.type) {
  //     localStorage.setItem("user", auth?.results?.type);
  //   }
  // }, [auth?.results?.type]);
  return (
    <>
      <Alerts />
      <Routes>
        {/* RESEND_VERIFICATION */}
        <Route path="/" element={<Home_Page />} />
        <Route path={routes.JOBS_SEARCH} element={<Latest_job />} />
        <Route path={routes.CONTACTS} element={<Contact_Us />} />
        <Route path={routes.BLOGS} element={<Blog />} />
        <Route path={routes.BLOGSPOSTS} element={<BlogPost />} />
        <Route path={routes.PRICINGTABLE} element={<PricingTable />} />
        <Route path={`${routes.JOBSDETAILS}/:slug`} element={<JobDetails />} />

        <Route path={routes.GUEST} element={<GuestUser />} />
        <Route
          path={routes.HOME}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {auth?.user !== "recruitment" ? (
            <>
              {/* Candidate Login screens */}
              <Route
                path={routes.CANDIDATE_DASHBOARD}
                element={<DashboardActivityCandidate />}
              />
              <Route path={routes.CANDIDATE_JOBS} element={<Jobs />} />
              <Route path={routes.CANDIDATE_PROFILE} element={<Profile />} />
              <Route path={routes.REQUEST_LIST} element={<Requests />} />
              <Route path={routes.SUBMISSION_LIST} element={<SubmitsList />} />
              <Route
                path={routes.CANDIDATE_INTERVIEW}
                element={<InterviewScreen />}
              />
              <Route
                path={routes.CANDIDATE_LICENSE}
                element={<LicenseCandidate />}
              />
              <Route path={routes.HELP_DESK} element={<HELPDESK />}>
                <Route path={routes.FAQS} element={<Faqs />} />
                <Route path={routes.CONTACT} element={<Contact />} />
              </Route>
              <Route path={routes.REF} element={<Reference />} />
              <Route path={routes.INTEGRATIONS} element={<Reference />} />
              <Route
                path={`${routes.FORM_VIEW}/:formId`}
                element={<FormView />}
              />
            </>
          ) : (
            <>
              {/* Recuriter routes */}
              <Route path={routes.PROFILE} element={<Profile />} />
              <Route path={routes.DASHBOARD} element={<Dashboard />} />
              <Route path={routes.INDUSTRY} element={<Industry />} />
              <Route path={routes.INTERVIEW} element={<Interview />} />
              {auth?.results?.workspace_type === "recruitment" && (
                <Route path={routes.PRICING} element={<Pricing />}>
                  <Route
                    path={`${routes.ORDER_DETAIL}/:id`}
                    element={<OrderDetail />}
                  />
                  <Route path={`${routes.ORDER_LIST}`} element={<Order />} />
                  {auth?.results?.subscription_status === 1 && (
                    <>
                      <Route
                        path={`${routes.SUBSCRIPTION_GET}`}
                        element={<SubscriptionPage />}
                      />
                      <Route
                        path={`${routes.SUBSCRIPTION_UPDATE}`}
                        element={<SubscriptionUpdate />}
                      />
                      <Route
                        path={`${routes.SUBSCRIPTION_DELETE}`}
                        element={<SubscriptionDelete />}
                      />
                    </>
                  )}
                </Route>
              )}

              <Route path={routes.CANDIDATE} element={<Candidates />}>
                <Route
                  path={routes.ALL_CANDIDATES}
                  element={<AllCandidates />}
                />
                <Route path={routes.NEW_REQUEST} element={<NewRequest />} />
                <Route
                  path={`${routes.SINGLE_CANDIDATE}/:uuid`}
                  element={<SingleCandidate />}
                />
              </Route>
              {auth?.results?.workspace_type === "recruitment" && (
                <Route path={routes.WORKSPACE} element={<WorkSpace />} />
              )}
              <Route path={routes.JOBS} element={<Jobs />}></Route>
              <Route path={routes.JOBS_CREATE} element={<CreateJob />} />
              <Route path={routes.COMPANY} element={<Company />} />
              <Route path={routes.HELP_DESK} element={<HelpDesk />}>
                <Route path={routes.FAQS} element={<Faqs />} />
                <Route path={routes.CONTACT} element={<Contact />} />
              </Route>
              <Route path={routes.INTEGRATIONS} element={<Integrations />} />
              <Route path={routes.FORMS} element={<Forms />} />
              <Route path={routes.CREATE_NEW_FORM} element={<CreateForm />} />
              <Route path={routes.ARCHIVED} element={<ArchivedForm />} />
              <Route path={routes.DRAFT} element={<DraftForm />} />
              <Route path={routes.SUB_LIST} element={<SubmissionForm />} />
              <Route path={routes.DOCUMENTS} element={<Documents />}>
                <Route
                  path={routes.CREATE_NEW_DOCUMENT}
                  element={<CreateDocument />}
                ></Route>
                <Route
                  path={routes.ALL_DOCUMENTS}
                  element={<AllDocument />}
                ></Route>
                <Route
                  path={routes.ALL_ARCHIVED}
                  element={<ArchivedFormDocument />}
                ></Route>
              </Route>

              <Route path={routes.ALL_FILES} element={<AllFiles />} />

              <Route
                path={routes.ARCHIVED_FILES}
                element={<ArcheivedFiles />}
              />

              <Route
                path={`${routes.FORM_VIEW}/:formId`}
                element={<FormView />}
              />
            </>
          )}
        </Route>
        {/* public routes */}
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.SIGNUP} element={<Signup />} />
        <Route path={routes.RESEND_VERIFICATION} element={<ResendPage />} />
        <Route path={routes.FORGET_PASSWORD} element={<ForgetPass />} />
        <Route path={`${routes.verify_token}/:token`} element={<Verify />} />
        <Route
          path={`${routes.verify_email_forget_password}/:token`}
          element={<VerifyPassword />}
        />
        <Route
          path={`${routes.NEW_USER_REQUEST}/:userNewId`}
          element={<NewUserLogin />}
        />
        <Route
          path={`${routes.NEW_USER_REJECT}/:userNewId`}
          element={<RejectPage />}
        />

        <Route
          path={`${routes.GUEST_FROM_REQUEST}/:formToken`}
          element={<FormView />}
        />

        <Route
          path={`${routes.GUEST_REFERENCE}/:Token`}
          element={<GuestReference />}
        />

        <Route path={routes.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
