import {
  LOADING_TRUE,
  RESET_MODAL,
  LOADING_FALSE,
  GET_CANDIDATE_FORM,
  GET_CANDIDATE_FORM_FAIL,
  GET_CANDIDATE_FORM_START,
  GET_CANDIDATE_SELECT_FAIL,
  GET_CANDIDATE_SELECT,
  GET_CANDIDATE_SELECT_START,
  GET_CANDIDATE_FORM_START_2,
  GET_CANDIDATE_FORM_2,
  GET_CANDIDATE_FORM_FAIL_2,
  GET_CANDIDATE_FORM_START_3,
  GET_CANDIDATE_FORM_3,
  GET_CANDIDATE_FORM_FAIL_3,
  GET_CANDIDATE_FORM_START_4,
  GET_CANDIDATE_FORM_4,
  GET_CANDIDATE_FORM_FAIL_4,
  GET_CANDIDATE_FORM_SENT,
  GET_CANDIDATE_FORM_SENT_FAIL,
  GET_CANDIDATE_FORM_SENT_START,
  GET_CANDIDATE_FORM_SENT_2,
  GET_CANDIDATE_FORM_SENT_FAIL_2,
  GET_CANDIDATE_FORM_SENT_START_2,
  GET_CANDIDATE_FORM_SENT_START_3,
  GET_CANDIDATE_FORM_SENT_3,
  GET_CANDIDATE_FORM_SENT_FAIL_3,
  GET_CANDIDATE_FORM_SENT_4,
  GET_CANDIDATE_FORM_SENT_FAIL_4,
  GET_CANDIDATE_FORM_SENT_START_4,
  GET_CANDIDATE_FORM_SENT_REMINDER,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL,
  GET_CANDIDATE_FORM_SENT_REMINDER_START,
  GET_CANDIDATE_FORM_SENT_REMINDER_2,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_2,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_2,
  GET_CANDIDATE_FORM_SENT_REMINDER_3,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_3,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_3,
  GET_CANDIDATE_FORM_SENT_REMINDER_4,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_4,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_4,
  GET_CANDIDATE_FORM_VIEW,
  GET_CANDIDATE_FORM_SENT_REMINDER_5,
  GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_5,
  GET_CANDIDATE_FORM_SENT_REMINDER_START_5,
  GET_CANDIDATE_FORM_5,
  GET_CANDIDATE_FORM_FAIL_5,
  GET_CANDIDATE_FORM_START_5,
  GET_CANDIDATE_FORM_SENT_5,
  GET_CANDIDATE_FORM_SENT_FAIL_5,
  GET_CANDIDATE_FORM_SENT_START_5,
} from "../constants/constants";

const initialState = {
  candidateForm1: {},
  candidateForm2: {},
  candidateForm3: {},
  candidateForm4: {},
  candidateForm5: {},
  resendForm1: {},
  resendForm2: {},
  resendForm3: {},
  resendForm4: {},
  resendForm5: {},
  selectForms: [],
};

