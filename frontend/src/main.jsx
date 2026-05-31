import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import {
  SidebarProvider,
} from "./contexts/SidebarContext";

import {
  ToastProvider,
} from "./contexts/ToastContext";

import {
  ThemeProvider,
} from "./contexts/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);