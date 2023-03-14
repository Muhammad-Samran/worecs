import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducerss, { rootReducer } from "./reducers";

import thunk from "redux-thunk";

const initialState = {
  auth: {
    ...(JSON.parse(localStorage.getItem("auth")) || ""),
    token: JSON.parse(localStorage.getItem("token")) || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
