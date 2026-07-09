import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";

import { App } from "./App";

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
