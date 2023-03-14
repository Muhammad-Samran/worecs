import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { HelmetProvider } from "react-helmet-async";
import "react-form-builder2/dist/app.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
const THEME = createTheme({
  typography: {
    fontFamily: `"poppins-regular"`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  root.render(
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
} else {
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={THEME}>
        <Provider store={store}>
          <BrowserRouter>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
