export default {
  // Candidates Profile Section
  getCandidateProfile: "/user/profile/index",
  updateCandidateProfile: "/user/profile/update",

  // upload files
  uploadFiles: "/user/profile/image/upload",
  uploadResume: "/candidate/upload/resume/store",
  deleteResume: "/candidate/upload/resume/delete",

  // Candidate profile change password
  changePassword: "/user/profile/change-password",

  // Candidates Experience Section
  getExperienceList: "/candidate/experience/index",
  addExperience: "candidate/experience/store",
  editExperience: "candidate/experience/edit",
  updateExperience: "candidate/experience/update",
  deleteExperience: "candidate/experience/delete",

  // Candidate Education Section
  getEducation: "/candidate/education/index",
  addEducation: "candidate/education/store",
  editEducation: "candidate/education/edit",
  updateEducation: "candidate/education/update",
  deleteEducation: "candidate/education/delete",

  // candidate social network
  getSocialNetwork: "/candidate/social-network/index",
  addSocialNetwork: "/candidate/social-network/store",
  editSocialNetwork: "/candidate/social-network/edit",
  updateSocialNetwork: "/candidate/social-network/update",
  deleteSocialNetwork: "/candidate/social-network/delete",

  // references
  getReferences: "/candidate/reference/index",
  addReferences: "/candidate/reference/store",
  editReferences: "/candidate/reference/edit",
  updateReferences: "/candidate/reference/update",

  //

  getApprovedReferences: "/candidate/reference/request/index",

  // candidate request Interview section

  getInterviews: "/candidate/interview/request/index",

  // Candidates request License Section
  getLicense: "/candidate/license-certification/request/index",

  // Candidates user detail License
  addLicense: "/candidate/license-certification/store",
  getLicenseShow: "/candidate/license-certification/show",
  updateLicense: "/candidate/license-certification/update",

  // candidate profile license apis
  getProfileLicense: "/candidate/license-certification/response/index",
  addProfileLicense: "/candidate/license-certification/response/store",
  editProfileLicense: "/candidate/license-certification/response/edit",
  updateProfileLicense: "/candidate/license-certification/response/update",
  deleteProfileLicense: "/candidate/license-certification/response/delete",

  // candidate general apis
  recruitmentIndustry: "/recruitment-industry/get-recruitment-industry-id",
  getApprovedReferences: "/candidate/reference/request/index",

  getInterviews: "/candidate/interview/request/index",

  // Form Builder

  getFormCategory: "/form-builder/category/get-form-builder-category",
  createForm: "/form-builder/store",
  updateForm: "/form-builder/update",
  getAllForms: "/form-builder/index",
  deleteForm: "/form-builder/delete",
  statusForm: "/form-builder/status",
  draftSave: "/form-builder/draft/save",

  acceptForm: "/guest/form/request/accept",
  submitForm: "/guest/form/request",

  getSubmissionForms: "/form-submission/index",
  showSubmissionForms: "/form-submission/show",

  sendRequest: "/form-builder/send/request",
  getFormRequest: "/candidate/form/request/index",
  formRequest: "/candidate/form/request",

  getFormSubmit: "candidate/form/request/submission/index",
  getFormView: "candidate/form/request/submission/show/",

  guestReferenceAccept: "/guest/reference/accept",
  guestReferenceStore: "/guest/reference/store",

  showResume: "/candidate/upload/resume/show",

  requestInterviewStatus: "/candidate/interview/request/status",

  RecentActivities: "/user/activity-logger",
  dashboard: "dashboard",

  archivedForm: "/form-builder/archived/status",
  deleteSubmission: "/form-submission/delete",
};
