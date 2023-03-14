import EndPoints from "../EndPoints";
import axios from "../axiosConfig";
import axiosForm from "../uploadFile/axiosFormData";

// Candidates Profile Section

export const getProfile = async () => {
  try {
    return await axios.post(EndPoints.getCandidateProfile);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateProfile = async (payload) => {
  try {
    return await axios.post(EndPoints.updateCandidateProfile, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const changePassword = async (payload) => {
  try {
    return await axios.post(EndPoints.changePassword, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Candidates Experience Section

export const getExperience = async () => {
  try {
    return await axios.post(EndPoints.getExperienceList);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addExperience = async (payload) => {
  try {
    return await axios.post(EndPoints.addExperience, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editExperience = async (payload) => {
  try {
    return await axios.post(`${EndPoints.editExperience}/${payload}`);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateExperience = async (payload) => {
  try {
    return await axios.post(EndPoints.updateExperience, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteExperience = async (payload) => {
  try {
    return await axios.post(EndPoints.deleteExperience, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Candidate Education Section

export const getEducation = async () => {
  try {
    return await axios.post(EndPoints.getEducation);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addEducation = async (payload) => {
  try {
    return await axios.post(EndPoints.addEducation, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editEducation = async (payload) => {
  try {
    return await axios.post(`${EndPoints.editEducation}/${payload}`);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateEducation = async (payload) => {
  try {
    return await axios.post(EndPoints.updateEducation, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteEducation = async (payload) => {
  try {
    return await axios.post(EndPoints.deleteEducation, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//  Social Networking API

export const getSocialNetwork = async () => {
  try {
    return await axios.post(EndPoints.getSocialNetwork);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addSocialNetwork = async (payload) => {
  try {
    return await axios.post(EndPoints.addSocialNetwork, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateSocialNetwork = async (payload) => {
  try {
    return await axios.post(EndPoints.updateSocialNetwork, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteSocialNetwork = async (payload) => {
  try {
    return await axios.post(EndPoints.deleteSocialNetwork, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// References

export const getReferences = async () => {
  try {
    return await axios.post(EndPoints.getReferences);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addReferences = async (payload) => {
  try {
    return await axios.post(EndPoints.addReferences, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editReferences = async (payload) => {
  try {
    return await axios.post(EndPoints.editReferences, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateReferences = async (payload) => {
  try {
    return await axios.post(EndPoints.updateReferences, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Request the References

export const getApprovedReferences = async () => {
  try {
    return await axios.post(EndPoints.getApprovedReferences);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//  Interview
export const getInterviews = async () => {
  try {
    return await axios.post(EndPoints.getInterviews);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Candidates Request License Section

export const getLicense = async () => {
  try {
    return await axios.post(EndPoints.getLicense);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Candidates User Detail License

export const addLicense = async (payload) => {
  try {
    return await axios.post(EndPoints.addLicense, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getLicenseShow = async () => {
  try {
    return await axios.post(EndPoints.getLicenseShow);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateLicense = async (payload) => {
  try {
    return await axios.post(EndPoints.updateLicense, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Candidates Profile License Section

export const getProfileLicense = async () => {
  try {
    return await axios.post(EndPoints.getProfileLicense);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addProfileLicense = async (payload) => {
  try {
    return await axiosForm.post(EndPoints.addProfileLicense, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateProfileLicense = async (payload) => {
  try {
    return await axiosForm.post(EndPoints.updateProfileLicense, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const editProfileLicense = async (payload) => {
  try {
    return await axios.post(`${EndPoints.editProfileLicense}/${payload}`);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteProfileLicense = async (payload) => {
  try {
    return await axios.post(EndPoints.deleteProfileLicense, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Candidate general apis

export const recruitmentIndustry = async () => {
  try {
    return await axios.post(EndPoints.recruitmentIndustry);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//  From builder category
export const getFormCategory = async (payload) => {
  try {
    return await axios.post(EndPoints.getFormCategory, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//  From builder Apis
export const createForm = async (payload) => {
  try {
    return await axios.post(EndPoints.createForm, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateForm = async (payload) => {
  try {
    return await axios.post(EndPoints.updateForm, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const draftSave = async (payload) => {
  try {
    return await axios.post(EndPoints.draftSave, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getAllForms = async () => {
  try {
    return await axios.post(EndPoints.getAllForms);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteForm = async (payload) => {
  try {
    return await axios.post(EndPoints.deleteForm, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteSubmission = async (payload) => {
  try {
    return await axios.post(EndPoints.deleteSubmission, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const statusForm = async (payload) => {
  try {
    return await axios.post(EndPoints.statusForm, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getDeactivateForms = async (payload) => {
  try {
    return await axios.post(EndPoints.getAllForms, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getArchivedForms = async (payload) => {
  try {
    return await axios.post(EndPoints.getAllForms, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getDraftForms = async (payload) => {
  try {
    return await axios.post(EndPoints.getAllForms, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getSubmissionForms = async (payload) => {
  try {
    return await axios.post(EndPoints.getSubmissionForms, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const showSubmissionForms = async (uuid, payload) => {
  try {
    return await axios.post(
      `${EndPoints.showSubmissionForms}/${uuid}`,
      payload
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//  Form submission handler APIs

export const acceptForm = async (formToken) => {
  try {
    return await axios.post(`${EndPoints.acceptForm}/${formToken}`);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const showForm = async (slug, payload) => {
  try {
    return await axios.post(`${EndPoints.submitForm}/${slug}/show`, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const submitForm = async (slug, payload) => {
  try {
    return await axios.post(`${EndPoints.submitForm}/${slug}/store`, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const sendRequest = async (payload) => {
  try {
    return await axios.post(EndPoints.sendRequest, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getFormRequest = async () => {
  try {
    return await axios.post(EndPoints.getFormRequest);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const getSubmitRequest = async () => {
  try {
    return await axios.post(EndPoints.getFormSubmit);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const storeFormRequest = async (slug, payload) => {
  try {
    return await axios.post(`${EndPoints.formRequest}/${slug}/store`, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const showFormRequest = async (slug, payload) => {
  try {
    return await axios.post(`${EndPoints.formRequest}/${slug}/show`, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const guestReferenceAccept = async (token) => {
  try {
    return await axios.post(`${EndPoints.guestReferenceAccept}/${token}`);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const guestReferenceStore = async (uuid, payload) => {
  try {
    return await axios.post(
      `${EndPoints.guestReferenceStore}/${uuid}`,
      payload
    );
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const requestInterviewStatus = async (payload) => {
  try {
    return await axios.post(`${EndPoints.requestInterviewStatus}`, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const RecentActivities = async () => {
  try {
    return await axios.post(EndPoints.RecentActivities);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const dashboard = async () => {
  try {
    return await axios.post(EndPoints.dashboard);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const ArchivedForms = async (payload) => {
  try {
    return await axios.post(EndPoints.archivedForm, payload);
  } catch (error) {
    return { success: false, message: error.message };
  }
};
