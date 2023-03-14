import React from "react";
import SEO from "../../components/meta-tags";
import Content from "../../components/Profile";
import CandidateScreen from "../../components/candidate_screens/profile/index";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((state) => state?.auth);
  return (
    <>
      <SEO title="Profile page" />
      <div>
        {(auth?.user === "recruitment") === true ? (
          <Content />
        ) : (
          <CandidateScreen />
        )}
      </div>
      {/* {auth?.user["candidate"] === true ? <Content /> : <CandidateScreen />} */}
    </>
  );
};
export default Profile;
