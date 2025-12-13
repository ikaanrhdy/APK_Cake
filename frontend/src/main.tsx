import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./provider/Theme_Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
