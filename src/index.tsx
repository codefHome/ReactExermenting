import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ChallengeContextProvider } from "./CentralStorage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChallengeContextProvider>
      <App />
    </ChallengeContextProvider>
  </React.StrictMode>
);
