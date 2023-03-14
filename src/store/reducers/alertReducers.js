import { REMOVE_ALERT, SET_ALERT } from "../constants/constants";

const initialState = [];

export const alertReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state?.filter((e) => e.id !== payload);
    default:
      return state;
  }
};