export const applyJobReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_TRUE:
      return { ...state, isLoading: true };
    case LOADING_FALSE:
      return { ...state, isLoading: false };
    case GET_CANDIDATE_FORM_SENT_START:
    case GET_CANDIDATE_FORM_START: {
      return { ...state, isLoading: true, candidateForm1: null };
    }
    case GET_CANDIDATE_FORM_SENT:
    case GET_CANDIDATE_FORM: {
      return { ...state, isLoading: false, candidateForm1: payload };
    }
    case GET_CANDIDATE_FORM_SENT_FAIL:
    case GET_CANDIDATE_FORM_FAIL: {
      return { ...state, isLoading: false, candidateForm1: null };
    }

    case GET_CANDIDATE_FORM_SENT_START_5:
    case GET_CANDIDATE_FORM_START_5: {
      return { ...state, isLoading: true, candidateForm5: null };
    }
    case GET_CANDIDATE_FORM_SENT_5:
    case GET_CANDIDATE_FORM_5: {
      return { ...state, isLoading: false, candidateForm5: payload };
    }
    case GET_CANDIDATE_FORM_SENT_FAIL_5:
    case GET_CANDIDATE_FORM_FAIL_5: {
      return { ...state, isLoading: false, candidateForm5: null };
    }

    case GET_CANDIDATE_FORM_SENT_START_2:
    case GET_CANDIDATE_FORM_START_2: {
      return { ...state, isLoading: true, candidateForm2: null };
    }
    case GET_CANDIDATE_FORM_SENT_2:
    case GET_CANDIDATE_FORM_2: {
      return { ...state, isLoading: false, candidateForm2: payload };
    }
    case GET_CANDIDATE_FORM_SENT_FAIL_2:
    case GET_CANDIDATE_FORM_FAIL_2: {
      return { ...state, isLoading: false, candidateForm2: null };
    }
    case GET_CANDIDATE_FORM_SENT_START_3:
    case GET_CANDIDATE_FORM_START_3: {
      return { ...state, isLoading: true, candidateForm3: null };
    }
    case GET_CANDIDATE_FORM_SENT_3:
    case GET_CANDIDATE_FORM_3: {
      return { ...state, isLoading: false, candidateForm3: payload };
    }
    case GET_CANDIDATE_FORM_SENT_FAIL_3:
    case GET_CANDIDATE_FORM_FAIL_3: {
      return { ...state, isLoading: false, candidateForm3: null };
    }
    case GET_CANDIDATE_FORM_SENT_START_4:
    case GET_CANDIDATE_FORM_START_4: {
      return { ...state, isLoading: true, candidateForm4: null };
    }
    case GET_CANDIDATE_FORM_SENT_4:
    case GET_CANDIDATE_FORM_4: {
      return { ...state, isLoading: false, candidateForm4: payload };
    }
    case GET_CANDIDATE_FORM_SENT_FAIL_4:
    case GET_CANDIDATE_FORM_FAIL_4: {
      return { ...state, isLoading: false, candidateForm4: null };
    }

    case GET_CANDIDATE_SELECT_START: {
      return { ...state, isLoading: true, selectForms: null };
    }
    case GET_CANDIDATE_SELECT: {
      return { ...state, isLoading: false, selectForms: payload };
    }
    case GET_CANDIDATE_SELECT_FAIL: {
      return { ...state, isLoading: false, selectForms: null };
    }

    case GET_CANDIDATE_FORM_SENT_REMINDER_START: {
      return { ...state, isLoading: true, resendForm: null };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER: {
      return { ...state, isLoading: false, resendForm: payload };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_FAIL: {
      return { ...state, isLoading: false, resendForm: null };
    }

    case GET_CANDIDATE_FORM_SENT_REMINDER_START_2: {
      return { ...state, isLoading: true, resendForm2: null };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_2: {
      return { ...state, isLoading: false, resendForm2: payload };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_2: {
      return { ...state, isLoading: false, resendForm2: null };
    }

    case GET_CANDIDATE_FORM_SENT_REMINDER_START_3: {
      return { ...state, isLoading: true, resendForm3: null };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_3: {
      return { ...state, isLoading: false, resendForm3: payload };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_3: {
      return { ...state, isLoading: false, resendForm4: null };
    }

    case GET_CANDIDATE_FORM_SENT_REMINDER_START_4: {
      return { ...state, isLoading: true, resendForm4: null };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_4: {
      return { ...state, isLoading: false, resendForm4: payload };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_4: {
      return { ...state, isLoading: false, resendForm4: null };
    }

    case GET_CANDIDATE_FORM_SENT_REMINDER_START_5: {
      return { ...state, isLoading: true, resendForm5: null };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_5: {
      return { ...state, isLoading: false, resendForm5: payload };
    }
    case GET_CANDIDATE_FORM_SENT_REMINDER_FAIL_5: {
      return { ...state, isLoading: false, resendForm5: null };
    }
    case GET_CANDIDATE_FORM_VIEW: {
      return { ...state, isLoading: false, formView: payload };
    }
    case RESET_MODAL:
      return { ...state, selectForms: [] };
    default:
      return state;
  }
};
