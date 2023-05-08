import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";

import App from "./App";
import "./index.css";
import theme from "./theme/theme";
import i18n from "./i18n";

const container = document.getElementById("root")!;
const root = createRoot(container);

i18n.init({
  lng: "en",
  fallbackLng: "en",
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
